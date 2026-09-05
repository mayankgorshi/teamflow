import axios from "axios";

const API_URL = "http://localhost:5000/api/project-members";

function getAuthHeaders() {
    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`,
    };
}

// Add member to a project
export async function addProjectMember(
    projectId: string,
    email: string
) {
    const response = await axios.post(
        `${API_URL}/${projectId}/members`,
        {
            email,
        },
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data;
}
export async function getProjectMembers(projectId: string) {
    const response = await axios.get(
        `${API_URL}/${projectId}/members`,
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data;
}
export async function removeProjectMember(
    projectId: string,
    userId: string
) {
    const response = await axios.delete(
        `${API_URL}/${projectId}/members/${userId}`,
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data;
}