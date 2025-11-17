using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using CollegeAPI.Data;
using CollegeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CollegeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _config;
        private readonly HttpClient _http;

        public AdminController(ApplicationDbContext db, IConfiguration config, IHttpClientFactory httpFactory)
        {
            _db = db;
            _config = config;
            _http = httpFactory.CreateClient("supabase");
        }

        // GET next id for role: student => STD###, staff => STF###
        [HttpGet("next-id")]
        public async Task<IActionResult> GetNextId([FromQuery] string role)
        {
            if (string.IsNullOrWhiteSpace(role)) return BadRequest("role required");

            role = role.ToLowerInvariant();
            var prefix = role == "staff" ? "STF" : "STD";

            // Find max existing number
            var last = await _db.Users
                .Where(u => u.Role != null && u.Role.ToLower() == role)
                .OrderByDescending(u => u.PersonalId)
                .Select(u => u.PersonalId)
                .FirstOrDefaultAsync();

            int nextNum = 1;
            if (!string.IsNullOrEmpty(last) && last.Length > 3)
            {
                var numPart = last.Substring(3);
                if (int.TryParse(numPart, out var n)) nextNum = n + 1;
            }

            var nextId = $"{prefix}{nextNum.ToString("D3")}";
            return Ok(new { personalId = nextId });
        }

        // POST create user: { "name","email","password","role" }
        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest req)
        {
            if (req == null || string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Role))
                return BadRequest("email, role required");

            var role = req.Role.ToLowerInvariant();
            if (role != "student" && role != "staff") return BadRequest("role must be 'student' or 'staff'");

            // Generate personalId
            var genResp = await GetNextId(role) as OkObjectResult;
            var personalId = (genResp!.Value as JsonElement?)?.GetProperty("personalId").GetString()
                             ?? throw new Exception("Failed to generate id");

            // Create user in Supabase Admin API
            var supabaseUrl = _config["Supabase:Url"]?.TrimEnd('/') ?? throw new Exception("Supabase:Url missing");
            var serviceRole = _config["Supabase:ServiceRoleKey"] ?? throw new Exception("Supabase:ServiceRoleKey missing");

            var adminEndpoint = $"{supabaseUrl}/auth/v1/admin/users";

            // Build payload
            var payload = new
            {
                email = req.Email,
                password = req.Password ?? Guid.NewGuid().ToString("N").Substring(0, 12), // random if not provided
                email_confirm = true,
                user_metadata = new {
                    role = role,
                    personalId = personalId,
                    name = req.Name ?? ""
                }
            };

            var json = JsonSerializer.Serialize(payload);
            var httpReq = new HttpRequestMessage(HttpMethod.Post, adminEndpoint);
            httpReq.Headers.Authorization = new AuthenticationHeaderValue("Bearer", serviceRole);
            httpReq.Content = new StringContent(json, Encoding.UTF8, "application/json");

            var httpResp = await _http.SendAsync(httpReq);
            if (!httpResp.IsSuccessStatusCode)
            {
                var err = await httpResp.Content.ReadAsStringAsync();
                return StatusCode((int)httpResp.StatusCode, new { message = "Supabase create failed", detail = err });
            }

            var body = await httpResp.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(body);
            var supabaseUserId = doc.RootElement.GetProperty("id").GetString();

            // Save local user record
            var user = new User
            {
                SupabaseUserId = supabaseUserId ?? "",
                Email = req.Email,
                Name = req.Name ?? "",
                Role = role,
                PersonalId = personalId
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(new { message = "User created", personalId, supabaseUserId });
        }
    }

    public class CreateUserRequest
    {
        public string? Name { get; set; }
        public string Email { get; set; } = "";
        public string? Password { get; set; } // optional: auto-generate if null
        public string Role { get; set; } = "student";
    }
}
