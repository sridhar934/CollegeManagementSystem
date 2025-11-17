namespace CollegeAPI.Models
{
    public class Fees
    {
        public int FeesId { get; set; }  // PRIMARY KEY (IMPORTANT)
        public int StudentId { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
    }
}
