// const express = require("express");
// const Attendance = require("../models/Attendance");
// const Session = require("../models/Session");
// const { decrypt } = require("../utils/encryption");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// // // /* Correct classroom coordinates */
// // // const CLASS_LAT = 12.84296;
// // // const CLASS_LON = 80.15805;

// // /* Allowed radius in meters */
// const ALLOWED_RADIUS = 50;


// /* Haversine Distance Function */
// function calculateDistance(lat1, lon1, lat2, lon2){

//     const R = 6371000;

//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;

//     const a =
//         Math.sin(dLat/2) * Math.sin(dLat/2) +
//         Math.cos(lat1 * Math.PI/180) *
//         Math.cos(lat2 * Math.PI/180) *
//         Math.sin(dLon/2) *
//         Math.sin(dLon/2);

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

//     return R * c;
// }


// router.post("/mark-attendance", authMiddleware, async (req, res) => {
//     /* Decrypt QR Token */
//     const { token, latitude, longitude } = req.body;
//     const decrypted = JSON.parse(decrypt(token));
//     const classLat = decrypted.classLat;
//     const classLon = decrypted.classLon;


//     /* Convert to numbers safely */
//     let studentLat = Number(latitude);
//     let studentLon = Number(longitude);

    
//     studentLat  = 12.84330
//     studentLon= 80.15830
    
//     /* Distance Calculation */
//     const distance = calculateDistance(
//         studentLat,
//         studentLon,
//         CLASS_LAT,
//         CLASS_LON
//     );
    
//     /* Debug logs */
//     console.log("------ LOCATION DEBUG ------");
//     console.log("Student Latitude:", studentLat);
//     console.log("Student Longitude:", studentLon);
//     console.log("Class Latitude:", CLASS_LAT);
//     console.log("Class Longitude:", CLASS_LON);
//     console.log("distance",distance)
    

//     /* Location verification */
//     if(distance > ALLOWED_RADIUS){
//         return res.status(403).json({
//             msg:"You are outside the classroom"
//         });
//     }


//     /* Check session validity */
//     const session = await Session.findOne({
//         sessionId: decrypted.sessionId
//     });

//     if (!session || Date.now() > decrypted.expiry)
//         return res.status(400).json({ msg: "Session expired" });

//     /* Prevent duplicate attendance */
//     const existing = await Attendance.findOne({
//         sessionId: decrypted.sessionId,
//         studentId: req.user.id
//     });

//     if (existing)
//         return res.status(400).json({ msg: "Already marked" });

//     /* Save attendance */
//     await Attendance.create({
//         sessionId: decrypted.sessionId,
//         studentId: req.user.id,
//         timestamp: new Date(),
//         latitude: studentLat,
//         longitude: studentLon
//     });

//     res.json({ msg: "Attendance marked successfully" });

// });

// module.exports = router;



const express = require("express");
const Attendance = require("../models/Attendance");
const Session = require("../models/Session");
const { decrypt } = require("../utils/encryption");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* Allowed radius in meters */
const ALLOWED_RADIUS = 50;


/* Haversine Distance Function */
function calculateDistance(lat1, lon1, lat2, lon2) {

    const R = 6371000;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}


router.post("/mark-attendance", authMiddleware, async (req, res) => {

    const { token, latitude, longitude } = req.body;

    /* Check if QR token exists */
    if (!token) {
        return res.status(400).json({ msg: "QR token missing" });
    }

    /* Decrypt QR payload safely */
    let decrypted;

    try {
        const decryptedText = decrypt(token);
        console.log("Decrypted payload:", decryptedText);
        decrypted = JSON.parse(decryptedText);
    } catch (err) {
        return res.status(400).json({ msg: "Invalid QR token" });
    }

    const classLat = decrypted.classLat;
    const classLon = decrypted.classLon;

    if (!classLat || !classLon) {
        return res.status(400).json({
            msg: "QR missing classroom coordinates"
        });
    }

    /* Convert student coordinates */
    const studentLat = Number(latitude);
    const studentLon = Number(longitude);

    if (!studentLat || !studentLon) {
        return res.status(400).json({
            msg: "Student location missing"
        });
    }

    /* Calculate distance */
    const distance = calculateDistance(
        studentLat,
        studentLon,
        classLat,
        classLon
    );

    console.log("------ LOCATION DEBUG ------");
    console.log("Student Latitude:", studentLat);
    console.log("Student Longitude:", studentLon);
    console.log("Class Latitude:", classLat);
    console.log("Class Longitude:", classLon);
    console.log("Distance:", distance);

    /* Location verification */
    if (distance > ALLOWED_RADIUS) {
        return res.status(403).json({
            msg: "You are outside the classroom"
        });
    }

    /* Check session validity */
    const session = await Session.findOne({
        sessionId: decrypted.sessionId
    });

    if (!session || Date.now() > decrypted.expiry) {
        return res.status(400).json({ msg: "Session expired" });
    }

    /* Prevent duplicate attendance */
    const existing = await Attendance.findOne({
        sessionId: decrypted.sessionId,
        studentId: req.user.id
    });

    if (existing) {
        return res.status(400).json({ msg: "Already marked" });
    }

    /* Save attendance */
    await Attendance.create({
        sessionId: decrypted.sessionId,
        studentId: req.user.id,
        timestamp: new Date(),
        latitude: studentLat,
        longitude: studentLon
    });

    res.json({ msg: "Attendance marked successfully" });

});

module.exports = router;