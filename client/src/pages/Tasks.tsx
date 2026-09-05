import { useEffect, useState } from "react";

import AddTask from "../components/dashboard/AddTask";
import TaskList from "../components/dashboard/TaskList";

import { getProjects, type Project } from "../api/projectsApi";

import {
    getTasks,
    createTask,
    toggleTask,
    deleteTask,
    type Task,
} from "../api/taskApi";

function Tasks() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectId, setSelectedProjectId] =
        useState("");

    const [tasks, setTasks] = useState<Task[]>([]);
    const [tasksLoading, setTasksLoading] = useState(false);

    // ==========================================
    // FETCH PROJECTS
    // ==========================================

    const fetchProjects = async () => {
        try {
            const data = await getProjects();

            setProjects(data);

            if (data.length > 0) {
                setSelectedProjectId((currentProjectId) => {
                    const stillExists = data.some(
                        (project) =>
                            project.id === currentProjectId
                    );

                    return stillExists
                        ? currentProjectId
                        : data[0].id;
                });
            } else {
                setSelectedProjectId("");
                setTasks([]);
            }
        } catch (error) {
            console.error(
                "Failed to load projects:",
                error
            );
        }
    };

    // ==========================================
    // FETCH TASKS
    // ==========================================

    const fetchTasks = async (projectId: string) => {
        if (!projectId) {
            setTasks([]);
            return;
        }

        try {
            setTasksLoading(true);

            const data = await getTasks(projectId);

            setTasks(data);
        } catch (error) {
            console.error(
                "Failed to load tasks:",
                error
            );

            setTasks([]);
        } finally {
            setTasksLoading(false);
        }
    };

    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {
        fetchProjects();
    }, []);

    // ==========================================
    // LOAD TASKS WHEN PROJECT CHANGES
    // ==========================================

    useEffect(() => {
        if (selectedProjectId) {
            fetchTasks(selectedProjectId);
        } else {
            setTasks([]);
        }
    }, [selectedProjectId]);

    // ==========================================
    // CREATE TASK
    // ==========================================

    const handleAddTask = async (
        title: string,
        description: string
    ) => {
        if (!selectedProjectId) {
            alert("Please select a project first.");
            return;
        }

        try {
            await createTask(
                selectedProjectId,
                title,
                description
            );

            await fetchTasks(selectedProjectId);
        } catch (error) {
            console.error(
                "Failed to create task:",
                error
            );

            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Failed to create task");
            }
        }
    };

    // ==========================================
    // TOGGLE TASK
    // ==========================================

    const handleToggleTask = async (taskId: string) => {
        try {
            await toggleTask(taskId);

            await fetchTasks(selectedProjectId);
        } catch (error) {
            console.error(
                "Failed to update task:",
                error
            );

            alert("Failed to update task");
        }
    };

    // ==========================================
    // DELETE TASK
    // ==========================================

    const handleDeleteTask = async (taskId: string) => {
        try {
            await deleteTask(taskId);

            await fetchTasks(selectedProjectId);
        } catch (error) {
            console.error(
                "Failed to delete task:",
                error
            );

            alert("Failed to delete task");
        }
    };

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="min-w-0">
            <div className="p-6 lg:p-8">

                {/* ==================================
                    PROJECT SELECTOR
                =================================== */}

                {projects.length > 0 ? (
                    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Project
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Select a project to manage
                                    its tasks.
                                </p>
                            </div>

                            <select
                                value={selectedProjectId}
                                onChange={(e) =>
                                    setSelectedProjectId(
                                        e.target.value
                                    )
                                }
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                {projects.map((project) => (
                                    <option
                                        key={project.id}
                                        value={project.id}
                                    >
                                        {project.name}
                                    </option>
                                ))}
                            </select>

                        </div>

                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
                            📋
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-gray-900">
                            No projects yet
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Create a project first, then you
                            can add tasks to it.
                        </p>

                    </div>
                )}

                {/* ==================================
                    TASK MANAGEMENT
                =================================== */}

                {selectedProjectId && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Project Tasks
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Create, complete and remove
                                tasks for this project.
                            </p>
                        </div>

                        {/* ADD TASK */}

                        <AddTask onAdd={handleAddTask} />

                        {/* TASK LIST */}

                        <div className="mt-6">

                            {tasksLoading ? (
                                <div className="py-10 text-center">
                                    <p className="text-sm text-gray-500">
                                        Loading tasks...
                                    </p>
                                </div>
                            ) : tasks.length > 0 ? (
                                <TaskList
                                    tasks={tasks}
                                    onToggle={handleToggleTask}
                                    onDelete={handleDeleteTask}
                                />
                            ) : (
                                <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">

                                    <div className="text-3xl">
                                        📝
                                    </div>

                                    <p className="mt-3 font-medium text-gray-600">
                                        No tasks yet
                                    </p>

                                    <p className="mt-1 text-sm text-gray-400">
                                        Add your first task above.
                                    </p>

                                </div>
                            )}

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

export default Tasks;