namespace CollegeManagement.API.Models
{
    public class Mark
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int CourseId { get; set; }
        public decimal? InternalMarks { get; set; }
        public decimal? ExternalMarks { get; set; }
        public DateTime? ExamDate { get; set; }
    }
}
