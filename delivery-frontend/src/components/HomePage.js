import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div
            style={{
                textAlign: "center",
                padding: "50px 20px",
                background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
                minHeight: "100vh",
            }}
        >
            <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#333" }}>
                Welcome to Sneaker Haven!
            </h1>
            <p style={{ fontSize: "1.5rem", marginTop: "20px", color: "#555" }}>
                Your one-stop shop for the latest and greatest sneakers.
            </p>
            <img
                src="https://via.placeholder.com/600x300?text=Sneaker+Collection"
                alt="Sneaker Collection"
                style={{
                    width: "80%",
                    maxWidth: "600px",
                    borderRadius: "10px",
                    margin: "30px auto",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            />
            <p style={{ fontSize: "1.2rem", color: "#777" }}>
                Explore our collection of high-quality sneakers and enjoy fast, reliable delivery
                straight to your doorstep.
            </p>
            <div style={{ marginTop: "30px" }}>
                <Link
                    to="/products"
                    style={{
                        padding: "10px 20px",
                        fontSize: "1.2rem",
                        color: "#fff",
                        backgroundColor: "#007bff",
                        textDecoration: "none",
                        borderRadius: "5px",
                        margin: "10px",
                        display: "inline-block",
                    }}
                >
                    Shop Now
                </Link>
                <Link
                    to="/register"
                    style={{
                        padding: "10px 20px",
                        fontSize: "1.2rem",
                        color: "#fff",
                        backgroundColor: "#28a745",
                        textDecoration: "none",
                        borderRadius: "5px",
                        margin: "10px",
                        display: "inline-block",
                    }}
                >
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Home;