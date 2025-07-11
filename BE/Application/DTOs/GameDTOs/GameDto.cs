using BE.Application.DTOs.RuleDTO;

namespace BE.Application.DTOs.GameDTOs
{
    public record GameDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public int MinRange { get; set; }
        public int MaxRange { get; set; }
        public IList<RuleDto> Rules { get; set; }
    }
}
