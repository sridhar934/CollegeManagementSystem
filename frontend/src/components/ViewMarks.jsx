import React, { useEffect, useState } from "react";
import "./ViewMarks.css";

export default function ViewMarks() {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5059/api/mark")
      .then((res) => res.json())
      .then((data) => setMarks(data))
      .catch(() => setMarks([]));
  }, []);

  return (
    <div className="marks-container">
      <h2 className="marks-title">Student Marks</h2>

      {marks.length === 0 ? (
        <p className="no-marks">No marks found.</p>
      ) : (
        <table className="marks-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            {marks.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.studentName}</td>
                <td>{m.subject}</td>
                <td>{m.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
