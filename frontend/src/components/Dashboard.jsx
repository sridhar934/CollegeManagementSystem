import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";

export default function Dashboard({ role, onLogout }) {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5059/api/student")
      .then((res) => res.json())
      .then(setStudents)
      .catch(() => setStudents([]));

    fetch("http://localhost:5059/api/course")
      .then((res) => res.json())
      .then(setCourses)
      .catch(() => setCourses([]));

    fetch("http://localhost:5059/api/mark")
      .then((res) => res.json())
      .then(setMarks)
      .catch(() => setMarks([]));
  }, []);

  return (
    <div className="dash-container">
      <Sidebar role={role} onLogout={onLogout} />

      <div className="dash-main">
        <h1 className="dash-title">
          Welcome to CIMS {role === "staff" ? " (Staff Portal)" : " (Student Portal)"}
        </h1>
        <p className="dash-subtitle">
          Manage students, courses and academic performance in one place.
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>{students.length}</h3>
            <p>Total Students</p>
          </div>

          <div className="stat-card">
            <h3>{courses.length}</h3>
            <p>Total Courses</p>
          </div>

          <div className="stat-card">
            <h3>{marks.length}</h3>
            <p>Total Marks Entries</p>
          </div>
        </div>
      </div>
    </div>
  );
}
