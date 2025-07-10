namespace BE.Domain.Entities
{
    public class Rule
    {
        public int Id { get; set; }
        public int Divisor { get; set; }
        public string Word { get; set; }

        public int GameId { get; set; }
        public Game Game { get; set; }
    }
}