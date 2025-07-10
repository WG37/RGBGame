using Microsoft.EntityFrameworkCore;
using RGBGame.Domain.Entities;

namespace RGBGame.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Game> Games { get; set; }
        public DbSet<Rule> Rules { get; set; }

        public DbSet<Session> Sessions { get; set; }
        public DbSet<SessionAnswer> Answers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            ModelConfig.ConfigureModel(modelBuilder);
        }
    }

}
