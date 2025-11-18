import React, { useState } from "react";

export default function AdminCreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const BACKEND_URL = "https://collegemanagementsystem-1-009t.onrender.com";

  const handleCreate = async (e) => {
    e.preventDefault();
    setMsg("Creating...");

    const payload = {
      name,
      email,
      role,
      password: password || undefined,
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/create-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text();
        setMsg("Error: " + t);
        return;
      }

      const data = await res.json();
      setMsg(`Created: ${data.personalId} (Supabase ID: ${data.supabaseUserId})`);

      // clear form
      setName("");
      setEmail("");
      setPassword("");

    } catch (err) {
      console.error(err);
      setMsg("Error creating user");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin — Create User</h2>

      <form onSubmit={handleCreate}>
        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="staff">Staff</option>
        </select><br /><br />

        <input
          placeholder="Password (optional)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        <button type="submit">Create</button>
      </form>

      <p>{msg}</p>
    </div>
  );
}
