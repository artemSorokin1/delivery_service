const API_BASE_URL = 'http://localhost:8083';

export async function registerUser(email, username, password) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        body: formData,
        credentials: 'include', // чтобы куки с токеном могли сохраняться
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
    }
    return data;
}

export async function loginUser(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Login failed');
    }
    return data;
}

export async function getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`, {
        credentials: 'include'
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch products');
    }
    return data;
}

export async function getProductById(id) {
    const response = await fetch(`${API_BASE_URL}/product/${id}`, {
        credentials: 'include'
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch product');
    }
    return data;
}