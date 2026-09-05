import { useEffect, useState } from "react";
import {
    getProjects,
    type Project,
} from "../api/projectsApi";

function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Project currently opened
    const [expandedProjectId, setExpandedProjectId] =
        useState<string | null>(null);

    // ==========================================
    // LOAD PROJECTS
    // ==========================================

    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getProjects();

            setProjects(data);
        } catch (error: any) {
            console.error(
                "Failed to load projects:",
                error
            );

            setError(
                error?.message ||
                    "Failed to load projects."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // ==========================================
    // OPEN / CLOSE PROJECT
    // ==========================================

    const handleOpenProject = (projectId: string) => {
        setExpandedProjectId((current) =>
            current === projectId
                ? null
                : projectId
        );
    };

    // ==========================================
    // DATE FORMAT
    // ==========================================

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString(
            undefined,
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );
    };

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="min-w-0">

            <div className="p-6 lg:p-8">

                {/* ==================================
                    ERROR
                =================================== */}

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">

                        <p className="text-sm font-medium text-red-700">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={fetchProjects}
                            className="mt-3 text-sm font-semibold text-red-700 underline hover:text-red-800"
                        >
                            Try again
                        </button>

                    </div>
                )}

                {/* ==================================
                    LOADING
                =================================== */}

                {loading ? (

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-52 animate-pulse rounded-2xl border border-gray-200 bg-white"
                            />
                        ))}

                    </div>

                ) : projects.length === 0 ? (

                    /* ==================================
                        EMPTY STATE
                    =================================== */

                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                            📁
                        </div>

                        <h2 className="mt-5 text-xl font-semibold text-gray-900">
                            No projects yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                            You haven't created any projects yet.
                            Go to your dashboard and create your
                            first project to get started.
                        </p>

                    </div>

                ) : expandedProjectId ? (

                    /* ==================================================
                       OPENED PROJECT
                       FULL WIDTH — NO GRID
                    ================================================== */

                    (() => {
                        const project = projects.find(
                            (item) =>
                                item.id ===
                                expandedProjectId
                        );

                        if (!project) {
                            return null;
                        }

                        return (
                            <div className="w-full">

                                <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">

                                    {/* ==================================
                                        PROJECT HEADER
                                    =================================== */}

                                    <div className="p-6 lg:p-8">

                                        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

                                            {/* Left */}

                                            <div className="flex min-w-0 items-start gap-4">

                                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                                                    📁
                                                </div>

                                                <div className="min-w-0">

                                                    <div className="flex flex-wrap items-center gap-3">

                                                        <h2 className="text-2xl font-semibold text-gray-900">
                                                            {project.name}
                                                        </h2>

                                                        <span
                                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                                project.status ===
                                                                "ACTIVE"
                                                                    ? "bg-green-50 text-green-700"
                                                                    : "bg-gray-100 text-gray-600"
                                                            }`}
                                                        >
                                                            {
                                                                project.status
                                                            }
                                                        </span>

                                                    </div>

                                                    <p className="mt-2 text-sm text-gray-400">
                                                        Project
                                                    </p>

                                                    <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">
                                                        {project.description ||
                                                            "No description provided for this project."}
                                                    </p>

                                                </div>

                                            </div>

                                            {/* Close */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setExpandedProjectId(
                                                        null
                                                    )
                                                }
                                                className="shrink-0 rounded-xl bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                                            >
                                                Close
                                            </button>

                                        </div>

                                        {/* ==================================
                                            PROJECT META
                                        =================================== */}

                                        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-gray-100 pt-5">

                                            <div>
                                                <p className="text-xs text-gray-400">
                                                    Created
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-700">
                                                    {formatDate(
                                                        project.createdAt
                                                    )}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-400">
                                                    Last updated
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-700">
                                                    {formatDate(
                                                        project.updatedAt
                                                    )}
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                    {/* ==================================
                                        WORKSPACE
                                    =================================== */}

                                    <div className="border-t border-gray-100 bg-gray-50/60 p-6 lg:p-8">

                                        <div className="mb-6">

                                            <h3 className="text-xl font-semibold text-gray-900">
                                                Project Workspace
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Manage everything related
                                                to this project.
                                            </p>

                                        </div>

                                        {/* Workspace Actions */}

                                        <div className="grid gap-4 md:grid-cols-3">

                                            {/* TASKS */}

                                            <button
                                                type="button"
                                                className="group flex min-h-[120px] items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-sm"
                                            >

                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                                                    ✓
                                                </div>

                                                <div className="min-w-0 flex-1">

                                                    <h4 className="font-semibold text-gray-900">
                                                        Tasks
                                                    </h4>

                                                    <p className="mt-1 text-sm leading-5 text-gray-500">
                                                        Manage project
                                                        tasks
                                                    </p>

                                                </div>

                                                <span className="text-lg text-gray-300 transition group-hover:translate-x-1 group-hover:text-blue-500">
                                                    →
                                                </span>

                                            </button>

                                            {/* TEAM */}

                                            <button
                                                type="button"
                                                className="group flex min-h-[120px] items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-sm"
                                            >

                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                                                    👥
                                                </div>

                                                <div className="min-w-0 flex-1">

                                                    <h4 className="font-semibold text-gray-900">
                                                        Team
                                                    </h4>

                                                    <p className="mt-1 text-sm leading-5 text-gray-500">
                                                        Manage project
                                                        members
                                                    </p>

                                                </div>

                                                <span className="text-lg text-gray-300 transition group-hover:translate-x-1 group-hover:text-blue-500">
                                                    →
                                                </span>

                                            </button>

                                            {/* CHAT */}

                                            <button
                                                type="button"
                                                className="group flex min-h-[120px] items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-sm"
                                            >

                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                                                    💬
                                                </div>

                                                <div className="min-w-0 flex-1">

                                                    <h4 className="font-semibold text-gray-900">
                                                        Chat
                                                    </h4>

                                                    <p className="mt-1 text-sm leading-5 text-gray-500">
                                                        Open project
                                                        conversation
                                                    </p>

                                                </div>

                                                <span className="text-lg text-gray-300 transition group-hover:translate-x-1 group-hover:text-blue-500">
                                                    →
                                                </span>

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        );
                    })()

                ) : (

                    /* ==================================================
                       NORMAL PROJECT GRID
                    ================================================== */

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {projects.map((project) => (

                            <div
                                key={project.id}
                                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                            >

                                {/* ==================================
                                    PROJECT HEADER
                                =================================== */}

                                <div className="flex items-start justify-between gap-4">

                                    <div className="flex min-w-0 items-center gap-3">

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                                            📁
                                        </div>

                                        <div className="min-w-0">

                                            <h2 className="truncate text-lg font-semibold text-gray-900">
                                                {project.name}
                                            </h2>

                                            <p className="mt-0.5 text-xs text-gray-400">
                                                Project
                                            </p>

                                        </div>

                                    </div>

                                    {/* Status */}

                                    <span
                                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                                            project.status ===
                                            "ACTIVE"
                                                ? "bg-green-50 text-green-700"
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {project.status}
                                    </span>

                                </div>

                                {/* Description */}

                                <div className="mt-5 min-h-[48px]">

                                    <p className="line-clamp-2 text-sm leading-6 text-gray-500">
                                        {project.description ||
                                            "No description provided for this project."}
                                    </p>

                                </div>

                                {/* Divider */}

                                <div className="my-5 border-t border-gray-100" />

                                {/* Footer */}

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-xs text-gray-400">
                                            Created
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-gray-700">
                                            {formatDate(
                                                project.createdAt
                                            )}
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleOpenProject(
                                                project.id
                                            )
                                        }
                                        className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                                    >
                                        Open
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Projects;