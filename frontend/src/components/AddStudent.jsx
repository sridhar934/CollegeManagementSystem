import React, { useState } from "react";
import "./StudentForm.css";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setMessage("");

    const studentData = {
      name,
      rollNo,
      course
    };

    try {
      const res = await fetch("http://localhost:5059/api/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });

      if (!res.ok) {
        setMessage("Failed to add student");
        return;
      }

      setMessage("✅ Student added successfully!");

      // clear form
      setName("");
      setRollNo("");
      setCourse("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding student");
    }
  };

  return (
    <div className="form-page-wrapper">
      <div className="form-card">
        <h2 className="form-title">Add Student</h2>
        <p className="form-subtitle">
          Add a new student to the college database.
        </p>

        <form onSubmit={handleAddStudent}>
          <label className="form-label">Student Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="form-label">Roll Number</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. 22CS001"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />

          <label className="form-label">Course</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. B.E CSE"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />

          <button type="submit" className="form-btn">
            Add Student
          </button>
        </form>

        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  );
}
