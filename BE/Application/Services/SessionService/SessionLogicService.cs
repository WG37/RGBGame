using BE.Application.DTOs.SessionDTOs;
using BE.Domain.Entities;
using BE.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BE.Application.Services.SessionService
{
    public class SessionLogicService : ISessionLogicService
    {
        private readonly AppDbContext _db;
        public SessionLogicService(AppDbContext db) => _db = db;

        public async Task<SessionDto> NextNumberAsync(Guid sessionId)
        {
            // wraps query
            Session session;
            try
            {
                session = await _db.Sessions
                    .Include(s => s.Game)
                        .ThenInclude(g => g.Rules)
                    .Include(s => s.Answers)
                    .SingleOrDefaultAsync(s => s.Id == sessionId)
                    ?? throw new ArgumentException($"No session exists with id: {sessionId}", nameof(sessionId));
            }
            catch (DbUpdateException ex)
            {
                throw new InvalidOperationException("Database error while retrieving session for next number.", ex);
            }

            // no reusing numbers -- hashed out
            var used = session.Answers.Select(a => a.Number).ToHashSet();

            // sample space of possible numbers
            var min = session.Game.MinRange;
            var max = session.Game.MaxRange;
            var sampleSpace = Enumerable.Range(min, max - min + 1)
                                        .Where(n => !used.Contains(n)).ToList();

            if (!sampleSpace.Any())
                throw new InvalidOperationException("No numbers left in sequence");

            // ensures numbers are picked random every session
            var rnd = new Random();
            var next = sampleSpace[rnd.Next(sampleSpace.Count)]; // next number randomly pulled from the space

            session.CurrentNumber = next;

            // wrap the save
            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new InvalidOperationException("Database error while saving next number.", ex);
            }

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
            
            Session session;
            try
            {
                session = await _db.Sessions
                    .Include(s => s.Game)
                        .ThenInclude(g => g.Rules)
                    .SingleOrDefaultAsync(s => s.Id == sessionId)
                    ?? throw new ArgumentException(
                        $"No session exists with id: {sessionId}", nameof(sessionId));
            }
            catch (DbUpdateException ex)
            {
                throw new InvalidOperationException("Database error while retrieving session for answer check.", ex);
            }

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

            
            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new InvalidOperationException("Database error while saving answer.", ex);
            }

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
