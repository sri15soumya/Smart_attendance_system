const express = require("express");
const Attendance = require("../models/Attendance");
const Session = require("../models/Session");
const { decrypt } = require("../utils/encryption");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/mark-attendance", authMiddleware, async (req, res) => {

    const { token } = req.body;

    const decrypted = JSON.parse(decrypt(token));

    const session = await Session.findOne({
        sessionId: decrypted.sessionId
    });

    if (!session || Date.now() > decrypted.expiry)
        return res.status(400).json({ msg: "Session expired" });

    const existing = await Attendance.findOne({
        sessionId: decrypted.sessionId,
        studentId: req.user.id
    });

    if (existing)
        return res.status(400).json({ msg: "Already marked" });

    await Attendance.create({
        sessionId: decrypted.sessionId,
        studentId: req.user.id,
        timestamp: new Date()
    });

    res.json({ msg: "Attendance marked successfully" });
});
module.exports = router;