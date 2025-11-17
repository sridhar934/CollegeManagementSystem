import React, { useEffect, useState } from "react";
import "./TableStyles.css";

export default function ManageFees() {
  const [students, setStudents] = useState([]);
  const [feeData, setFeeData] = useState({
    studentId: "",
    amount: "",
    status: "Pending",
  });

  // Load Students
  useEffect(() => {
    fetch("http://localhost:5059/api/student")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5059/api/fees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feeData),
    })
      .then(() => {
        alert("Fee Added Successfully!");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="table-box">
      <h2>Manage Fees</h2>

      {/* Add Fee Form */}
      <form onSubmit={handleSubmit} className="fee-form">
        
        <label>Select Student:</label>
        <select
          value={feeData.studentId}
          onChange={(e) =>
            setFeeData({ ...feeData, studentId: parseInt(e.target.value) })
          }
          required
        >
          <option value="">-- Select Student --</option>

          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.rollNo})
            </option>
          ))}
        </select>

        <label>Amount:</label>
        <input
          type="number"
          value={feeData.amount}
          onChange={(e) =>
            setFeeData({ ...feeData, amount: parseFloat(e.target.value) })
          }
          required
        />

        <label>Status:</label>
        <select
          value={feeData.status}
          onChange={(e) =>
            setFeeData({ ...feeData, status: e.target.value })
          }
        >
          <option>Pending</option>
          <option>Paid</option>
        </select>

        <button type="submit" className="submit-btn">
          Add Fee
        </button>
      </form>
    </div>
  );
}
