import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../styles/app.css";
import { registerUser } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");

    const handleRegister = async () => {

        try {

            await registerUser({

                name,
                email,
                password,
                role

            });

            alert(
                "Registration Successful!"
            );

            navigate("/");

        }
        catch (error) {

            alert(

                error.response?.data?.msg ||

                "Registration Failed"

            );

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1 className="auth-title">

                    Smart Attendance

                </h1>

                <h3
                    style={{
                        textAlign: "center",
                        marginBottom: "25px"
                    }}
                >
                    Create Account
                </h3>

                <div className="form-group">

                    <label>
                        Full Name
                    </label>

                    <input

                        className="input"

                        type="text"

                        placeholder="Enter Full Name"

                        value={name}

                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }

                    />

                </div>

                <div className="form-group">

                    <label>
                        Email
                    </label>

                    <input

                        className="input"

                        type="email"

                        placeholder="Enter Email"

                        value={email}

                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }

                    />

                </div>

                <div className="form-group">

                    <label>
                        Password
                    </label>

                    <input

                        className="input"

                        type="password"

                        placeholder="Enter Password"

                        value={password}

                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }

                    />

                </div>

                <div className="form-group">

                    <label>
                        Role
                    </label>

                    <select

                        className="input"

                        value={role}

                        onChange={(e) =>
                            setRole(
                                e.target.value
                            )
                        }

                    >

                        <option value="student">

                            Student

                        </option>

                        <option value="faculty">

                            Faculty

                        </option>

                    </select>

                </div>

                <button

                    className="primary-btn"

                    style={{
                        width: "100%"
                    }}

                    onClick={
                        handleRegister
                    }

                >

                    Register

                </button>

                <div className="auth-footer">

                    <p>

                        Already have an account?

                    </p>

                    <Link
                        to="/"
                        style={{
                            color: "#2563eb",
                            textDecoration: "none",
                            fontWeight: "600"
                        }}
                    >

                        Login Here

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;