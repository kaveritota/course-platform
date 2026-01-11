 import { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../../services/userService.js";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const loadUsers = async () => {
    const data = await getAllUsers(token);
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>👥 Manage Users</h2>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} style={styles.tr}>
                <td style={styles.td}>{u.name}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}>
                  <select
                    value={u.role}
                    style={styles.select}
                    onChange={(e) =>
                      updateUserRole(u._id, e.target.value, token).then(loadUsers)
                    }
                  >
                    <option value="STUDENT">Student</option>
                    <option value="INSTRUCTOR">Instructor</option>
                    <option value="SUPER_ADMIN">Admin</option>
                  </select>
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteBtn}
                    onClick={() =>
                      window.confirm("Delete this user?")
                        ? deleteUser(u._id, token).then(loadUsers)
                        : null
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="4" style={styles.empty}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
  tableWrapper: {
    overflowX: "auto",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#f1f5f9",
    padding: "12px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "14px",
    color: "#334155",
    borderBottom: "1px solid #e5e7eb",
  },
  tr: {
    transition: "background 0.2s",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "14px",
    color: "#334155",
  },
  select: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #cbd5f5",
    outline: "none",
    background: "#fff",
  },
  deleteBtn: {
    padding: "6px 12px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  empty: {
    padding: "20px",
    textAlign: "center",
    color: "#6b7280",
  },
};

export default ManageUsers;
