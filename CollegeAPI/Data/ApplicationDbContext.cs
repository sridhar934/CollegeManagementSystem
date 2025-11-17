using CollegeAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CollegeAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Mark> Marks { get; set; }
        public DbSet<StudentAttendance> StudentAttendances { get; set; }
        public DbSet<Fees> Fees { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // StudentAttendance primary key
            modelBuilder.Entity<StudentAttendance>()
                .HasKey(a => a.AttendanceId);

            // 🔥 ADD THIS FOR FEES PRIMARY KEY
            modelBuilder.Entity<Fees>()
                .HasKey(f => f.FeesId);
        }
    }
}
