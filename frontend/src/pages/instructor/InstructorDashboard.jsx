import { Outlet } from "react-router-dom";
import InstructorNavbar from "../../components/InstructorNavbar";
import ManageInstructorCourses from "./ManageInstructorCourses";

const InstructorDashboard = () => {
  return (
    <>
      <InstructorNavbar />
      <div style={{ padding: "20px" }}>
        <h2>Instructor Dashboard</h2>
        <Outlet />
        <ManageInstructorCourses/>
      </div>
    </>
  );
};

export default InstructorDashboard;
