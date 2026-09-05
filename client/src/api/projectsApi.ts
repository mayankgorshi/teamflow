const API_URL = "http://localhost:5000/api/projects";

export type Project = {
    id: string;
    name: string;
    description: string | null;
    status: string;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
};

export const getProjects = async (): Promise<Project[]> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("User is not authenticated");
    }

    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch projects");
    }

    return data.projects;
};

export const createProject = async (projectData: {
    name: string;
    description?: string;
}): Promise<Project> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("User is not authenticated");
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create project");
    }

    return data.project;
};