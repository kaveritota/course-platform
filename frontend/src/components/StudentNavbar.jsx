import { Link, useNavigate } from "react-router-dom";

const StudentNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>Course Platform</h3>

      <div style={styles.links}>
        <Link to="/student" style={styles.link}>
          Dashboard
        </Link>

        <Link to="/student/my-courses" style={styles.link}>
          My Courses
        </Link>

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    backgroundColor: "#1e293b", // slate-800
    color: "#fff",
  },
  logo: {
    margin: 0,
    fontSize: "20px",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "#e5e7eb",
    textDecoration: "none",
    fontSize: "15px",
  },
  logout: {
    padding: "6px 14px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#ef4444", // red-500
    color: "#fff",
    cursor: "pointer",
  },
};

export default StudentNavbar;
