using Microsoft.EntityFrameworkCore;
using RGB.Application.DTOs;
using RGB.Application.DTOs.GameServiceDtos;
using RGB.Domain.Entities;
using RGBGame.Application.DTOs.GameServiceDtos;
using RGBGame.Infrastructure.Data;

namespace RGBGame.Application.Services.GameService
{
    public class GameCrudService : IGameCrudService
    {
        private readonly AppDbContext _db;
        public GameCrudService(AppDbContext db) => _db = db;


        public async Task<GameDto> CreateGameAsync(CreateGameDto dto)
        {
            if (dto.MinRange > dto.MaxRange)
                throw new ArgumentException("MinRange cannot be greater than MaxRange", nameof(dto.MinRange));


            var game = new Game
            {
                Name = dto.Name,
                Author = dto.Author,
                MinRange = dto.MinRange,
                MaxRange = dto.MaxRange,
                Rules = dto.Rules?
                            .Select(r => new Rule
                            {
                                Divisor = r.Divisor,
                                Word = r.Word
                            }).ToList() ?? new List<Rule>()
            };

            _db.Games.Add(game);
            await _db.SaveChangesAsync();

            var gameResult = new GameDto
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
            return gameResult;
        }


        public async Task<GameDto> UpdateGameAsync(int id, UpdateGameDto dto)
        {
            var game = await _db.Games
                .Include(g => g.Rules)
                .FirstOrDefaultAsync(g => g.Id == id) ??
                    throw new KeyNotFoundException($"Game with {id} not found.");

            game.Name = dto.Name;
            game.Author = dto.Author;
            game.MinRange = dto.MinRange;
            game.MaxRange = dto.MaxRange;

            _db.Rules.RemoveRange(game.Rules);
            game.Rules.Clear();

            if (dto.Rules != null)
                foreach (var r in dto.Rules)
                    game.Rules.Add(new Rule
                    {
                        Divisor = r.Divisor,
                        Word = r.Word
                    });

            await _db.SaveChangesAsync();

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


        public async Task DeleteGameAsync(int id)
        {
            var game = await _db.Games.FindAsync(id) ??
                throw new KeyNotFoundException($"Game with {id} not found.");

            _db.Games.Remove(game);
            await _db.SaveChangesAsync();
        }
    }
}
