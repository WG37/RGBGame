using Microsoft.EntityFrameworkCore;
using RGBGame.Application.DTOs.SessionServiceDtos;
using RGBGame.Domain.Entities;
using RGBGame.Infrastructure.Data;

namespace RGBGame.Application.Services.SessionService
{
    public class SessionLogicService : ISessionLogicService
    {
        private readonly AppDbContext _db;
        public SessionLogicService(AppDbContext db) => _db = db;

        public async Task<SessionDto> NextNumberAsync(Guid sessionId)
        {
            var session = await _db.Sessions
                .Include(s => s.Answers)
                .SingleOrDefaultAsync(s => s.Id == sessionId) ??
                    throw new ArgumentException($"No session exists with id: {sessionId}", nameof(sessionId));

            session.CurrentNumber++;

            await _db.SaveChangesAsync();

            // return incremented value
            return new SessionDto
            {
                Id = session.Id,
                GameId = session.GameId,
                Start = session.Start,
                End = session.End,
                CurrentNumber = session.CurrentNumber,
                CorrectTotal = session.CorrectTotal,
                IncorrectTotal = session.IncorrectTotal,
                Answers = session.Answers
                                 .Select(a => new SessionAnswerDto 
                                 {
                                     Id = a.Id,
                                     SessionId = a.SessionId,
                                     Number = a.Number,
                                     AnswerSubmission = a.AnswerSubmission,
                                     ExpectedAnswer = a.ExpectedAnswer,
                                     IsCorrect = a.IsCorrect
                                 }).ToList()
            };
        }


        public async Task<SessionAnswerDto> CheckValueAsync(Guid sessionId, int number, string answer)
        {
            var session = await _db.Sessions
                .Include(s => s.Game)
                .ThenInclude(g => g.Rules)
                .SingleOrDefaultAsync(s => s.Id == sessionId) ??
                throw new ArgumentException(
                    $"No session exists with id: {sessionId}", nameof(sessionId));

            if (number != session.CurrentNumber)
                throw new InvalidOperationException(
                    $"Expected number {session.CurrentNumber}, got input {number}");


            var parts = session.Game.Rules
                .Where(r => number % r.Divisor == 0)
                .OrderBy(r => r.Divisor)
                .Select(r => r.Word)
                .ToList();

            var expectedAnswer = parts.Any() ? string.Concat(parts) : number.ToString();

            var isCorrect = string.Equals(answer?.Trim(), expectedAnswer, StringComparison.OrdinalIgnoreCase);


            if (isCorrect)
                session.CorrectTotal++;
            else
                session.IncorrectTotal++;


            var persistAnswer = new SessionAnswer
            {
                SessionId = session.Id,
                Number = number,
                AnswerSubmission = answer,
                ExpectedAnswer = expectedAnswer,
                IsCorrect = isCorrect
            };

            _db.Answers.Add(persistAnswer);
            await _db.SaveChangesAsync();

            return new SessionAnswerDto
            {
                Id = persistAnswer.Id,
                SessionId = persistAnswer.SessionId,
                Number = persistAnswer.Number,
                AnswerSubmission = persistAnswer.AnswerSubmission,
                ExpectedAnswer = persistAnswer.ExpectedAnswer,
                IsCorrect = persistAnswer.IsCorrect,
            };
        }
    }
}
