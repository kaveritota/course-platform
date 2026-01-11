 import { useEffect, useState } from "react";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../services/courseService";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("DRAFT");

   const token = localStorage.getItem("token");

  const loadCourses = async () => {
    try {
      const data = await getAllCourses(token);
      setCourses(data);
    } catch (err) {
      console.error("Failed to load courses", err);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // ADD COURSE
  const handleAddCourse = async () => {
    if (!title || !description) {
      alert("Title and description required");
      return;
    }

    await createCourse(
      { title, description, status: "DRAFT" },
      token
    );

    setTitle("");
    setDescription("");
    loadCourses();
  };

  // EDIT COURSE
  const handleUpdate = async (id) => {
    await updateCourse(
      id,
      { title, description ,status},
      token
    );
    setEditingId(null);
    setTitle("");
    setDescription("");
    setStatus("DRAFT");
    loadCourses();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this course?")) {
      await deleteCourse(id, token);
      loadCourses();
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📚 Admin – Manage Courses</h2>

      {/* ADD COURSE */}
      <div style={styles.form}>
        <h4>Add New Course</h4>

        <input
          style={styles.input}
          placeholder="Course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Course description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button style={styles.primaryBtn} onClick={handleAddCourse}>
          Add Course
        </button>
      </div>

      {/* COURSE LIST */}
      {courses.length === 0 && <p>No courses found</p>}

      <div style={styles.grid}>
        {courses.map((course) => (
          <div key={course._id} style={styles.card}>
            {editingId === course._id ? (
              <>
                <input
                  style={styles.input}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  style={styles.textarea}
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                />
                <button
                  style={styles.primaryBtn}
                  onClick={() => handleUpdate(course._id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h4>{course.title}</h4>
                <p>{course.description}</p>

                <p>
                  <b>Status:</b>{" "}
                  <span
                    style={{
                      color:
                        course.status === "PUBLISHED"
                          ? "green"
                          : "orange",
                    }}
                  >
                    {course.status}
                  </span>
                </p>

                <p>
                  <b>Instructor:</b>{" "}
                  {course.instructor?.name || "N/A"}
                </p>

                <p>
                  <b>Enrollments:</b>{" "}
                  {course.enrollments || 0}
                </p>

                <div style={styles.actions}>
                  <button
                    style={styles.editBtn}
                    onClick={() => {
                      setEditingId(course._id);
                      setTitle(course.title);
                      setDescription(course.description);
                    }}
                  >
                    Edit
                  </button>

                  {course.status !== "PUBLISHED" && (
                    <button
                      style={styles.publishBtn}
                      onClick={() =>
                        updateCourse(
                          course._id,
                          { status: "PUBLISHED" },
                          token
                        ).then(loadCourses)
                      }
                    >
                      Publish
                    </button>
                  )}

                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
  },
  form: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "25px",
    background: "#f9fafb",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    minHeight: "60px",
    marginBottom: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #e5e7eb",
    padding: "15px",
    borderRadius: "8px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  actions: {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
  },
  editBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
  },
  publishBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
  },
};

export default ManageCourses;
