const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDB =
require("./config/db");

const authRoutes =
require("./routes/authRoutes");

const sessionRoutes =
require("./routes/sessionRoutes");

const attendanceRoutes =
require("./routes/attendanceRoutes");
const {rateLimiter}= require("./middleware/rateLimiter")

const classroomRoutes =
require(
"./routes/classroomRoutes"
);

const subjectRoutes =
require(
"./routes/subjectRoutes"
);

const cors = require("cors");

const app = express();

connectDB();
app.use(cors());

app.use(express.json());
app.use(rateLimiter);

app.use("/auth", authRoutes);

app.use("/sessions", sessionRoutes);

app.use("/attendance", attendanceRoutes);

app.use("/classrooms",classroomRoutes);

app.use("/subjects",subjectRoutes);





const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on ${PORT}`
    );

});