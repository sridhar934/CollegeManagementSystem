using CollegeAPI.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

// MySQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(configuration.GetConnectionString("DefaultConnection"))
    )
);

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
