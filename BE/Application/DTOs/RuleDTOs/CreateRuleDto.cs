namespace BE.Application.DTOs.RuleDTOs
{
    public record CreateRuleDto
    {
        public int Divisor { get; set; }
        public string Word { get; set; }
    }
}
