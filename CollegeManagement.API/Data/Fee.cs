namespace CollegeManagement.API.Models
{
    public class Fee
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public decimal TotalFee { get; set; }
        public decimal PaidAmount { get; set; }
        public DateTime? LastPaymentDate { get; set; }
    }
}
