 import { useEffect, useState } from "react";
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("https://course-platform-okkm.onrender.com/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(res.data);
    };

    fetchCourses();
  }, [token]);

  const handleEnroll = async (courseId) => {
    try {
      await axios.post(
        `https://course-platform-okkm.onrender.com/api/enrollments/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Enrolled successfully!");
    } catch (error) {
      alert(error.response?.data?.error || "Enrollment failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Courses</h2>

      {courses.length === 0 && (
        <p style={styles.empty}>No courses available</p>
      )}

      <div style={styles.grid}>
        {courses.map((course) => (
          <div key={course._id} style={styles.card}>
            <h3 style={styles.title}>{course.title}</h3>
            <p style={styles.description}>{course.description}</p>

            <p style={styles.instructor}>
              👨‍🏫 <b>Instructor:</b> {course.instructor?.name || "N/A"}
            </p>

            <button
              style={styles.button}
              onClick={() => handleEnroll(course._id)}
            >
              Enroll
            </button>
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
    color: "#1e293b",
  },
  empty: {
    color: "#6b7280",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    margin: "0 0 10px",
    color: "#111827",
  },
  description: {
    flexGrow: 1,
    color: "#4b5563",
    fontSize: "14px",
    marginBottom: "10px",
  },
  instructor: {
    fontSize: "13px",
    color: "#374151",
    marginBottom: "12px",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default CourseList;
