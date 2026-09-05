const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (userData: {
    name: string;
    email: string;
    password: string;
}) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Registration failed");
    }

    return data;
};


export const loginUser = async (userData: {
    email: string;
    password: string;
}) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
};
export const getProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:5000/api/users/profile",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
    }

    return data;
};
