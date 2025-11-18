import React, { useEffect, useState } from "react";
import "./Courses.css";
import api from "../api"; // ✅ using axios instance

export default function ViewCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const res = await api.get("/course");
      setCourses(res.data);
    } catch (err) {
      console.error("Error loading courses:", err);
      setCourses([]);
    }
  }

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
