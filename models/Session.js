const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    sessionId: String,
    expiry: Number,
    facultyId: String
});

module.exports = mongoose.model("Session", sessionSchema);