import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getClassrooms } from "../services/classroomService";
import { getSubjects } from "../services/subjectService";

import {
    startSession,
    getSessionHistory,
    getAttendanceByDate
} from "../services/sessionService";

function FacultyDashboard() {

    const navigate = useNavigate();

    const [subjects, setSubjects] = useState([]);
    const [classrooms, setClassrooms] = useState([]);

    const [subject, setSubject] = useState("");
    const [classroomId, setClassroomId] = useState("");

    const [qr, setQr] = useState("");

    const [sessionInfo, setSessionInfo] = useState(null);

    const [sessions, setSessions] = useState([]);

    const [selectedDate, setSelectedDate] = useState("");

    const [attendanceReport, setAttendanceReport] = useState([]);

    useEffect(() => {

        loadSubjects();

        loadClassrooms();

        loadSessions();

    }, []);

    const loadSubjects = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await getSubjects(token);

            setSubjects(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    const loadClassrooms = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await getClassrooms(token);

            setClassrooms(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    const loadSessions = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await getSessionHistory(token);

            setSessions(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    const searchAttendance = async () => {

        if (!selectedDate) {

            alert("Please select a date");

            return;

        }

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await getAttendanceByDate(

                    selectedDate,

                    token

                );

            setAttendanceReport(
                response.data
            );

        }
        catch (error) {

            console.log(error);

            alert(
                error.response?.data?.msg ||
                "Failed to fetch attendance"
            );

        }

    };

    const handleGenerateQR = async () => {

        try {

            if (!subject || !classroomId) {

                alert(
                    "Please select subject and classroom"
                );

                return;

            }

            const token =
                localStorage.getItem("token");

            const response =
                await startSession(

                    {
                        subject,
                        classroomId
                    },

                    token

                );

            setQr(
                response.data.qr
            );

            const selectedClassroom =
                classrooms.find(

                    room =>
                        room._id === classroomId

                );

            setSessionInfo({

                subject,

                classroom:
                    selectedClassroom?.name

            });

            await loadSessions();

        }
        catch (error) {

            console.log(error);

            alert(
                error.response?.data?.msg ||
                "Failed to create session"
            );

        }

    };

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        navigate("/");

    };

    return (

    <div className="page-container">

        <div className="header">

            <h1>
                Faculty Dashboard
            </h1>

            <button
                className="logout-btn"
                onClick={logout}
            >
                Logout
            </button>

        </div>

        <div className="card">

            <h2>
                Create Attendance Session
            </h2>

            <div className="form-group">

                <label>
                    Subject
                </label>

                <select
                    className="input"
                    value={subject}
                    onChange={(e) =>
                        setSubject(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Select Subject
                    </option>

                    {
                        subjects.map(
                            (sub) => (

                                <option
                                    key={sub._id}
                                    value={sub.code}
                                >
                                    {sub.code}
                                </option>

                            )
                        )
                    }

                </select>

            </div>

            <div className="form-group">

                <label>
                    Classroom
                </label>

                <select
                    className="input"
                    value={classroomId}
                    onChange={(e) =>
                        setClassroomId(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Select Classroom
                    </option>

                    {
                        classrooms.map(
                            (room) => (

                                <option
                                    key={room._id}
                                    value={room._id}
                                >
                                    {room.name}
                                </option>

                            )
                        )
                    }

                </select>

            </div>

            <button
                className="primary-btn"
                onClick={
                    handleGenerateQR
                }
            >
                Generate QR
            </button>

        </div>

        {

            sessionInfo && (

                <div className="card active-session">

                    <h2>
                        Active Session
                    </h2>

                    <p>

                        <strong>
                            Subject:
                        </strong>

                        {" "}

                        {
                            sessionInfo.subject
                        }

                    </p>

                    <p>

                        <strong>
                            Classroom:
                        </strong>

                        {" "}

                        {
                            sessionInfo.classroom
                        }

                    </p>

                </div>

            )

        }

        {

            qr && (

                <div className="card qr-section">

                    <h2>
                        Attendance QR
                    </h2>

                    <img
                        className="qr-image"
                        src={qr}
                        alt="QR Code"
                    />

                </div>

            )

        }

        <div className="card">

            <h2>
                Attendance Reports
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center"
                }}
            >

                <input

                    className="input"

                    type="date"

                    value={selectedDate}

                    onChange={(e) =>

                        setSelectedDate(
                            e.target.value
                        )

                    }

                />

                <button

                    className="primary-btn"

                    onClick={
                        searchAttendance
                    }

                >

                    Search

                </button>

            </div>

        </div>

        {

            attendanceReport.length > 0 && (

                <div className="summary-grid">

                    {

                        attendanceReport.map(

                            (
                                report,
                                index
                            ) => (

                                <div

                                    key={index}

                                    className="report-card"

                                >

                                    <h3>
                                        {
                                            report.subject
                                        }
                                    </h3>

                                    <p>

                                        <strong>
                                            Classroom:
                                        </strong>

                                        {" "}

                                        {
                                            report.classroom
                                        }

                                    </p>

                                    <p>

                                        <strong>
                                            Present:
                                        </strong>

                                        {" "}

                                        {
                                            report.attendanceCount
                                        }

                                    </p>

                                    <h4>
                                        Students
                                    </h4>

                                    {

                                        report.students.length === 0

                                            ?

                                            <p>
                                                No Students Present
                                            </p>

                                            :

                                            <ul className="student-list">

                                                {

                                                    report.students.map(

                                                        (
                                                            student,
                                                            i
                                                        ) => (

                                                            <li key={i}>

                                                                {
                                                                    student.name
                                                                }

                                                                {" - "}

                                                                {
                                                                    student.rollNumber
                                                                }

                                                                {" - "}

                                                                {
                                                                    student.department
                                                                }

                                                            </li>

                                                        )

                                                    )

                                                }

                                            </ul>

                                    }

                                </div>

                            )

                        )

                    }

                </div>

            )

        }

    </div>

);

}

export default FacultyDashboard;