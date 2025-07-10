namespace BE.Domain.Entities
{
    public class SessionAnswer
    {
        public int Id { get; set; }
        public Guid SessionId { get; set; }
        public Session Session { get; set; }
        public int Number { get; set; }
        public string AnswerSubmission { get; set; }
        public string ExpectedAnswer { get; set; }
        public bool IsCorrect { get; set; }
    }
}