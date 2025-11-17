using CollegeAPI.Data;
using CollegeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CollegeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public StudentController(ApplicationDbContext db)
        {
            _db = db;
        }

        // GET all students
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _db.Students.ToListAsync());
        }

        // POST add student
        [HttpPost]
        public async Task<IActionResult> Add(Student s)
        {
            _db.Students.Add(s);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Student Added" });
        }

        // PUT update student
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Student updated)
        {
            var student = await _db.Students.FindAsync(id);
            if (student == null)
                return NotFound();

            student.Name = updated.Name;
            student.RollNo = updated.RollNo;
            student.Course = updated.Course;

            await _db.SaveChangesAsync();
            return Ok(new { message = "Student Updated Successfully" });
        }

        // DELETE student
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var student = await _db.Students.FindAsync(id);
            if (student == null)
                return NotFound();

            _db.Students.Remove(student);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Student Deleted Successfully" });
        }
    }
}
