const API_URL = "http://localhost:5000/api/users";

export type User = {
    id: string;
    name: string;
    email: string;
};

export const searchUsers = async (
    query: string
): Promise<User[]> => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/search?q=${encodeURIComponent(query)}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to search users"
        );
    }

    return data;
};