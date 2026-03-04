const express = require("express");
const crypto = require("crypto");
const QRCode = require("qrcode");
const Session = require("../models/Session");
const { encrypt } = require("../utils/encryption");

const router = express.Router();

router.post("/start-session", async (req, res) => {

    const sessionId = crypto.randomBytes(16).toString("hex");
    const expiry = Date.now() + 5 * 60 * 1000;

    const payload = JSON.stringify({ sessionId, expiry });
    const encrypted = encrypt(payload);

    await Session.create({ sessionId, expiry });

    const qr = await QRCode.toDataURL(encrypted);

    res.json({ qr });
});

module.exports = router;