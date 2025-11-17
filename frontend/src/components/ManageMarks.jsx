import React, { useEffect, useState } from "react";
import "./ManageMarks.css";

export default function ManageMarks() {
  const [marks, setMarks] = useState([]);
  const [editMark, setEditMark] = useState(null);
  const [newScore, setNewScore] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const loadMarks = () => {
    fetch("http://localhost:5059/api/mark")
      .then((res) => res.json())
      .then((data) => setMarks(data))
      .catch(() => setMarks([]));
  };

  useEffect(() => {
    loadMarks();
  }, []);

  const updateMark = async () => {
    const updated = {
      id: editMark.id,
      studentName: editMark.studentName,
      subject: newSubject,
      score: newScore
    };

    const res = await fetch(`http://localhost:5059/api/mark/${editMark.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });

    if (res.ok) {
      alert("Mark updated!");
      setEditMark(null);
      loadMarks();
    } else {
      alert("Update failed!");
    }
  };

  const deleteMark = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    const res = await fetch(`http://localhost:5059/api/mark/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      alert("Mark deleted");
      loadMarks();
    }
  };

  return (
    <div className="manage-marks-container">
      <h2 className="title">Manage Marks</h2>

      <table className="marks-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Subject</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {marks.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.studentName}</td>
              <td>{m.subject}</td>
              <td>{m.score}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditMark(m);
                    setNewSubject(m.subject);
                    setNewScore(m.score);
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteMark(m.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editMark && (
        <div className="edit-modal">
          <h3>Edit Mark</h3>

          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Subject"
          />

          <input
            type="number"
            value={newScore}
            onChange={(e) => setNewScore(e.target.value)}
            placeholder="Score"
          />

          <button className="update-btn" onClick={updateMark}>Update</button>
          <button className="cancel-btn" onClick={() => setEditMark(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
