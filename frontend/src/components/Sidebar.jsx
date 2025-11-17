import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaChartBar,
  FaUsers,
  FaPlusCircle,
  FaMoneyBill,
  FaClipboardList,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

export default function Sidebar({ role, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={collapsed ? "sidebar collapsed" : "sidebar"}>
      {/* Collapse Arrow */}
      <button
        className="collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Expand" : "Collapse"}
      >
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      {/* Title */}
      <h2 className="side-title">{collapsed ? "CIMS" : "College CIMS"}</h2>

      <ul className="side-menu">
        {/* Main Links */}
        <li>
          <Link to="/" className="side-link">
            <FaHome />
            {!collapsed && <span>Dashboard</span>}
          </Link>
        </li>

        <li>
          <Link to="/courses" className="side-link">
            <FaBook />
            {!collapsed && <span>View Courses</span>}
          </Link>
        </li>

        <li>
          <Link to="/marks" className="side-link">
            <FaChartBar />
            {!collapsed && <span>View Marks</span>}
          </Link>
        </li>

        <li>
          <Link to="/view-attendance" className="side-link">
            <FaClipboardList />
            {!collapsed && <span>View Attendance</span>}
          </Link>
        </li>

        <li>
          <Link to="/view-fees" className="side-link">
            <FaMoneyBill />
            {!collapsed && <span>View Fees</span>}
          </Link>
        </li>

        {/* Management – LAST SECTION for staff only */}
        {role === "staff" && (
          <>
            {!collapsed && <p className="section-title">Management</p>}

            <li>
              <Link to="/add-student" className="side-link">
                <FaUsers />
                {!collapsed && <span>Add Student</span>}
              </Link>
            </li>

            <li>
              <Link to="/add-courses" className="side-link">
                <FaPlusCircle />
                {!collapsed && <span>Add Course</span>}
              </Link>
            </li>

            <li>
              <Link to="/add-marks" className="side-link">
                <FaPlusCircle />
                {!collapsed && <span>Add Marks</span>}
              </Link>
            </li>

            <li>
              <Link to="/add-fees" className="side-link">
                <FaMoneyBill />
                {!collapsed && <span>Add Fees</span>}
              </Link>
            </li>

            <li>
              <Link to="/manage-fees" className="side-link">
                <FaMoneyBill />
                {!collapsed && <span>Manage Fees</span>}
              </Link>
            </li>

            <li>
              <Link to="/manage-courses" className="side-link">
                <FaBook />
                {!collapsed && <span>Manage Courses</span>}
              </Link>
            </li>

            <li>
              <Link to="/manage-marks" className="side-link">
                <FaChartBar />
                {!collapsed && <span>Manage Marks</span>}
              </Link>
            </li>

            <li>
              <Link to="/manage-attendance" className="side-link">
                <FaClipboardList />
                {!collapsed && <span>Manage Attendance</span>}
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Logout at Bottom */}
      <div className="side-footer">
        <button className="logout-btn" onClick={onLogout}>
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
}
