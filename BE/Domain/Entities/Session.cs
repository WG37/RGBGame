namespace BE.Domain.Entities
{
    public class Session
    {
        public Guid Id { get; set; }
        public int GameId { get; set; }
        public Game Game { get; set; }
        public DateTime Start { get; set; }
        public DateTime? End { get; set; }
        public int CurrentNumber { get; set; }
        public int CorrectTotal { get; set; }
        public int IncorrectTotal { get; set; }

        public IList<SessionAnswer> Answers { get; set; } = new List<SessionAnswer>();
    }
}