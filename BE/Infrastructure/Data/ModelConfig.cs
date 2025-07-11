using BE.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BE.Infrastructure.Data
{
    public static class ModelConfig
    {
        public static void ConfigureModel(ModelBuilder modelBuilder)
        {
            ConfigureGame(modelBuilder);
            ConfigureRule(modelBuilder);
            ConfigureSession(modelBuilder);
            ConfigureSessionAnswer(modelBuilder);
        }

        private static void ConfigureGame(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Game>(entity =>
            {
                entity.HasKey(g => g.Id);

                entity.Property(g => g.Name)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(g => g.Author)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.HasIndex(g => g.Name)
                      .IsUnique();

                entity.HasMany(g => g.Rules)
                      .WithOne(r => r.Game)
                      .HasForeignKey(r => r.GameId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(g => g.Sessions)
                      .WithOne(s => s.Game)
                      .HasForeignKey(s => s.GameId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }

        private static void ConfigureRule(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Rule>(entity =>
            {
                entity.HasKey(r => r.Id);

                entity.Property(r => r.Divisor)
                      .IsRequired();

                entity.Property(r => r.Word)
                      .IsRequired()
                      .HasMaxLength(50);

                entity.ToTable(t => t.HasCheckConstraint("CK_Rule_NonNegDivisor", "[Divisor] >= 0"));
            });
        }

        private static void ConfigureSession(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Session>(entity =>
            {
                entity.HasKey(s => s.Id);

                entity.Property(s => s.GameId)
                      .IsRequired();

                entity.Property(s => s.Start)
                      .IsRequired();

                entity.Property(s => s.End);

                entity.HasMany(s => s.Answers)
                      .WithOne(a => a.Session)
                      .HasForeignKey(a => a.SessionId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }

        private static void ConfigureSessionAnswer(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SessionAnswer>(entity =>
            {
                entity.HasKey(a => a.Id);

                entity.Property(a => a.Number)
                      .IsRequired();

                entity.Property(a => a.AnswerSubmission)
                      .IsRequired();

                entity.Property(a => a.ExpectedAnswer)
                      .IsRequired();

                entity.Property(a => a.IsCorrect)
                      .IsRequired();
            });
        }
    }
}