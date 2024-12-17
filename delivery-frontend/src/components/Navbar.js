import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, handleLogout }) {
    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{
                backgroundColor: "#343a40", // Темный фон
                padding: "10px 20px",
            }}
        >
            <Link
                className="navbar-brand"
                to="/"
                style={{
                    color: "#ffffff", // Белый текст
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    textDecoration: "none",
                }}
            >
                Alliance Shop
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{
                    border: "none",
                    color: "#ffffff", // Белый значок гамбургера
                }}
            >
                <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    {!isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/login"
                                    style={{
                                        color: "#ffffff",
                                        margin: "0 10px",
                                    }}
                                >
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/register"
                                    style={{
                                        color: "#ffffff",
                                        margin: "0 10px",
                                    }}
                                >
                                    Register
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <button
                                className="btn btn-link nav-link"
                                onClick={handleLogout}
                                style={{
                                    color: "#ffffff",
                                    margin: "0 10px",
                                    textDecoration: "none",
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    )}
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/products"
                            style={{
                                color: "#ffffff",
                                margin: "0 10px",
                            }}
                        >
                            Products
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/cart"
                            style={{
                                color: "#ffffff",
                                margin: "0 10px",
                            }}
                        >
                            Cart
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;