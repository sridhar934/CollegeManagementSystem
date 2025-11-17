import React, { useEffect, useState } from "react";
import "./TableStyles.css";

export default function ViewFees() {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5059/api/fees")
      .then((res) => res.json())
      .then((data) => setFees(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="table-box">
      <h2>Fee Records</h2>

      {fees.length === 0 ? (
        <p>No fees added.</p>
      ) : (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Fee ID</th>
              <th>Student ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {fees.map((fee) => (
              <tr key={fee.feesId}>
                <td>{fee.feesId}</td>
                <td>{fee.studentId}</td>
                <td>{fee.amount}</td>
                <td>{fee.status}</td>
                <td>{new Date(fee.createdDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
