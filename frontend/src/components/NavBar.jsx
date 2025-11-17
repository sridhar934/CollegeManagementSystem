import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ role, onLogout }) {
  return (
    <div style={{ padding: "10px", background: "#efefef", marginBottom: "20px" }}>
      <h3>College Management System</h3>

      <ul>
        {role === "student" && (
          <>
            <li><Link to="/courses">View Courses</Link></li>
            <li><Link to="/marks">View Marks</Link></li>
          </>
        )}

        {role === "staff" && (
          <>
            <li><Link to="/add-student">Add Student</Link></li>
            <li><Link to="/add-courses">Add Courses</Link></li>
            <li><Link to="/add-marks">Add Marks</Link></li>
            <li><Link to="/courses">View Courses</Link></li>
            <li><Link to="/marks">View Marks</Link></li>
            <li><Link to="/add-attendance">Add Attendance</Link></li>
            <li><Link to="/attendance">Attendance</Link></li>
            <li><Link to="/manage-attendance">Manage Attendance</Link></li>
            <li><Link to="/manage-students">Manage Students</Link></li>
            <li><Link to="/add-fees">Add Fees</Link></li>
            <li><Link to="/manage-fees">Manage Fees</Link></li>
            <li><Link to="/fees">View Fees</Link></li>
            <li><Link to="/admin/create-user">Create User</Link></li>







          </>
        )}
      </ul>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
