import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddMarks.css";


export default function AddMarks() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    loadStudents();
    loadCourses();   // <-- Load subjects from Courses table
  }, []);

  async function loadStudents() {
    try {
      const res = await axios.get("http://localhost:5059/api/student");
      setStudents(res.data);
    } catch (err) {
      console.error("Error loading students:", err);
    }
  }

  async function loadCourses() {
    try {
      const res = await axios.get("http://localhost:5059/api/course");
      setCourses(res.data);
    } catch (err) {
      console.error("Error loading courses:", err);
    }
  }

  async function saveMark() {
    if (!studentId || !subject || !score) {
      alert("Please fill all fields");
      return;
    }

    const selectedStudent = students.find(
      (s) => s.id === Number(studentId)
    );

    const data = {
      studentName: selectedStudent?.name || "",
      subject,
      score: Number(score)
    };

    try {
      await axios.post("http://localhost:5059/api/mark", data);
      alert("Mark added successfully!");

      setSubject("");
      setScore("");

    } catch (err) {
      console.error(err);
      alert("Error saving mark");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Marks</h2>

      {/* STUDENT DROPDOWN */}
      <label>Student:</label>
      <select
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      >
        <option value="">-- Select Student --</option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <br /><br />

      {/* SUBJECT DROPDOWN — coming from COURSES */}
      <label>Subject:</label>
      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        <option value="">-- Select Subject --</option>
        {courses.map((c) => (
          <option key={c.courseId} value={c.courseName}>
            {c.courseName}
          </option>
        ))}
      </select>

      <br /><br />

      {/* SCORE */}
      <label>Score:</label>
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />

      <br /><br />

      {/* SAVE BUTTON */}
      <button onClick={saveMark}>Save Mark</button>
    </div>
  );
}
