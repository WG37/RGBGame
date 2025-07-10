using BE.Application.Services.GameService;
using BE.Application.Services.SessionService;
using BE.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BE
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContext<AppDbContext>(o =>
            o.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

            // sessionServices
            builder.Services.AddScoped<IGameCrudService, GameCrudService>();
            builder.Services.AddScoped<IGameQueryService, GameQueryService>();
            // gameServices
            builder.Services.AddScoped<ISessionService, SessionService>();
            builder.Services.AddScoped<ISessionLogicService, SessionLogicService>();

            // cors policy for react 
            builder.Services.AddCors(p => p.AddPolicy("AllowClient",
                config => config.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

            
            builder.Services.AddControllers()
                   .AddJsonOptions(o =>
                   {
                       o.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                       o.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
                   });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // auto migration on program start
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                db.Database.Migrate();
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseRouting();

            app.UseCors("AllowClient");

            // app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
