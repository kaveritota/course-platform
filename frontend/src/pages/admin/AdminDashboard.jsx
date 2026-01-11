import AdminNavbar from "../../components/AdminNavbar";
import ManageCourses from "./ManageCourses";

import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <AdminNavbar />
      <div style={{ padding: "20px" }}>
        <h2>Admin Dashboard</h2>
        <Outlet />
        <ManageCourses/>
      </div>
    </>
  );
};

export default AdminDashboard;
