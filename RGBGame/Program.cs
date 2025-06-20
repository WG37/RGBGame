using Microsoft.EntityFrameworkCore;
using RGBGame.Application.Services.GameService;
using RGBGame.Application.Services.SessionService;
using RGBGame.Infrastructure.Data;

namespace RGBGame
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContext<AppDbContext>(o =>
            o.UseSqlServer(builder.Configuration.GetConnectionString("")));

            builder.Services.AddScoped<IGameCrudService, GameCrudService>();
            builder.Services.AddScoped<IGameQueryService, GameQueryService>();

            builder.Services.AddScoped<ISessionService, SessionService>();
            builder.Services.AddScoped<ISessionLogicService, SessionLogicService>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
