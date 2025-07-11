namespace BE.Application.DTOs.SessionDTOs
{
    public record SessionAnswerDto
    {
        public int Id { get; set; }
        public Guid SessionId { get; set; }
        public int Number { get; set; }
        public string AnswerSubmission { get; set; }
        public string ExpectedAnswer { get; set; }
        public bool IsCorrect { get; set; }
    }
}