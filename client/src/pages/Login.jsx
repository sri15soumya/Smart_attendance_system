import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/app.css";
import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        try {

            setLoading(true);

            const response =
                await loginUser({
                    email,
                    password
                });

            const token =
                response.data.token;

            localStorage.setItem(
                "token",
                token
            );

            const payload =
                JSON.parse(
                    atob(
                        token.split(".")[1]
                    )
                );

            if (
                payload.role === "faculty"
            ) {

                navigate("/faculty");

            }
            else {

                navigate("/student");

            }

        }
        catch (error) {

            alert(
                "Invalid Credentials"
            );

        }
        finally {

            setLoading(false);

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
                    Login
                </h3>

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

                <button

                    className="primary-btn"

                    style={{
                        width: "100%"
                    }}

                    onClick={
                        handleLogin
                    }

                >

                    {

                        loading

                            ?

                            "Logging In..."

                            :

                            "Login"

                    }

                </button>

                <div className="auth-footer">

                    <p>

                        Welcome Back 

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;