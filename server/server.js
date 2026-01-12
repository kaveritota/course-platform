 const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

const app = express();

//  CORS FIX
<<<<<<< HEAD
 app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman, mobile
      const allowedOrigins = [
        "http://localhost:5173",
        "https://course-platform-jq9r.vercel.app/",
      ];
=======
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://course-platform-jq9r.vercel.app/",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// app.options("*", cors());
// app.use(cors());

/* ✅ FIXED CORS */
const allowedOrigins = [
  "http://localhost:5173",
  "https://course-platform-jq9r.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow REST tools like Postman
      if (!origin) return callback(null, true);

>>>>>>> f1667739010275ba923db6f87d7fe291d1741e1e
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
<<<<<<< HEAD
    credentials: true,
=======
>>>>>>> f1667739010275ba923db6f87d7fe291d1741e1e
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

<<<<<<< HEAD

app.options(/.*/, cors());
app.use(cors());

=======
// REQUIRED for preflight
app.options("*", cors());
>>>>>>> f1667739010275ba923db6f87d7fe291d1741e1e


// Middleware
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
