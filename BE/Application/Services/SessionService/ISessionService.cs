using BE.Application.DTOs.SessionServiceDtos;

namespace BE.Application.Services.SessionService
{
    public interface ISessionService
    {
        // game management
        Task<SessionDto> StartSessionAsync(int gameId);
        Task<SessionDto> GetGameResultsAsync(Guid sessionId);
    }
}
