require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./router/auth-router");
const connectDB = require("./utils/db");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const cookieParser = require("cookie-parser");

// Import the error handler middleware
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// const corsOptions = {
//   origin: "http://localhost:5174",
//   methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
//   credentials: true,
// };

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth/", authRoute);
app.use("/api", contactRoute);
app.use("/api", serviceRoute);
app.use("/api/admin", adminRoute);

// Error handling middleware should be the last middleware
app.use(errorHandler);

const port = 5000;

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
