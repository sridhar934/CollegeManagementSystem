using CollegeAPI.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Railway/Render hosting port
builder.WebHost.UseUrls("http://0.0.0.0:8080");

var config = builder.Configuration;

// ✅ 1️⃣ CORS — allow ALL origins (React + Render frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyFrontend",
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
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

// 🚀 Enable global CORS
app.UseCors("AllowAnyFrontend");

app.MapControllers();

app.Run();
