require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

//MIDDLEWARE

app.use(cors());
app.use(express.json());

//DATABASE CONNECTION

connectDB();


// Authentication Routes
app.use("/", authRoutes);

// Faculty Routes
app.use("/", facultyRoutes);

// Student Routes
app.use("/", studentRoutes);


app.get("/", (req, res) => {
    res.send("Smart Secure Attendance Server Running ");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});