 import { useEffect, useState } from "react";
import axios from "axios";

const MyCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyCourses = async () => {
      const res = await axios.get(
        "https://course-platform-okkm.onrender.com/api/enrollments/mycources",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEnrollments(res.data);
    };

    fetchMyCourses();
  }, [token]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}> My Enrolled Courses</h2>

      {enrollments.length === 0 && (
        <p style={styles.empty}>You haven’t enrolled in any courses yet.</p>
      )}

      <div style={styles.grid}>
        {enrollments.map((e) => (
          <div key={e._id} style={styles.card}>
            <h3 style={styles.title}>{e.course?.title}</h3>
            <p style={styles.description}>{e.course?.description}</p>

            <span style={styles.badge}>Enrolled</span>
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
    fontSize: "15px",
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
    position: "relative",
  },
  title: {
    margin: "0 0 10px",
    color: "#111827",
  },
  description: {
    color: "#4b5563",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  badge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    backgroundColor: "#22c55e", // green
    color: "#fff",
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "12px",
  },
};

export default MyCourses;
