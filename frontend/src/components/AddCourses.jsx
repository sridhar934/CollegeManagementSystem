import React, { useState } from "react";
import "./AddCourses.css";

export default function AddCourses() {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");

  const handleAddCourse = async (e) => {
    e.preventDefault();

    const course = { courseName, courseCode, description };

    const res = await fetch("http://localhost:5059/api/course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });

    if (res.ok) {
      alert("Course Added Successfully!");
      setCourseName("");
      setCourseCode("");
      setDescription("");
    } else {
      alert("Failed to add course");
    }
  };

  return (
    <div className="add-course-wrapper">
      <div className="add-course-box">
        <h2>Add New Course</h2>

        <form onSubmit={handleAddCourse} className="add-course-form">
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />

          <textarea
            placeholder="Course Description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <button type="submit" className="add-btn">
            ➕ Add Course
          </button>
        </form>
      </div>
    </div>
  );
}
