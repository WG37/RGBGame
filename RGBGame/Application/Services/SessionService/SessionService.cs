using Microsoft.EntityFrameworkCore;
using RGBGame.Application.DTOs.SessionServiceDtos;
using RGBGame.Domain.Entities;
using RGBGame.Infrastructure.Data;

namespace RGBGame.Application.Services.SessionService
{
    public class SessionService : ISessionService
    {
        private readonly AppDbContext _db;
        public SessionService(AppDbContext db) => _db = db;

        public async Task<SessionDto> StartSessionAsync(int gameId)
        {
            var session = new Session
            {
                Id = Guid.NewGuid(),
                GameId = gameId,
                Start = DateTime.UtcNow,
                End = null,
                CurrentNumber = 0,
                CorrectTotal = 0,
                IncorrectTotal = 0,
                Answers = new List<SessionAnswer>()
            };
            _db.Sessions.Add(session);
            await _db.SaveChangesAsync();

            return new SessionDto
            {
                Id = session.Id,
                GameId = session.GameId,
                Start = session.Start,
                CurrentNumber = session.CurrentNumber,
                CorrectTotal = session.CorrectTotal,
                IncorrectTotal = session.IncorrectTotal,
                Answers = new List<SessionAnswerDto>()
            };
        }

       
        public async Task<SessionDto> GetGameResultsAsync(Guid sessionId)
        {
            var session = await _db.Sessions
                .Include(s => s.Answers)
                .SingleOrDefaultAsync(s => s.Id == sessionId) ?? 
                    throw new ArgumentException($"No existing session with the id: {sessionId}", nameof(sessionId));

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
    }
}
