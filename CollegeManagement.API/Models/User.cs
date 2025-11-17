namespace CollegeManagement.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string SupabaseUserId { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = "student"; // student or staff
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
