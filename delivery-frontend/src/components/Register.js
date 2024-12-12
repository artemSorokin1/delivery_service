import React, { useState } from "react";
import axios from "axios";

function Register() {
    const [details, setDetails] = useState({ email: "", username: "", password: "" });

    const handleRegister = async () => {
        try {
            const response = await axios.post("/register", details);
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="card mt-5">
            <div className="card-body">
                <h2 className="card-title">Register</h2>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={details.email}
                        onChange={(e) => setDetails({ ...details, email: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={details.username}
                        onChange={(e) => setDetails({ ...details, username: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={details.password}
                        onChange={(e) => setDetails({ ...details, password: e.target.value })}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
}

export default Register;