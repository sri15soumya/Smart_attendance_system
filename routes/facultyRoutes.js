const express = require("express");
const crypto = require("crypto");
const QRCode = require("qrcode");
const Session = require("../models/Session");
const { encrypt } = require("../utils/encryption");

const router = express.Router();

/* Classroom coordinates */
const CLASS_LAT = 12.84296;
const CLASS_LON = 80.15804;
router.post("/start-session", async (req, res) => {

    try {

        /* Generate unique session id */
        const sessionId = crypto.randomBytes(16).toString("hex");

        /* QR valid for 5 minutes */
        const expiry = Date.now() + 5 * 60 * 1000;

        /* Payload inside QR */
        const payload = JSON.stringify({
            sessionId,
            expiry,
            classLat: CLASS_LAT,
            classLon: CLASS_LON
        });

        /* Encrypt payload */
        const encrypted = encrypt(payload);

        /* Store session in database */
        await Session.create({
            sessionId,
            expiry
        });

        /* Generate QR image */
        const qr = await QRCode.toDataURL(encrypted);

        res.json({ qr });

    } catch (err) {

        console.error("Error generating session:", err);

        res.status(500).json({
            msg: "Failed to generate QR session"
        });
    }

});

module.exports = router;