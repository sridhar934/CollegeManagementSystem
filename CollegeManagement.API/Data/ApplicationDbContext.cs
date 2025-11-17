using Microsoft.EntityFrameworkCore;
using CollegeAPI.Models;

namespace CollegeAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Course> Courses { get; set; }
    }
}
