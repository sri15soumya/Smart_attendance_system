import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/app.css";

import QRScanner from "../components/QRCard";

import {
    markAttendance,
    getAttendanceHistory,
    getAttendanceSummary
} from "../services/attendanceService";

function StudentDashboard() {

    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [location, setLocation] = useState(null);

    const [history, setHistory] = useState([]);
    const [summary, setSummary] = useState([]);

    useEffect(() => {

        loadHistory();
        loadSummary();

    }, []);

    const loadSummary = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await getAttendanceSummary(token);

            setSummary(
                response.data
            );

        }
        catch (error) {

            console.log(error);

        }

    };

    const loadHistory = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await getAttendanceHistory(token);

            setHistory(
                response.data
            );

        }
        catch (error) {

            console.log(error);

        }

    };

    const handleScan = async (token) => {

        try {

            navigator.geolocation.getCurrentPosition(

                async (position) => {

                    const latitude =
                        position.coords.latitude;

                    const longitude =
                        position.coords.longitude;

                    setLocation({
                        latitude,
                        longitude
                    });

                    const jwt =
                        localStorage.getItem("token");

                    try {

                        const response =
                            await markAttendance(

                                {
                                    token,
                                    latitude,
                                    longitude
                                },

                                jwt

                            );

                        setMessage(
                            response.data.msg
                        );

                        await loadHistory();
                        await loadSummary();

                    }
                    catch (error) {

                        setMessage(

                            error.response?.data?.msg ||

                            "Attendance Failed"

                        );

                    }

                },

                () => {

                    setMessage(
                        "Location Permission Denied"
                    );

                }

            );

        }
        catch (error) {

            setMessage(

                error.response?.data?.msg ||

                "Attendance Failed"

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
                    Student Dashboard
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
                    Scan Attendance QR
                </h2>

                <QRScanner
                    onScanSuccess={
                        handleScan
                    }
                />

            </div>

            {

                location && (

                    <div className="location-card">

                        <h3>
                            Location Captured
                        </h3>

                        <p>

                            Latitude:

                            {" "}

                            {
                                location.latitude
                            }

                        </p>

                        <p>

                            Longitude:

                            {" "}

                            {
                                location.longitude
                            }

                        </p>

                    </div>

                )

            }

            {

                message && (

                    <div className="success-message">

                        {message}

                    </div>

                )

            }

            <div
                style={{
                    marginTop: "30px"
                }}
            >

                <h2>
                    Subject Wise Attendance
                </h2>

            </div>

            <div className="summary-grid">

                {

                    summary.map(

                        (
                            subject,
                            index
                        ) => (

                            <div

                                key={index}

                                className="summary-card"

                            >

                                <h3>

                                    {
                                        subject.subject
                                    }

                                </h3>

                                <div className="percentage">

                                    {
                                        subject.percentage
                                    }%

                                </div>

                                <p>

                                    Attended

                                    {" "}

                                    {
                                        subject.attended
                                    }

                                    /

                                    {
                                        subject.total
                                    }

                                </p>

                                <br />

                                <h4>
                                    Attendance Dates
                                </h4>

                                <ul
                                    className="student-list"
                                >

                                    {

                                        subject.dates.map(

                                            (
                                                date,
                                                i
                                            ) => (

                                                <li key={i}>

                                                    {

                                                        new Date(
                                                            date
                                                        ).toLocaleDateString()

                                                    }

                                                </li>

                                            )

                                        )

                                    }

                                </ul>

                            </div>

                        )

                    )

                }

            </div>

        </div>

    );

}

export default StudentDashboard;