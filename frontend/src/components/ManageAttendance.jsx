import React, { useEffect, useState } from "react";

export default function ManageAttendance() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("Present");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5059/api/student")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.log(err));
  }, []);

  const addAttendance = async () => {
    if (!studentId) {
      setMessage("Select a student");
      return;
    }

    const selectedStudent = students.find(
      (s) => s.id === Number(studentId)
    );

    const attendance = {
      studentId: Number(studentId),
      studentName: selectedStudent.name,
      status,
      date: new Date().toISOString()
    };

    await fetch("http://localhost:5059/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attendance),
    });

    setMessage("Attendance Saved!");
    setStudentId("");
    setStatus("Present");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Attendance</h2>

      <label>Student:</label><br />
      <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
        <option value="">-- Select Student --</option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} ({s.rollNo})
          </option>
        ))}
      </select>

      <br /><br />

      <label>Status:</label><br />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <br /><br />

      <button onClick={addAttendance}>Save Attendance</button>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}
