import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export type Task = {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    projectId: string;
    createdAt?: string;
    updatedAt?: string;
};

function getAuthHeaders() {
    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`,
    };
}

// Get tasks for a project
export async function getTasks(projectId: string): Promise<Task[]> {
    const response = await axios.get(
        `${API_URL}/project/${projectId}`,
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data.tasks;
}

// Create a task
export async function createTask(
    projectId: string,
    title: string,
    description: string
): Promise<Task> {
    const response = await axios.post(
        API_URL,
        {
            projectId,
            title,
            description,
        },
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data.task;
}

// Toggle task
export async function toggleTask(taskId: string): Promise<Task> {
    const response = await axios.patch(
        `${API_URL}/${taskId}/toggle`,
        {},
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data.task;
}

// Delete task
export async function deleteTask(taskId: string) {
    const response = await axios.delete(
        `${API_URL}/${taskId}`,
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data;
}