using Microsoft.AspNetCore.Mvc;
using RGBGame.Application.DTOs;
using RGBGame.Application.DTOs.SessionServiceDtos;
using RGBGame.Application.Services.SessionService;

namespace RGBGame.Infrastructure.Controllers
{
    [ApiController]
    [Route("api/sessions")]
    public class SessionsController : ControllerBase
    {
        private readonly ISessionService _service;
        private readonly ISessionLogicService _logic;

        public SessionsController(ISessionService service, ISessionLogicService logic)
        {
            _service = service;
            _logic = logic;
        }

        // game management
        [HttpPost("start")]
        public async Task<ActionResult<SessionDto>> StartSession([FromBody] SessionDto dto)
        {
            var session = await _service.StartSessionAsync(dto.GameId);

            return CreatedAtAction(nameof(GetResults), new { session = session.SessionId }, session);
        }

        [HttpPost("{sessionId:Guid}/results")]
        public async Task<ActionResult<SessionDto>> GetResults(Guid sessionId)
        {
            var results = await _service.GetGameResultsAsync(sessionId);
            if (results.CorrectTotal == 0 && results.IncorrectTotal == 0)
                return NotFound();
            return Ok("results");
        }



        // logic ops
        [HttpGet("{sessionId:Guid}/next")]
        public async Task<ActionResult<SessionDto>> NextNumber(Guid sessionId)
        {
            var dto = await _logic.NextNumberAsync(sessionId);
            return Ok(dto);
        }

        [HttpPost("{sessionId:guid}/check")]
        public async Task<ActionResult<SessionAnswerDto>> CheckValues(Guid sessionId, [FromBody] CheckValueRequest req)
        {
            var result = _logic.CheckValueAsync(sessionId, req.Number, req.Answer);
            return Ok(result);
        }
    }
}
