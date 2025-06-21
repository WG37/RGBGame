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
        [HttpPost]
        public async Task<ActionResult<SessionDto>> StartSession([FromBody] StartSessionRequest req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var session = await _service.StartSessionAsync(req.GameId);
                return CreatedAtAction(nameof(GetResults), new { sessionId = session.Id }, session);
            }
            catch (ArgumentException arg)
            {
                return BadRequest(arg.Message);
            }
        }

        [HttpPost("{sessionId:Guid}")]
        public async Task<ActionResult<SessionDto>> GetResults(Guid sessionId)
        {
            try
            {
                var session = await _service.GetGameResultsAsync(sessionId);
                return Ok(session);
            }
            catch (ArgumentException arg)
            {
                return NotFound(arg.Message);
            }
        }



        // logic ops
        [HttpGet("{sessionId:Guid}/next")]
        public async Task<ActionResult<SessionDto>> NextNumber(Guid sessionId)
        {
            try
            {
                var session = await _logic.NextNumberAsync(sessionId);
                return Ok(sessionId);
            }
            catch (ArgumentException args)
            {
                return NotFound(args.Message);
            }
        }

        [HttpPost("{sessionId:guid}/check")]
        public async Task<ActionResult<SessionAnswerDto>> CheckValues(Guid sessionId, [FromBody] CheckValueRequest req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = await _logic.CheckValueAsync(sessionId, req.Number, req.Answer);
                return Ok(result);
            }
            catch (ArgumentException arg)
            {
                return NotFound(arg.Message);
            }
            catch (InvalidOperationException arg)
            {
                return BadRequest(arg.Message);
            }
        }
    }
}
