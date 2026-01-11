 import { useEffect, useState } from "react";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../services/courseService";

const ManageInstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "DRAFT",
  });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const loadCourses = async () => {
    const data = await getAllCourses(token);
    setCourses(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateCourse(editId, form, token);
    } else {
      await createCourse(form, token);
    }

    setForm({ title: "", description: "", status: "DRAFT" });
    setEditId(null);
    loadCourses();
  };

  const handleEdit = (course) => {
    setEditId(course._id);
    setForm({
      title: course.title,
      description: course.description,
      status: course.status,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this course?")) {
      await deleteCourse(id, token);
      loadCourses();
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📚 My Courses</h2>

      {/* FORM */}
      <div style={styles.formCard}>
        <h3>{editId ? "Edit Course" : "Create New Course"}</h3>

        <input
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
        />

        <textarea
          name="description"
          placeholder="Course Description"
          value={form.description}
          onChange={handleChange}
          style={styles.textarea}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>

        <button onClick={handleSubmit} style={styles.primaryBtn}>
          {editId ? "Update Course" : "Create Course"}
        </button>
      </div>

      {/* COURSE LIST */}
      {courses.length === 0 ? (
        <p style={styles.empty}>No courses created yet</p>
      ) : (
        <div style={styles.grid}>
          {courses.map((c) => (
            <div key={c._id} style={styles.card}>
              <span
                style={{
                  ...styles.badge,
                  backgroundColor:
                    c.status === "PUBLISHED" ? "#22c55e" : "#f59e0b",
                }}
              >
                {c.status}
              </span>

              <h4>{c.title}</h4>

              <div style={styles.actions}>
                <button
                  onClick={() => handleEdit(c)}
                  style={styles.editBtn}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(c._id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "25px",
  },
  heading: {
    marginBottom: "20px",
    color: "#1e293b",
  },
  formCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    maxWidth: "500px",
    marginBottom: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    minHeight: "80px",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
  },
  primaryBtn: {
    padding: "10px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  empty: {
    color: "#6b7280",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    color: "#fff",
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "12px",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  editBtn: {
    padding: "6px 12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 12px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ManageInstructorCourses;
