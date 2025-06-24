using Microsoft.AspNetCore.Mvc;
using RGBGame.Application.DTOs.GameServiceDtos;
using RGBGame.Application.Services.GameService;

namespace RGBGame.Infrastructure.Controllers
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
                var game =  _crudService.DeleteGameAsync(id);
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
        public async Task<ActionResult<IEnumerable<GameDto>>> GetAllGames()
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
