using CollegeAPI.Data;
using CollegeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CollegeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AttendanceController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET all attendance
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentAttendance>>> GetAttendances()
        {
            return await _context.StudentAttendances.ToListAsync();
        }

        // POST add attendance
        [HttpPost]
        public async Task<ActionResult<StudentAttendance>> AddAttendance(StudentAttendance attendance)
        {
            attendance.Date = DateTime.Now;   // ✔️ Works now because Date is DateTime

            _context.StudentAttendances.Add(attendance);
            await _context.SaveChangesAsync();

            return Ok(attendance);
        }

        // GET attendance by StudentId
        [HttpGet("student/{id}")]
        public async Task<ActionResult<IEnumerable<StudentAttendance>>> GetAttendanceByStudent(int id)
        {
            return await _context.StudentAttendances
                .Where(a => a.StudentId == id)
                .ToListAsync();
        }
    }
}
