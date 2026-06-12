const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const roleMiddleware =
require("../middleware/roleMiddleware");

const {
    startSession,facultySessionHistory,attendanceByDate
} = require(
    "../controllers/sessionController"
);

router.post(
    "/start-session",

    authMiddleware,

    roleMiddleware(
        "faculty"
    ),

    startSession
);



router.get("/history",authMiddleware,roleMiddleware("faculty","admin"),facultySessionHistory)

router.get(

    "/attendance",

    authMiddleware,

    roleMiddleware(
        "faculty",
        "admin"
    ),

    attendanceByDate

);
module.exports = router;