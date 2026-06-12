const Attendance = require("../models/Attendance");
const Session = require("../models/Session");
const Classroom = require("../models/Classroom");
const { decrypt } = require("../utils/encryption");
const { calculateDistance } = require("../utils/harversine");


const markAttendance = async (data) => {
    const {
        token,
        latitude,
        longitude,
        studentId
    } = data;

    const decrypted = JSON.parse(decrypt(token));

    // //find session 
    const session = await Session.findOne({
        sessionId: decrypted.sessionId
    })

    if (!session) {
        throw new Error(" Session not found")
    };



    // check expiry
    if (Date.now() > session.expiry) {
        throw new Error("Session expired");
    };
    // fetch classroom 
    const classroom = await Classroom.findById(
        session.classroomId
    );

    if (!classroom) {
        throw new Error("Classroom not found");
    }

    // calculate distance 
    const distance = calculateDistance(
        Number(latitude),
        Number(longitude),
        classroom.latitude,
        classroom.longitude
    );

    if (distance > classroom.radius) {
        throw new Error("You are outside the classroom");
    };

    // Duplicate check 
    const existing = await Attendance.findOne({
        sessionId: session.sessionId,
        studentId
    });

    if (existing) {
        throw new Error("Attendance already marked");
    };

    // save attendance 
    const attendance = new Attendance({
        sessionId: session.sessionId,
        studentId,
        latitude,
        longitude,
        distanceFromClass: distance
    });
    await attendance.save();

    return {
        msg: "Attendance marked successfully"
    }
}


const getAttendanceHistory = async (studentId) => {
    const records = await Attendance.find({ studentId });
    const history = [];
    for (const record of records) {
        const session = await Session.findOne({
            sessionId: record.sessionId
        });
        history.push({
            subject: session.subject,
            date: record.timestamp
        });
    }

    return history;
}


const getAttendanceSummary =
    async (studentId) => {

        const attendances =
            await Attendance.find({
                studentId
            });

        const subjectMap = {};

        for (
            const attendance
            of attendances
        ) {

            const session =
                await Session.findOne({

                    sessionId:
                        attendance.sessionId

                });

            if (!session)
                continue;

            const subject =
                session.subject;

            if (
                !subjectMap[subject]
            ) {

                subjectMap[subject] = {

                    subject,

                    attended: 0,

                    dates: []

                };

            }

            subjectMap[subject]
                .attended++;

            subjectMap[subject]
                .dates.push(

                    attendance.timestamp

                );

        }

        const result = [];

        for (
            const subject
            in subjectMap
        ) {

            const total =
                await Session.countDocuments({

                    subject

                });

            const attended =
                subjectMap[subject]
                    .attended;

            const percentage =
                total === 0

                    ?

                    0

                    :

                    (
                        attended
                        /
                        total
                    ) * 100;

            result.push({

                subject,

                attended,

                total,

                percentage:
                    percentage
                        .toFixed(2),

                dates:
                    subjectMap[subject]
                        .dates

            });

        }

        return result;

    };


module.exports = { markAttendance, getAttendanceHistory, getAttendanceSummary };   