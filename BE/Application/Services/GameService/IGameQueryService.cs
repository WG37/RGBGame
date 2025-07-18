﻿using BE.Application.DTOs.GameDTOs;

namespace BE.Application.Services.GameService
{
    public interface IGameQueryService
    {
        Task<GameDto> GetGameByIdAsync(int id);
        Task<IEnumerable<GameDto>> GetAllGamesAsync();
    }
}
