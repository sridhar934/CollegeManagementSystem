import React, { useEffect, useState } from "react";
import "./Courses.css";
import api from "../api"; // ✅ axios instance

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [desc, setDesc] = useState("");

  // Load all courses
  const loadCourses = () => {
    api.get("/course")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log("Error:", err));
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const startEdit = (c) => {
    setEditing(c.courseId);
    setName(c.courseName);
    setCode(c.courseCode);
    setDesc(c.description);
  };

  const saveEdit = async () => {
    const updated = {
      courseName: name,
      courseCode: code,
      description: desc
    };

    await api.put(`/course/${editing}`, updated);

    setEditing(null);
    loadCourses();
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await api.delete(`/course/${id}`);

    loadCourses();
  };

  return (
    <div className="course-container">
      <h2 className="title">Manage Courses</h2>

      <table className="course-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course</th>
            <th>Code</th>
            <th>Description</th>
            <th style={{ width: "180px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((c) => (
            <tr key={c.courseId}>
              <td>{c.courseId}</td>

              {editing === c.courseId ? (
                <>
                  <td>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </td>
                  <td>
                    <button className="save-btn" onClick={saveEdit}>
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditing(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{c.courseName}</td>
                  <td>{c.courseCode}</td>
                  <td>{c.description}</td>
                  <td>
                    <button className="edit-btn" onClick={() => startEdit(c)}>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteCourse(c.courseId)}
                    >
                      Delete
                    </button>
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
