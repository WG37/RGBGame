namespace BE.Application.DTOs.RuleDTO
{
    public record RuleDto
    {
        public int Id { get; set; }
        public int Divisor { get; set; }
        public string Word { get; set; }
    }
}
