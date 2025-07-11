namespace BE.Application.DTOs.RuleDTO
{

    public record UpdateRuleDto
    {
        public int Divisor { get; set; }
        public string Word { get; set; }
    }

}
