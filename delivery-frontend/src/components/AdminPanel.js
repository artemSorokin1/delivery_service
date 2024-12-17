import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        sizes: "",
    });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const token = localStorage.getItem("authToken"); // JWT токен

    // Загрузка списка продуктов
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/products");
                setProducts(response.data || []);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products.");
            }
        };

        fetchProducts();
    }, []);

    // Добавление нового товара
    const handleAddProduct = async () => {
        try {
            const sizesArray = newProduct.sizes
                .split(",")
                .map((size) => parseInt(size.trim(), 10));
            const productData = {
                ...newProduct,
                sizes: sizesArray,
                price: parseInt(newProduct.price, 10),
            };

            const response = await axios.post("/admin/products", productData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            // Используем возвращённый продукт для обновления состояния
            setProducts([...products, response.data]);
            setMessage("Product added successfully!");
            setError("");
            setNewProduct({ name: "", price: "", description: "", imageUrl: "", sizes: "" });
        } catch (err) {
            console.error("Error adding product:", err);
            setError("Failed to add product.");
            setMessage("");
        }
    };

    // Удаление товара
    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`/admin/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(products.filter((product) => product.ID !== id));
            setMessage("Product deleted successfully!");
            setError("");
        } catch (err) {
            console.error("Error deleting product:", err);
            setError("Failed to delete product.");
            setMessage("");
        }
    };

    // Обновление товара
    const handleUpdateProduct = async () => {
        try {
            const sizesArray = editingProduct.sizes
                .split(",")
                .map((size) => parseInt(size.trim(), 10));
            const updatedProduct = {
                ...editingProduct,
                sizes: sizesArray,
                price: parseInt(editingProduct.price, 10),
            };

            await axios.put(`/products/${editingProduct.ID}`, updatedProduct, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            setProducts(
                products.map((product) =>
                    product.ID === editingProduct.ID ? { ...product, ...updatedProduct } : product
                )
            );
            setMessage("Product updated successfully!");
            setError("");
            setIsEditing(false);
            setEditingProduct(null);
        } catch (err) {
            console.error("Error updating product:", err);
            setError("Failed to update product.");
            setMessage("");
        }
    };

    return (
        <div className="container mt-5">
            <h1>Admin Panel: Products</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            {/* Форма добавления товара */}
            <div className="card mb-4">
                <div className="card-body">
                    <h2>Add New Product</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="form-control mb-2"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="form-control mb-2"
                    />
                    <textarea
                        placeholder="Description"
                        value={newProduct.description}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, description: e.target.value })
                        }
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newProduct.imageUrl}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, imageUrl: e.target.value })
                        }
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Sizes (comma-separated)"
                        value={newProduct.sizes}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, sizes: e.target.value })
                        }
                        className="form-control mb-2"
                    />
                    <button className="btn btn-success" onClick={handleAddProduct}>
                        Add Product
                    </button>
                </div>
            </div>

            {/* Таблица продуктов */}
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Sizes</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.ID}>
                        <td>{product.ID}</td>
                        <td>{product.Name}</td>
                        <td>${product.Price}</td>
                        <td>{product.Description}</td>
                        <td>{product.Sizes.join(", ")}</td>
                        <td>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => {
                                    setEditingProduct(product);
                                    setIsEditing(true);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteProduct(product.ID)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Форма редактирования товара */}
            {isEditing && (
                <div className="card mt-4">
                    <div className="card-body">
                        <h2>Edit Product</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={editingProduct.Name}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, Name: e.target.value })
                            }
                            className="form-control mb-2"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={editingProduct.Price}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, Price: e.target.value })
                            }
                            className="form-control mb-2"
                        />
                        <textarea
                            placeholder="Description"
                            value={editingProduct.Description}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, Description: e.target.value })
                            }
                            className="form-control mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Sizes (comma-separated)"
                            value={editingProduct.Sizes.join(", ")}
                            onChange={(e) =>
                                setEditingProduct({
                                    ...editingProduct,
                                    Sizes: e.target.value.split(",").map((s) => s.trim()),
                                })
                            }
                            className="form-control mb-2"
                        />
                        <button className="btn btn-success" onClick={handleUpdateProduct}>
                            Save Changes
                        </button>
                        <button
                            className="btn btn-secondary ms-2"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminProducts;