import React, { useEffect, useState } from "react";
import "./TableStyles.css";
import api from "../api"; // ✅ use axios instance

export default function ViewAttendance() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    loadAttendance();
  }, []);

  async function loadAttendance() {
    try {
      const res = await api.get("/attendance");
      setAttendance(res.data);
    } catch (err) {
      console.error("Error loading attendance:", err);
      setAttendance([]);
    }
  }

  return (
    <div className="table-box">
      <h2>Attendance Records</h2>

      {attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((a) => (
              <tr key={a.attendanceId}>
                <td>{a.attendanceId}</td>
                <td>{a.studentName}</td>
                <td>{a.status}</td>
                <td>{new Date(a.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
