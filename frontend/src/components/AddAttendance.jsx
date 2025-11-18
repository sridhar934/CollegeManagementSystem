import React, { useState, useEffect } from "react";
import api from "../api";   // ✅ use shared axios instance

export default function AddAttendance() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const res = await api.get("/student");   // ✅ UPDATED
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to load students", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAttendance = { studentId, subject, date, status };

    try {
      const res = await api.post("/attendance", newAttendance);  // ✅ UPDATED
      setMessage("Attendance saved successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to save attendance");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Attendance</h2>

      <form onSubmit={handleSubmit}>
        <label>Student:</label><br />
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>   {/* ✅ changed studentId → id */}
              {s.name} ({s.rollNo})
            </option>
          ))}
        </select>
        <br /><br />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        /><br /><br />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        /><br /><br />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Present</option>
          <option>Absent</option>
        </select><br /><br />

        <button type="submit">Save Attendance</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}
