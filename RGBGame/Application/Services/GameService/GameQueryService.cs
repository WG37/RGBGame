using Microsoft.EntityFrameworkCore;
using RGBGame.Application.DTOs.GameServiceDtos;
using RGBGame.Infrastructure.Data;

namespace RGBGame.Application.Services.GameService
{
    public class GameQueryService : IGameQueryService
    {
        private readonly AppDbContext _db;
        public GameQueryService(AppDbContext db) => _db = db;


        public async Task<GameDto> GetGameByIdAsync(int id)
        {
            var game = await _db.Games
                .Include(g => g.Rules)
                .SingleOrDefaultAsync(g => g.Id == id) ??               // SingleOrDefault (PK => want exactly 1 match)
                throw new KeyNotFoundException($"Game {id} not found.");

            return new GameDto
            {
                Id = game.Id,
                Name = game.Name,
                Author = game.Author,
                MinRange = game.MinRange,
                MaxRange = game.MaxRange,
                Rules = game.Rules?
                            .Select(r => new RuleDto
                            {
                                Id = r.Id,
                                Divisor = r.Divisor,
                                Word = r.Word
                            }).ToList()!
            };

        }

        public async Task<IEnumerable<GameDto>> GetAllGamesAsync()
        {
            var games = await _db.Games.Include(g => g.Rules).ToListAsync();

            if (!games.Any()) 
                throw new KeyNotFoundException("No existing games found.");

            return games.Select(g => new GameDto
            {
                Id = g.Id,
                Name = g.Name,
                Author = g.Author,
                MinRange = g.MinRange,
                MaxRange = g.MaxRange,
                Rules = g.Rules
                         .Select(r => new RuleDto
                         {
                             Id = r.Id,
                             Divisor = r.Divisor,
                             Word = r.Word
                         }).ToList()
            }).ToList();
        }
    }
}
