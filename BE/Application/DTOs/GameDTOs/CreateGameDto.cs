using BE.Application.DTOs.RuleDTOs;

namespace BE.Application.DTOs.GameDTOs
{
    public record CreateGameDto
    {
        public string Name { get; set; }
        public string Author { get; set; }
        public int MinRange { get; set; }
        public int MaxRange { get; set; }
        public IList<CreateRuleDto> Rules { get; set; }
    }
}
