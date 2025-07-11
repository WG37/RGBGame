using BE.Application.DTOs.SessionDTOs;

namespace BE.Application.Services.SessionService
{
    public interface ISessionLogicService
    {
        // game logic
        Task<SessionDto> NextNumberAsync(Guid sessionId);
        Task<SessionAnswerDto> CheckValueAsync(Guid sessionId, int number, string answer);
    }
}
