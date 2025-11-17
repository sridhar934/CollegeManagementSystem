import React, { useEffect, useState } from "react";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    course: "",
  });

  // Load students
  const loadStudents = () => {
    fetch("http://localhost:5059/api/student")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Delete student
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure to delete this student?")) return;

    await fetch(`http://localhost:5059/api/student/${id}`, { method: "DELETE" });

    loadStudents();
  };

  // Start editing
  const startEdit = (s) => {
    setEditing(s.studentId);
    setForm({
      name: s.name,
      rollNo: s.rollNo,
      course: s.course,
    });
  };

  // Save update
  const saveEdit = async () => {
    await fetch(`http://localhost:5059/api/student/${editing}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setEditing(null);
    loadStudents();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Students</h2>

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.studentId}>
              <td>{s.studentId}</td>

              {editing === s.studentId ? (
                <>
                  <td><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></td>
                  <td><input value={form.rollNo} onChange={(e) => setForm({ ...form, rollNo: e.target.value })} /></td>
                  <td><input value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} /></td>

                  <td>
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={() => setEditing(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{s.name}</td>
                  <td>{s.rollNo}</td>
                  <td>{s.course}</td>

                  <td>
                    <button onClick={() => startEdit(s)}>Edit</button>
                    <button onClick={() => deleteStudent(s.studentId)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
