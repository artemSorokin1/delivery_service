import React from "react";

function Payment() {
    const handlePayment = () => {
        // Логика для обработки оплаты
        alert("Payment successful!");
    };

    return (
        <div className="container mt-5">
            <h1>Payment</h1>
            <p>Thank you for your order. Please proceed to payment to complete your purchase.</p>
            <button className="btn btn-success" onClick={handlePayment}>
                Pay Now
            </button>
        </div>
    );
}

export default Payment;