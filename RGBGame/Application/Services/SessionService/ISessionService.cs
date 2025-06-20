using RGBGame.Application.DTOs.SessionServiceDtos;

namespace RGBGame.Application.Services.SessionService
{
    public interface ISessionService
    {
        // game management
        Task<SessionDto> StartSessionAsync(int gameId);
        Task<SessionDto> GetGameResultsAsync(Guid sessionId);
    }
}
