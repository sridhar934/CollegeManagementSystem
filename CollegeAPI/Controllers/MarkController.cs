using CollegeAPI.Data;
using CollegeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CollegeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarkController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MarkController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mark>>> GetMarks()
        {
            return await _context.Marks.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> AddMark(Mark mark)
        {
            _context.Marks.Add(mark);
            await _context.SaveChangesAsync();
            return Ok(mark);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMark(int id, Mark updatedMark)
        {
            var mark = await _context.Marks.FindAsync(id);
            if (mark == null)
                return NotFound();

            mark.StudentName = updatedMark.StudentName;
            mark.Subject = updatedMark.Subject;
            mark.Score = updatedMark.Score;

            await _context.SaveChangesAsync();
            return Ok(mark);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMark(int id)
        {
            var mark = await _context.Marks.FindAsync(id);
            if (mark == null)
                return NotFound();

            _context.Marks.Remove(mark);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
