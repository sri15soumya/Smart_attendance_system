// QR generation logic for attendance marking
const crypto = require("crypto");
const QRCode = require("qrcode");
const Session = require("../models/Session");
const Attendance = require("../models/Attendance");
const Classroom = require("../models/Classroom");
const User = require("../models/User");


const { encrypt } = require("../utils/encryption");


const startSession = async (data) => {
    const {
        facultyId, classroomId, subject
    } = data;
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
        throw new Error("Classroom not found");
    }

    const sessionId = crypto.randomBytes(16).toString("hex");
    const expiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    const payload = {
        sessionId,
    };

    const encrypted = encrypt(JSON.stringify(payload));
    await Session.create({
        sessionId,
        facultyId,
        classroomId,
        subject,
        expiry
    });

    const qr = await QRCode.toDataURL(encrypted);
    return {
        qr,
        token: encrypted
    };


}


const getFacultySessions = async (facultyId) => {
    const sessions = await Session.find({ facultyId }).sort({ createdAt: -1 });
    const result = [];
    for (const session of sessions) {
        const attendanceCount = await Attendance.countDocuments({ sessionId: session.sessionId });
        const classroom = await Classroom.findById(session.classroomId);
        result.push({
            sessionId: session.sessionId,
            subject: session.subject,
            classroom: classroom?.name || "unknown", attendanceCount,
            date: session.createdAt

        });


    }

    return result;
}

// faculty sessions wise attendance 
const getAttendanceByDate =
async(facultyId,date)=>{

    const startDate =
    new Date(date);

    startDate.setHours(
        0,0,0,0
    );

    const endDate =
    new Date(date);

    endDate.setHours(
        23,59,59,999
    );

    const sessions =
    await Session.find({

        facultyId,

        createdAt:{

            $gte:startDate,

            $lte:endDate

        }

    });

    const result = [];

    for(
        const session
        of sessions
    ){

        const attendanceRecords =
        await Attendance.find({

            sessionId:
            session.sessionId

        });

        const classroom =
        await Classroom.findById(
            session.classroomId
        );

        const students = [];

        for(
            const record
            of attendanceRecords
        ){

            const student =
            await User.findById(
                record.studentId
            );

            if(student){

                students.push({

                    name:
                    student.name,

                    rollNumber:
                    student.rollNumber,

                    department:
                    student.department

                });

            }

        }

        result.push({

            subject:
            session.subject,

            classroom:
            classroom?.name,

            attendanceCount:
            students.length,

            students

        });

    }

    return result;

};

module.exports = { startSession, getFacultySessions ,getAttendanceByDate};