using BE.Application.DTOs.GameDTOs;

namespace BE.Application.Services.GameService
{
    public interface IGameCrudService
    {
        Task<GameDto> CreateGameAsync(CreateGameDto dto);
        Task<GameDto> UpdateGameAsync(int id, UpdateGameDto dto);
        Task DeleteGameAsync(int id);
    }
}
