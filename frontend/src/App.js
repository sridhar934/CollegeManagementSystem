import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";

import ViewCourses from "./components/ViewCourses";
import ViewMarks from "./components/ViewMarks";

import AddStudent from "./components/AddStudent";
import AddCourses from "./components/AddCourses";
import AddMarks from "./components/AddMarks";
import ManageMarks from "./components/ManageMarks";
import ManageCourses from "./components/ManageCourses";
import ViewAttendance from "./components/ViewAttendance";
import ManageAttendance from "./components/ManageAttendance";




import AddFees from "./components/AddFees";
import ViewFees from "./components/ViewFees";
import ManageFees from "./components/ManageFees";

import { getUserRole, signOutUser } from "./Services/authService";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("sb_token");
    if (token) {
      setLoggedIn(true);
      setRole(getUserRole());
    }
  }, []);

  const handleLogout = () => {
    signOutUser();
    setLoggedIn(false);
    setRole(null);
  };

  if (!loggedIn) return <LoginPage onLogin={() => {
    setLoggedIn(true);
    setRole(getUserRole());
  }} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard role={role} onLogout={handleLogout} />} />

        <Route path="/courses" element={<ViewCourses />} />
        <Route path="/marks" element={<ViewMarks />} />

        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-courses" element={<AddCourses />} />
        <Route path="/add-marks" element={<AddMarks />} />
        <Route path="/manage-marks" element={<ManageMarks />} />


        <Route path="/add-fees" element={<AddFees />} />
        <Route path="/view-fees" element={<ViewFees />} />
        <Route path="/manage-fees" element={<ManageFees />} />
        <Route path="/manage-courses" element={<ManageCourses />} />
        <Route path="/view-attendance" element={<ViewAttendance />} />
        <Route path="/manage-attendance" element={<ManageAttendance />} />



      </Routes>
    </BrowserRouter>
  );
}
