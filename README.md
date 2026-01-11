Role-Based Online Course Management Platform

A full-stack web application that allows Admins, Instructors, and Students to manage and access courses based on their roles.
Built using React, Node.js, Express, and MongoDB with JWT authentication.

🚀 Features
👥 User Roles
Super Admin
Manage all users
Create, update, delete courses
View enrollment statistics

Instructor
Create and manage own courses
Publish / unpublish courses

Student
View published courses
Enroll in courses
View enrolled courses

🔐 Authentication & Authorization
Single login for all roles
JWT-based authentication (Access Token)
Role-Based Access Control (RBAC)
Protected routes in frontend
Unauthorized access shows Access Denied
Forgot Password (simple – email + new password)

📚 Course Management
Course CRUD (Create, Read, Update, Delete)
Course status: Draft / Published
Enrollment count per course
Role-based course visibility

🛠️ Tech Stack
Frontend
React.js (Hooks, Context API)
React Router
Axios
Inline CSS (custom styling)

Backend
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
Database
MongoDB Atlas

📂 Project Structure
course-platform/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── context/
│   │   └── routes/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
└── README.md

Setup Instructions
1️.Clone the Repository
git clone https://github.com/kaveritota/course-platform.git
cd course-platform

🔧 Backend Setup
cd server
npm install

Create .env file inside backend
PORT=3000
MONGO_URI=mongodb+srv://kaveritota_db_user:course_db@course-cluster.v6zlfue.mongodb.net/?appName=course-cluster
JWT_SECRET=supersecret123
JWT_REFRESH_SECRET=refreshsecret123 

Start Backend Server
npm start or nodemon server.js

Server will run on:
http://localhost:3000

🎨 Frontend Setup
cd frontend
npm install
npm run dev


Frontend will run on:
http://localhost:5173

🔑 API Endpoints (Sample)
Auth
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password

Courses
GET /api/courses
POST /api/courses
PUT /api/courses/:id
DELETE /api/courses/:id

Enrollments
POST /api/enrollments/:courseId
GET /api/enrollments/mycources

🧪 Testing
APIs tested using Postman
Protected routes tested with JWT tokens

🌐 Deployment

Frontend:vercel
Backend: Render
Database: MongoDB Atlas

🧠 Learning Outcomes
Implemented role-based authentication
Built secure REST APIs
Designed reusable React components
Handled protected routes and RBAC
Managed state and API integration
Understood full deployment flow
 
