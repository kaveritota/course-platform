import { Outlet } from "react-router-dom";
import StudentNavbar from "../../components/StudentNavbar";
import CourseList from './CourseList'

const StudentDashboard = () => {
  return (
    <>
      <StudentNavbar />
      <div style={{ padding: "20px" }}>
        <h2>Student Dashboard</h2>
       <Outlet />
       <CourseList/>
      </div>
    </>
  );
};

export default StudentDashboard;
