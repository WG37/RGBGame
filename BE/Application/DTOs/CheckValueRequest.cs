namespace BE.Application.DTOs
{
    // only used to bind incoming JSON requests =>  // SessionsController CheckValue method //
    public record CheckValueRequest
    {
        public int Number { get; set; }
        public string Answer { get; set; }
    }
}
