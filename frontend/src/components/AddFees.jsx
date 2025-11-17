import React, { useEffect, useState } from "react";
import "./Fees.css";

export default function AddFees() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [amount, setAmount] = useState("");

  // Load students when page opens
  useEffect(() => {
    fetch("http://localhost:5059/api/student")
      .then((res) => res.json())
      .then((data) => {
        console.log("STUDENTS LOADED:", data);
        setStudents(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.log("Error loading students:", err);
        setStudents([]);
      });
  }, []);

  const submitFee = async (e) => {
    e.preventDefault();

    const fee = {
      studentId: parseInt(studentId),
      amount: parseFloat(amount),
      status: "Pending"
    };

    const res = await fetch("http://localhost:5059/api/fees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fee)
    });

    if (res.ok) {
      alert("Fee added successfully!");
      setStudentId("");
      setAmount("");
    } else {
      alert("Error adding fee");
    }
  };

  return (
    <div className="add-fee-wrapper">
      <div className="add-fee-box">
        <h2>Add Fees</h2>

        <form onSubmit={submitFee}>
          <label>Select Student</label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            <option value="">-- Select Student --</option>

            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter Fee Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button type="submit" className="submit-btn">Save Fee</button>
        </form>
      </div>
    </div>
  );
}
