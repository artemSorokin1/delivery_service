import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function SneakersList() {
    const [sneakers, setSneakers] = useState([]); // Состояние для массива кроссовок
    const [error, setError] = useState(""); // Состояние для ошибок
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [search, setSearch] = useState(""); // Поиск
    const [filter, setFilter] = useState(""); // Фильтр по размеру
    const navigate = useNavigate(); // Хук для навигации

    // Функция для получения данных с API
    const fetchSneakers = async () => {
        try {
            const response = await axios.get("/products"); // Запрос к API
            if (response.data.length === 0) {
                setError("No sneakers found.");
            } else {
                setSneakers(response.data); // Сохраняем данные в состоянии
                setError(""); // Сбрасываем ошибку
            }
        } catch (err) {
            console.error("Error fetching sneakers:", err);
            setError("Failed to load sneakers. Please try again.");
        } finally {
            setLoading(false); // Завершаем состояние загрузки
        }
    };

    // Фильтрация товаров
    const filteredSneakers = sneakers.filter((sneaker) => {
        const matchesSearch = sneaker.Name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter ? sneaker.Sizes.includes(parseInt(filter)) : true;
        return matchesSearch && matchesFilter;
    });

    // Запрос данных при загрузке компонента
    useEffect(() => {
        fetchSneakers();
    }, []);

    // Отображение во время загрузки
    if (loading) {
        return <div className="container mt-5">Loading sneakers...</div>;
    }

    return (
        <div className="container mt-5">
            <h1>Sneakers</h1>

            {/* Форма поиска и фильтров */}
            <div className="d-flex mb-4 gap-3">
                <input
                    type="text"
                    placeholder="Search sneakers..."
                    className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="form-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="">All Sizes</option>
                    <option value="38">Size 38</option>
                    <option value="39">Size 39</option>
                    <option value="40">Size 40</option>
                    <option value="41">Size 41</option>
                    <option value="42">Size 42</option>
                </select>
            </div>

            {/* Отображение ошибки или пустого результата */}
            {error && <div className="alert alert-danger">{error}</div>}

            {!error && filteredSneakers.length === 0 && (
                <div className="alert alert-info">No sneakers match your criteria.</div>
            )}

            {/* Отображение списка кроссовок */}
            <div className="row">
                {filteredSneakers.map((sneaker) => (
                    <div className="col-md-4" key={sneaker.ID}>
                        <div
                            className="card mb-4"
                            style={{
                                height: "420px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <img
                                src={sneaker.ImageURL}
                                className="card-img-top"
                                alt={sneaker.Name}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{sneaker.Name}</h5>
                                <p className="card-text text-truncate">
                                    {sneaker.Description}
                                </p>
                                <p className="card-text">
                                    <strong>Price:</strong> ${sneaker.Price}
                                </p>
                                <p className="card-text">
                                    <strong>Sizes:</strong> {sneaker.Sizes.join(", ")}
                                </p>
                                <button
                                    className="btn btn-primary mt-auto"
                                    onClick={() => navigate(`/product/${sneaker.ID}`)}
                                >
                                    View Product
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SneakersList;