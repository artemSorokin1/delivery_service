import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Для перехода между страницами

    const userId = 1; // Замените на реальный userId

    // Функция для получения корзины
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`/cart`, {
                    params: { userId },
                });
                setCartItems(response.data || []); // Если данные null, устанавливаем пустой массив
                setError("");
            } catch (err) {
                console.error("Error fetching cart items:", err);
                setError("Failed to load cart items.");
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [userId]);

    // Функция для удаления элемента из корзины
    const deleteCartItem = async (productId) => {
        try {
            await axios.post("/cart/delete-item", { productId }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setCartItems(cartItems.filter((item) => item.productId !== productId));
        } catch (err) {
            console.error("Error deleting cart item:", err);
            setError("Failed to delete item. Please try again.");
        }
    };

    // Функция для очистки всей корзины
    const clearCart = async () => {
        try {
            await axios.post("/cart/clear", {}, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setCartItems([]); // Очищаем корзину локально
            setError("Your cart is empty.");
        } catch (err) {
            console.error("Error clearing cart:", err);
            setError("Failed to clear cart. Please try again.");
        }
    };

    // Функция для изменения количества товара
    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) return; // Минимальное количество — 1

        try {
            await axios.post("/cart/update-item", { productId, quantity }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Обновляем локальное состояние
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.productId === productId ? { ...item, quantity } : item
                )
            );
        } catch (err) {
            console.error("Error updating quantity:", err);
            setError("Failed to update quantity. Please try again.");
        }
    };

    // Если данные ещё загружаются
    if (loading) {
        return <div className="container mt-5">Loading your cart...</div>;
    }

    // Если корзина пуста
    if (cartItems.length === 0) {
        return (
            <div className="container mt-5">
                <div className="alert alert-info">Your cart is empty.</div>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/products")}
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    // Основной рендер для корзины
    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = cartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 1),
        0
    );

    return (
        <div className="container mt-5">
            <h1>Your Cart</h1>

            {/* Список товаров */}
            <div className="cart-items">
                {cartItems.map((item, index) => (
                    <div key={item.productId || `item-${index}`} className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src={item.image_url || "https://via.placeholder.com/150"}
                                    className="img-fluid rounded-start"
                                    alt={item.name || "Product"}
                                    style={{ maxHeight: "200px", objectFit: "cover" }}
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name || "Unnamed Product"}</h5>
                                    <p className="card-text">
                                        <strong>Price:</strong> ${item.price || 0} <br />
                                        <strong>Size:</strong> {item.size || "N/A"} <br />
                                    </p>

                                    {/* Количество товара */}
                                    <div className="d-flex align-items-center mb-3">
                                        <button
                                            className="btn btn-outline-secondary me-2"
                                            onClick={() =>
                                                updateQuantity(item.productId, item.quantity - 1)
                                            }
                                        >
                                            -
                                        </button>
                                        <span className="fs-5">{item.quantity || 1}</span>
                                        <button
                                            className="btn btn-outline-secondary ms-2"
                                            onClick={() =>
                                                updateQuantity(item.productId, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Удалить товар */}
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteCartItem(item.productId)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Итоговый блок */}
            <div className="fixed-bottom bg-light p-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h5>Total Items: {totalItems}</h5>
                    <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
                    <button
                        className="btn btn-success"
                        onClick={() => navigate("/checkout")}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;