const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Default Route
app.get("/", (req, res) => {
  res.send("Library Management API is running...");
});

// Book Routes
app.use("/api/books", bookRoutes);


//middleware for handling 404 errors
app.use(notFound);
app.use(errorHandler);
// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});