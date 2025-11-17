namespace CollegeAPI.Models
{
    public class User
    {
        public int UserId { get; set; } // local PK
        public string SupabaseUserId { get; set; } = "";
        public string Email { get; set; } = "";
        public string Name { get; set; } = "";
        public string Role { get; set; } = ""; // "student" or "staff"
        public string PersonalId { get; set; } = ""; // STD001 / STF001
    }
}
