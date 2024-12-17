import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Checkout() {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // Индикатор загрузки
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateFields = () => {
        const { name, address, phone, cardNumber, expiryDate, cvv } = formData;

        if (!name || !address || !phone || !cardNumber || !expiryDate || !cvv) {
            setError("Please fill in all the fields.");
            return false;
        }

        const phoneRegex = /^[0-9]{10,15}$/; // Номер телефона от 10 до 15 цифр
        if (!phoneRegex.test(phone)) {
            setError("Please enter a valid phone number.");
            return false;
        }

        const cardRegex = /^[0-9]{16}$/; // Номер карты 16 цифр
        if (!cardRegex.test(cardNumber)) {
            setError("Please enter a valid 16-digit card number.");
            return false;
        }

        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Формат MM/YY
        if (!expiryRegex.test(expiryDate)) {
            setError("Please enter a valid expiry date in MM/YY format.");
            return false;
        }

        const cvvRegex = /^[0-9]{3,4}$/; // CVV 3-4 цифры
        if (!cvvRegex.test(cvv)) {
            setError("Please enter a valid CVV.");
            return false;
        }

        setError(""); // Сбрасываем ошибку
        return true;
    };

    const handleCheckout = async () => {
        if (!validateFields()) {
            return;
        }

        setLoading(true); // Устанавливаем состояние загрузки

        try {
            // Отправка данных на сервер через axios
            const response = await axios.post(
                "/checkout",
                new URLSearchParams(formData).toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            // Проверка ответа
            if (response.status !== 200) {
                throw new Error("Checkout failed.");
            }

            // Успешная обработка заказа и оплаты
            setMessage("Order and payment successful! Redirecting to home page...");
            setError("");

            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (err) {
            console.error("Error during checkout:", err);
            setError(err.response?.data?.message || "Failed to complete checkout. Please try again.");
        } finally {
            setLoading(false); // Сбрасываем состояние загрузки
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Checkout</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            <div className="row">
                <div className="col-md-6">
                    <h2>Order Details</h2>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <h2>Payment Information</h2>
                    <div className="mb-3">
                        <label className="form-label">Card Number</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Expiry Date</label>
                        <input
                            type="text"
                            className="form-control"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">CVV</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button
                    className="btn btn-success mt-4"
                    onClick={handleCheckout}
                    disabled={loading} // Блокируем кнопку во время загрузки
                >
                    {loading ? "Processing..." : "Submit Order and Pay Now"}
                </button>
            </div>
        </div>
    );
}

export default Checkout;