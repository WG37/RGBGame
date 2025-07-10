namespace BE.Application.DTOs.SessionServiceDtos
{
    public record SessionDto
    {
        public Guid Id { get; set; }
        public int GameId { get; set; }
        public DateTime Start { get; set; }
        public DateTime? End { get; set; }
        public int CurrentNumber { get; set; }
        public int CorrectTotal { get; set; }
        public int IncorrectTotal { get; set; }
        public IList<SessionAnswerDto> Answers { get; set; }
    }
}
