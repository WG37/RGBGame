using RGBGame.Application.DTOs.GameServiceDtos;

namespace RGBGame.Application.Services.GameService
{
    public interface IGameCrudService
    {
        Task<GameDto> CreateGameAsync(CreateGameDto dto);
        Task<GameDto> UpdateGameAsync(int id, UpdateGameDto dto);
        Task DeleteGameAsync(int id);
    }
}
