import React, { useEffect, useState } from "react";
import "./ViewMarks.css";
import api from "../api"; // ✅ use axios API instance

export default function ViewMarks() {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    loadMarks();
  }, []);

  async function loadMarks() {
    try {
      const res = await api.get("/mark"); // ✅ updated API URL
      setMarks(res.data);
    } catch (err) {
      console.error("Error loading marks:", err);
      setMarks([]);
    }
  }

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
