using BE.Application.DTOs.GameDTOs;
using BE.Application.Services.GameService;
using Microsoft.AspNetCore.Mvc;

namespace BE.Infrastructure.Controllers
{
    [ApiController]
    [Route("api/games")]
    public class GamesController : ControllerBase
    {
        private readonly IGameCrudService _crudService;
        private readonly IGameQueryService _queryService;
        public GamesController(IGameCrudService crudService, IGameQueryService queryService)
        {
            _crudService = crudService;
            _queryService = queryService;
        }

        // crud ops
        [HttpPost]
        public async Task<ActionResult<GameDto>> CreateGame([FromBody] CreateGameDto createDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (createDto.MinRange > createDto.MaxRange)
                return BadRequest("The MinRange must be less than or equal to the MaxRange");

            try
            {
                var game = await _crudService.CreateGameAsync(createDto);
                return CreatedAtAction(nameof(GetGameById), new { id = game.Id }, game);
            }
            catch (ArgumentException arg)
            {
                return BadRequest(arg.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GameDto>> UpdateGame(int id, UpdateGameDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (dto.MinRange > dto.MaxRange)
                return BadRequest("The MinRange must be less than or equal to the MaxRange");

            try
            {
                var game = await _crudService.UpdateGameAsync(id, dto);
                return Ok(game);
            }
            catch (KeyNotFoundException arg)
            {
                return NotFound(arg.Message);
            }
            catch (ArgumentException arg)
            {
                return BadRequest(arg.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            try
            {
                await _crudService.DeleteGameAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException arg)
            {
                return NotFound(arg.Message);
            }
        }


        // queries
        [HttpGet("{id}")]
        public async Task<ActionResult<GameDto>> GetGameById(int id)
        {
            try
            {
                var game = await _queryService.GetGameByIdAsync(id);
                return Ok(game);
            }
            catch (KeyNotFoundException arg)
            {
                return NotFound(arg.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<GameDto>>> GetAllGames()
        {
            try
            {
                var games = await _queryService.GetAllGamesAsync();
                return Ok(games);
            }
            catch (KeyNotFoundException arg)
            {
                return NotFound(arg.Message);
            }
        }
    }
}
