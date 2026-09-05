const API_URL = "http://localhost:5000/api/messages";

export const sendMessage = async (
    conversationId: string,
    content: string
) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/${conversationId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                content,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to send message"
        );
    }

    return data;
};


export const getMessages = async (
    conversationId: string
) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/${conversationId}`,
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
            data.message || "Failed to fetch messages"
        );
    }

    return data;
};