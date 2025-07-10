using BE.Application.DTOs.GameServiceDtos;

namespace BE.Application.Services.GameService
{
    public interface IGameQueryService
    {
        Task<GameDto> GetGameByIdAsync(int id);
        Task<IEnumerable<GameDto>> GetAllGamesAsync();
    }
}
