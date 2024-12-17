import React, { useState } from "react";
import axios from "axios";

function Register() {
    const [details, setDetails] = useState({ email: "", username: "", password: "" });
    const [error, setError] = useState(""); // Состояние для ошибок
    const [successMessage, setSuccessMessage] = useState(""); // Состояние для успеха

    const handleRegister = async () => {
        // Проверка на заполненность полей
        if (!details.email || !details.username || !details.password) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await axios.post("/register", details, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            console.log("Response from server:", response.data);

            // Сохраняем сообщение об успехе
            setSuccessMessage(response.data.message);
            setError(""); // Сбрасываем ошибку
        } catch (error) {
            console.error("Error response:", error.response);

            // Отображаем ошибку, если она есть
            if (error.response?.data?.error) {
                setError(error.response.data.error);
            } else {
                setError("An error occurred. Please try again.");
            }
            setSuccessMessage(""); // Сбрасываем сообщение об успехе
        }
    };

    return (
        <div className="card mt-5">
            <div className="card-body">
                <h2 className="card-title">Register</h2>

                {/* Отображение ошибки */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Отображение успеха */}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={details.email}
                        onChange={(e) => {
                            setDetails({ ...details, email: e.target.value });
                            console.log("Email:", e.target.value); // Лог для проверки
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your username"
                        value={details.username}
                        onChange={(e) => {
                            setDetails({ ...details, username: e.target.value });
                            console.log("Username:", e.target.value); // Лог для проверки
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={details.password}
                        onChange={(e) => {
                            setDetails({ ...details, password: e.target.value });
                            console.log("Password:", e.target.value); // Лог для проверки
                        }}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleRegister}>
                    Register
                </button>
            </div>
        </div>
    );
}

export default Register;