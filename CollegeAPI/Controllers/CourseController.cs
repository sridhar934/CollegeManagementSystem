using CollegeAPI.Data;
using CollegeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CollegeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public CourseController(ApplicationDbContext db)
        {
            _db = db;
        }

        // GET all courses
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _db.Courses.ToListAsync());
        }

        // POST create course
        [HttpPost]
        public async Task<IActionResult> Create(Course course)
        {
            _db.Courses.Add(course);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Course Added Successfully" });
        }

        // PUT update course
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Course updated)
        {
            var course = await _db.Courses.FindAsync(id);
            if (course == null)
                return NotFound();

            course.CourseName = updated.CourseName;
            course.CourseCode = updated.CourseCode;
            course.Description = updated.Description;

            await _db.SaveChangesAsync();
            return Ok(new { message = "Course Updated Successfully" });
        }

        // DELETE course
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var course = await _db.Courses.FindAsync(id);
            if (course == null)
                return NotFound();

            _db.Courses.Remove(course);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Course Deleted Successfully" });
        }
    }
}
