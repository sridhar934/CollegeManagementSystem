using CollegeAPI.Data;
using CollegeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CollegeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FeesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/fees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fees>>> GetAllFees()
        {
            return await _context.Fees.ToListAsync();
        }

        // GET: api/fees/student/3
        [HttpGet("student/{studentId}")]
        public async Task<ActionResult<IEnumerable<Fees>>> GetFeesByStudent(int studentId)
        {
            return await _context.Fees
                .Where(f => f.StudentId == studentId)
                .ToListAsync();
        }

        // POST: api/fees
        [HttpPost]
        public async Task<ActionResult<Fees>> AddFee(Fees fee)
        {
            fee.CreatedDate = DateTime.Now;

            _context.Fees.Add(fee);
            await _context.SaveChangesAsync();

            return Ok(fee);
        }

        // PUT: api/fees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFee(int id, Fees fee)
        {
            var existing = await _context.Fees.FindAsync(id);
            if (existing == null)
                return NotFound();

            existing.Amount = fee.Amount;
            existing.Status = fee.Status;

            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        // DELETE: api/fees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFee(int id)
        {
            var fee = await _context.Fees.FindAsync(id);
            if (fee == null)
                return NotFound();

            _context.Fees.Remove(fee);
            await _context.SaveChangesAsync();

            return Ok("Fee Deleted");
        }
    }
}
