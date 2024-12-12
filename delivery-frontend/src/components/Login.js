import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleLogin = async () => {
        try {
            const response = await axios.post("/login", credentials);
            alert(response.data.message);
        } catch (error) {
            console.error("Error response:", error.response);
            alert(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="card mt-5">
            <div className="card-body">
                <h2 className="card-title">Login</h2>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;