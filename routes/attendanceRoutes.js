const express = require("express");
const {
   markAttendance,
    attendanceHistory,
    attendanceSummary,
    getSessionAttendance
}=require("../controllers/attendanceController");   
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");   
const router = express.Router();     
router.post(
   "/mark-attendance",
   authMiddleware,
   roleMiddleware("student"),
   markAttendance
);

router.get(
   "/history",
   authMiddleware,
   roleMiddleware("student"),
   attendanceHistory
);

router.get(
   "/summary",
   authMiddleware,
   roleMiddleware("student"),
   attendanceSummary
);

// router.get(
//    "/session/:sessionId",
//    authMiddleware,
//    roleMiddleware("faculty","admin"),
//    getSessionAttendance
// );

module.exports = router;