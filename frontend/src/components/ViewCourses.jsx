import React, { useEffect, useState } from "react";
import "./Courses.css";

export default function ViewCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5059/api/course")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch(() => setCourses([]));
  }, []);

  return (
    <div className="course-container">
      <h2 className="course-title">Available Courses</h2>

      {courses.length === 0 ? (
        <p className="no-data">No courses available.</p>
      ) : (
        <table className="course-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c) => (
              <tr key={c.courseId}>
                <td>{c.courseId}</td>
                <td>{c.courseName}</td>
                <td>{c.courseCode}</td>
                <td>{c.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
