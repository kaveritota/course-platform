import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccessDenied from "./pages/AccessDenied";
import AdminDashboard from "./pages/admin/AdminDashboard";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Navbar from "./components/Navbar";
import ManageCourses from "./pages/admin/ManageCourses";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageInstructorCourses from './pages/instructor/ManageInstructorCourses';
import MyCourses from './pages/student/MyCourses';
import ForgotPassword from "./pages/ForgotPassword";


 function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

         <Route
              path="/admin"
               element={
                <ProtectedRoute roles={["SUPER_ADMIN"]}>
               <AdminDashboard />
               </ProtectedRoute>
              }
               >
          <Route path="courses" element={<ManageCourses />} />
          <Route path="users" element={<ManageUsers />} />
         </Route>

               <Route
                  path="/instructor"
                 element={
                 <ProtectedRoute roles={["INSTRUCTOR"]}>
                   <InstructorDashboard />
                </ProtectedRoute>
                 }
              >
              <Route path="courses" element={<ManageInstructorCourses />} />
                </Route>

                 <Route
               path="/student"
                   element={
                     <ProtectedRoute roles={["STUDENT"]}>
                      <StudentDashboard/>
                    </ProtectedRoute>
                    }
                 >
                  <Route path="my-courses" element={<MyCourses/>} />
                  </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
