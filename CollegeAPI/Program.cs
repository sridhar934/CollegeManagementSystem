using CollegeAPI.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 🚀 Railway Hosting Port
builder.WebHost.UseUrls("http://0.0.0.0:8080");

var config = builder.Configuration;

// 1️⃣ CORS — allow React app
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

// 2️⃣ Database Connection
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        config.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(config.GetConnectionString("DefaultConnection"))
    )
);

// 3️⃣ Add HttpClient for SUPABASE 
builder.Services.AddHttpClient("supabase", client =>
{
    var supabaseUrl = config["Supabase:Url"];

    if (!string.IsNullOrEmpty(supabaseUrl))
        client.BaseAddress = new Uri(supabaseUrl);

    client.DefaultRequestHeaders.Accept.Clear();
    client.DefaultRequestHeaders.Accept.Add(
        new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json")
    );
});

// 4️⃣ Add controllers
builder.Services.AddControllers();

var app = builder.Build();

// Middleware
app.UseHttpsRedirection();
app.UseCors("AllowReactApp");

// Map controller routes
app.MapControllers();

app.Run();
