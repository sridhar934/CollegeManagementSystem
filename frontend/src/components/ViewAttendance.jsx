import React, { useEffect, useState } from "react";
import "./TableStyles.css";

export default function ViewAttendance() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5059/api/attendance")
      .then((res) => res.json())
      .then((data) => setAttendance(data))
      .catch((err) => console.error(err));
  }, []);

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
