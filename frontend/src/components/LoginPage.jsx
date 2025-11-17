import React, { useState } from "react";
import "./LoginPage.css";
import ThreeBackground from "./ThreeBackground";

import { signInUser, signUpUser } from "../Services/authService";

export default function LoginPage({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignup) {
        if (role === "staff" && secretKey !== "STAFF2025") {
          setError("Invalid Staff Secret Key");
          return;
        }

        await signUpUser(email, password, role);
      } else {
        await signInUser(email, password);
      }

      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <ThreeBackground />

      <div className="login-card">
        <h2 className="title">{isSignup ? "Create Account" : "Welcome Back"}</h2>

        <form onSubmit={handleSubmit} className="form">

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Role Buttons */}
          <label className="role-label">Select Role</label>
          <div className="role-select">
            <button
              type="button"
              className={role === "student" ? "role-btn active" : "role-btn"}
              onClick={() => setRole("student")}
            >
              Student
            </button>

            <button
              type="button"
              className={role === "staff" ? "role-btn active" : "role-btn"}
              onClick={() => setRole("staff")}
            >
              Staff
            </button>
          </div>

          {/* Staff Secret Key */}
          {isSignup && role === "staff" && (
            <div className="input-group fade-in">
              <label>Staff Secret Key</label>
              <input
                type="password"
                placeholder="Enter Secret Key"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          )}

          {/* Submit Button */}
          <button className="login-btn" type="submit">
            {isSignup ? "Register" : "Login"}
          </button>
        </form>

        <p className="switch-text">
          {isSignup ? "Already have an account?" : "New user?"}{" "}
          <span className="switch-link" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>

        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
}
