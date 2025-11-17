namespace CollegeAPI.Models
{
    public class StudentAttendance
    {
        public int AttendanceId { get; set; }

        public int StudentId { get; set; }

        public string StudentName { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;  // Present / Absent

        public DateTime Date { get; set; }   // <-- FIX: Must be DateTime
    }
}
