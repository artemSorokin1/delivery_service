import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState(""); // Для отображения ошибок

    const handleLogin = async () => {
        if (!credentials.username || !credentials.password) {
            setError("Username and password are required.");
            return;
        }

        try {
            const response = await axios.post("/login", credentials, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });

            // Сохраняем токен в localStorage
            const token = response.data.token;
            localStorage.setItem("authToken", token);

            alert(response.data.message);
            setError(""); // Сбрасываем ошибку в случае успеха

            // Обновляем состояние авторизации
            onLogin();
        } catch (error) {
            console.error("Login error:", error.response);
            setError(error.response?.data?.error || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="card mt-5">
            <div className="card-body">
                <h2 className="card-title">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;