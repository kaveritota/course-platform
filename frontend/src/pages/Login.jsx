import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://course-platform-okkm.onrender.com/api/auth/login", {
        email,
        password,
      });

      const { accessToken, user } = res.data;

      login(accessToken, user.role);

      //  Role-based routing
      if (user.role === "SUPER_ADMIN") navigate("/admin");
      else if (user.role === "INSTRUCTOR") navigate("/instructor");
      else navigate("/student");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <p style={{ marginTop: "10px" }}>
           <a href="/forgot-password" style={{ color: "#2563eb" }}>
             Forgot password?
                   </a>
                 </p>

        <button style={styles.button}>Login</button>

        <p style={{ marginTop: "10px" }}>
          New user? <Link to="/register">Register</Link>
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
    width: "350px",
    padding: "30px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Login;
