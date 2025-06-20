namespace RGBGame.Application.DTOs.GameServiceDtos
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

    public record CreateGameDto
    {
        public string Name { get; set; }
        public string Author { get; set; }
        public int MinRange { get; set; }
        public int MaxRange { get; set; }
        public IList<CreateRuleDto> Rules { get; set; }
    }

    public record UpdateGameDto
    {
        public string Name { get; set; }
        public string Author { get; set; }
        public int MinRange { get; set; }
        public int MaxRange { get; set; }
        public IList<CreateRuleDto> Rules { get; set; }
    }
}
