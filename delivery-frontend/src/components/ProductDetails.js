import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
    const { id } = useParams(); // Получаем ID из URL
    const navigate = useNavigate(); // Используем для перехода между страницами
    const [product, setProduct] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState(""); // Для отображения успеха/ошибки
    const [selectedSize, setSelectedSize] = useState(""); // Для хранения выбранного размера

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to load product.");
            }
        };

        fetchProduct();
    }, [id]);

    // Функция для отправки productId, выбранного размера и цены на сервер
    const addToCart = async () => {
        if (!selectedSize) {
            setError("Please select a size before adding to the cart.");
            return;
        }
        try {
            const response = await axios.post("/cart/add", {
                productId: id, // Строка
                size: selectedSize, // Строка или Число
                price: product.Price, // Число
                quantity: 1, // Число
            }, {
                headers: {
                    "Content-Type": "application/json", // Установите Content-Type
                },
            });
            setMessage(response.data.message || "Product added to cart!");
            setError(""); // Сбрасываем ошибку при успешном добавлении
        } catch (err) {
            console.error("Error adding product to cart:", err);
            setError("Failed to add product to cart. Please try again.");
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            {/* Кнопка для возврата к списку продуктов */}
            <button
                className="btn btn-light mb-4"
                onClick={() => navigate("/products")}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                }}
            >
                <span style={{ fontSize: "1.5rem" }}>&larr;</span>
                Back to Products
            </button>

            <h1>{product.Name}</h1>
            <img
                src={product.ImageURL}
                alt={product.Name}
                className="img-fluid mb-4"
                style={{ maxHeight: "400px", objectFit: "cover" }}
            />
            <p><strong>Price:</strong> ${product.Price}</p>
            <p><strong>Description:</strong> {product.Description}</p>

            {/* Плитки выбора размера */}
            <div className="mb-4">
                <p><strong>Select Size:</strong></p>
                <div className="d-flex gap-2 flex-wrap">
                    {product.Sizes.map((size) => (
                        <button
                            key={size}
                            className={`btn ${selectedSize === size ? "btn-primary" : "btn-outline-primary"}`}
                            style={{
                                width: "35px",
                                height: "35px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Кнопка для добавления в корзину */}
            <button
                className="btn btn-success mt-4"
                onClick={addToCart}
                disabled={!selectedSize} // Блокируем кнопку, если размер не выбран
            >
                Add to Cart
            </button>

            {/* Сообщения */}
            {message && <div className="alert alert-success mt-3">{message}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
}

export default ProductDetails;