using CollegeAPI.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Railway Hosting Port
builder.WebHost.UseUrls("http://0.0.0.0:8080");

var config = builder.Configuration;

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        config.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(config.GetConnectionString("DefaultConnection"))
    )
);

// Supabase HttpClient
builder.Services.AddHttpClient("supabase", client =>
{
    var supabaseUrl = config["Supabase:Url"];
    if (!string.IsNullOrEmpty(supabaseUrl))
        client.BaseAddress = new Uri(supabaseUrl);
});

// Controllers
builder.Services.AddControllers();

var app = builder.Build();

// Middleware
app.UseHttpsRedirection();
app.UseCors("AllowReactApp");

app.MapControllers();

app.Run();
