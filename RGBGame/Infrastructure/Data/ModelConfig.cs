﻿using Microsoft.EntityFrameworkCore;
using RGBGame.Domain.Entities;

namespace RGBGame.Infrastructure.Data
{
    public static class ModelConfig
    {
        public static void ConfigureModel(ModelBuilder modelBuilder)
        {
            /* game has many rules 
                => each rule references the game by GameId */

            modelBuilder.Entity<Game>()
                .HasMany(g => g.Rules)
                .WithOne(r => r.Game)
                .HasForeignKey(r => r.GameId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Game>()
                .HasMany(g => g.Sessions)
                .WithOne(s => s.Game)
                .HasForeignKey(s => s.GameId);

            // checks that rule table divisor property is non-negative (expressed w/ SQL)
            modelBuilder.Entity<Rule>()
                .ToTable(t => t.HasCheckConstraint("CK_Rule_NonNegDivisor", "[DIVISOR] >= 0"))
                .Property(r => r.Divisor)
                .IsRequired();
                

            // ensure unique game names
            modelBuilder.Entity<Game>()
                .HasIndex(g => g.Name)
                .IsUnique();


            // session config
            modelBuilder.Entity<Session>(builder =>
            {
                builder.HasKey(s => s.Id);
                builder.Property(s => s.GameId).IsRequired();   // gameId cannot be null
                builder.Property(s => s.Start).IsRequired();    
                builder.Property(s => s.End);
                builder.HasMany(s => s.Answers)
                       .WithOne(a => a.Session)
                       .HasForeignKey(a => a.SessionId)
                       .OnDelete(DeleteBehavior.Cascade);
            });


            modelBuilder.Entity<SessionAnswer>(builder =>
            {
                builder.HasKey(a => a.Id);
                builder.Property(a => a.Number).IsRequired();
                builder.Property(a => a.AnswerSubmission).IsRequired();
                builder.Property(a => a.ExpectedAnswer).IsRequired();
                builder.Property(a => a.IsCorrect).IsRequired();
            });
        }
    }
}
