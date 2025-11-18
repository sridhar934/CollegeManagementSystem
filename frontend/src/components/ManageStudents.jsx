import React, { useEffect, useState } from "react";
import api from "../api"; // ✅ axios instance

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    course: "",
  });

  // Load students
  const loadStudents = async () => {
    try {
      const res = await api.get("/student"); // ✅ updated
      setStudents(res.data);
    } catch (err) {
      console.error("Error loading students:", err);
      setStudents([]);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Delete student
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure to delete this student?")) return;

    try {
      await api.delete(`/student/${id}`); // ✅ updated
      loadStudents();
    } catch (err) {
      console.error("Delete error:", err);
    }
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

  // Save edited student
  const saveEdit = async () => {
    try {
      await api.put(`/student/${editing}`, form); // ✅ updated
      setEditing(null);
      loadStudents();
    } catch (err) {
      console.error("Update error:", err);
    }
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
                  <td>
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </td>

                  <td>
                    <input
                      value={form.rollNo}
                      onChange={(e) =>
                        setForm({ ...form, rollNo: e.target.value })
                      }
                    />
                  </td>

                  <td>
                    <input
                      value={form.course}
                      onChange={(e) =>
                        setForm({ ...form, course: e.target.value })
                      }
                    />
                  </td>

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
