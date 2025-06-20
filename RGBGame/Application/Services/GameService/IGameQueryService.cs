using RGBGame.Application.DTOs.GameServiceDtos;

namespace RGBGame.Application.Services.GameService
{
    public interface IGameQueryService
    {
        Task<GameDto> GetGameByIdAsync(int id);
        Task<IEnumerable<GameDto>> GetAllGamesAsync();
    }
}
