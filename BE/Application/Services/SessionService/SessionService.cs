using BE.Application.DTOs.SessionDTOs;
using BE.Domain.Entities;
using BE.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BE.Application.Services.SessionService
{
    public class SessionService : ISessionService
    {
        private readonly AppDbContext _db;
        public SessionService(AppDbContext db) => _db = db;

        public async Task<SessionDto> StartSessionAsync(int gameId)
        {
            var game = await _db.Games
                .Include(g => g.Rules)
                .SingleOrDefaultAsync(g => g.Id == gameId) ??
                 throw new ArgumentException($"No game exists with {gameId}", nameof(gameId));

            // random number start from in range
            var rnd = new Random();
            var startingNumber = rnd.Next(game.MinRange, game.MaxRange + 1);

            var session = new Session
            {
                Id = Guid.NewGuid(),
                GameId = gameId,
                Start = DateTime.UtcNow,
                End = null,
                CurrentNumber = startingNumber,
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
