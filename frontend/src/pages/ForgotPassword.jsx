 import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://course-platform-okkm.onrender.com/api/auth/forgot-password",
        {
          email,
          newPassword,
        }
      );

      setMessage(res.data.message || "Password updated successfully");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        <p style={styles.subtitle}>
          Enter your registered email and new password
        </p>

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="New Password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />

        <button disabled={loading} style={styles.button}>
          {loading ? "Updating..." : "Update Password"}
        </button>

        <p style={styles.back}>
          Remembered your password?{" "}
          <Link to="/" style={styles.link}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    width: "380px",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
  },
  success: {
    color: "#16a34a",
    fontSize: "14px",
    marginBottom: "10px",
  },
  error: {
    color: "#dc2626",
    fontSize: "14px",
    marginBottom: "10px",
  },
  back: {
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
  },
};

export default ForgotPassword;
