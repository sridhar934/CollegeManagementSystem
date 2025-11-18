import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import api from "../api"; // ✅ using axios instance

export default function Dashboard({ role, onLogout }) {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const studentRes = await api.get("/student");
      setStudents(studentRes.data);
    } catch {
      setStudents([]);
    }

    try {
      const courseRes = await api.get("/course");
      setCourses(courseRes.data);
    } catch {
      setCourses([]);
    }

    try {
      const markRes = await api.get("/mark");
      setMarks(markRes.data);
    } catch {
      setMarks([]);
    }
  }

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
