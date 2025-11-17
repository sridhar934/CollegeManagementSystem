import React, { useState, useEffect } from "react";

export default function AddAttendance() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5059/api/student")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAttendance = { studentId, subject, date, status };

    const res = await fetch("http://localhost:5059/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAttendance),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Attendance</h2>

      <form onSubmit={handleSubmit}>
        <label>Student:</label><br/>
        <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.studentId} value={s.studentId}>
              {s.name} ({s.rollNo})
            </option>
          ))}
        </select>
        <br/><br/>

        <input 
          type="text" 
          placeholder="Subject" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        /><br/><br/>

        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
        /><br/><br/>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Present</option>
          <option>Absent</option>
        </select><br/><br/>

        <button type="submit">Save Attendance</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}
