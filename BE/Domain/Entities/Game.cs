namespace BE.Domain.Entities
{
    public class Game
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public int MinRange { get; set; }
        public int MaxRange { get; set; }

        public IList<Rule> Rules { get; set; } = new List<Rule>();
        public IList<Session> Sessions { get; set; } = new List<Session>();
    }
}
