namespace CollegeManagement.API.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string RollNo { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public int? CourseId { get; set; }
        public Course? Course { get; set; }
    }
}
