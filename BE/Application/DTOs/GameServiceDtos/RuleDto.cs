namespace BE.Application.DTOs.GameServiceDtos
{
    public record RuleDto
    {
        public int Id { get; set; }
        public int Divisor { get; set; }
        public string Word { get; set; }
    }

    public record CreateRuleDto
    {
        public int Divisor { get; set; }
        public string Word { get; set; }
    }

    public record UpdateRuleDto
    {
        public int Divisor { get; set; }
        public string Word { get; set; }
    }

}
