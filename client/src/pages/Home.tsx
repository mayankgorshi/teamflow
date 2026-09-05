import { useEffect, useState } from "react";

import StatCard from "../components/dashboard/StatCard";
import RecentProjects from "../components/dashboard/RecentProjects";
import RecentActivity from "../components/dashboard/RecentActivity";
import CreateProject from "../components/dashboard/CreateProjects";
import AddMember from "../components/dashboard/AddMember";
import ProjectMembers from "../components/dashboard/ProjectMember";

import { getProjects, type Project } from "../api/projectsApi";
import { useAuth } from "../context/AuthContext";

function Home() {
    const { user } = useAuth();


    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedProjectId, setSelectedProjectId] =
        useState("");

    const [memberCount, setMemberCount] = useState(0);
    const [memberRefreshKey, setMemberRefreshKey] =
        useState(0);

    // ==========================================
    // FETCH PROJECTS
    // ==========================================

    const fetchProjects = async () => {
        try {
            setLoading(true);

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
                setMemberCount(0);
            }
        } catch (error) {
            console.error(
                "Failed to load projects:",
                error
            );
        } finally {
            setLoading(false);
        }
    };
    // ==========================================
    // LOAD PROJECTS
    // ==========================================

    useEffect(() => {
        fetchProjects();
    }, []);

    // ==========================================
    // WHEN PROJECT CHANGES
    // ==========================================

    useEffect(() => {
        setMemberCount(0);
    }, [selectedProjectId]);

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="min-w-0">

            {/* ======================================
                MAIN CONTENT
            ======================================= */}

            <div className="p-6 lg:p-8">

                {/* ==================================
                    WELCOME
                =================================== */}

                <div className="mb-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                        Welcome, {user?.name || "User"} 👋
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Here's an overview of your workspace.
                    </p>
                </div>


                {/* ==================================
                    STATS
                =================================== */}

                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    <StatCard
                        title="Projects"
                        value={
                            loading
                                ? "..."
                                : projects.length.toString()
                        }
                        description="Your projects"
                    />

                    <StatCard
                        title="Active Tasks"
                        value="0"
                        description="Tasks currently in progress"
                    />

                    <StatCard
                        title="Team Members"
                        value={memberCount.toString()}
                        description={
                            selectedProjectId
                                ? "Members in selected project"
                                : "No project selected"
                        }
                    />

                </div>

                {/* ==================================
                    PROJECTS + ACTIVITY
                =================================== */}

                <div className="mt-8 grid gap-6 lg:grid-cols-2">

                    <RecentProjects
                        projects={projects}
                    />

                    <RecentActivity />

                </div>

                {/* ==========================================
    PROJECT TEAM
========================================== */}

                {projects.length > 0 && selectedProjectId && (
                    <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                        {/* ======================================
            PROJECT TEAM HEADER
        ======================================= */}

                        <div className="border-b border-gray-200 p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Project Team
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Manage people working on your project.
                                    </p>
                                </div>

                                <select
                                    value={selectedProjectId}
                                    onChange={(e) => {
                                        setSelectedProjectId(
                                            e.target.value
                                        );

                                        setMemberCount(0);
                                    }}
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

                        {/* ======================================
            ADD MEMBER
        ======================================= */}

                        <div className="border-b border-gray-200 p-6">
                            <AddMember
                                projectId={selectedProjectId}
                                onMemberAdded={() => {
                                    setMemberRefreshKey(
                                        (previous) => previous + 1
                                    );
                                }}
                            />
                        </div>

                        {/* ======================================
            MEMBERS
        ======================================= */}

                        <div className="p-6">
                            <div className="mb-5">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Team Members
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {memberCount}{" "}
                                    {memberCount === 1
                                        ? "person"
                                        : "people"}{" "}
                                    working on this project.
                                </p>
                            </div>

                            <ProjectMembers
                                projectId={selectedProjectId}
                                refreshKey={memberRefreshKey}
                                onMembersLoaded={(count) => {
                                    setMemberCount(count);
                                }}
                            />
                        </div>

                    </div>
                )}
                {/* ==================================
                    CREATE PROJECT
                =================================== */}

                <CreateProject
                    onProjectCreated={fetchProjects}
                />

                {/* ==================================
                    NO PROJECT STATE
                =================================== */}

                {projects.length === 0 && !loading && (
                    <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
                            📁
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-gray-900">
                            No projects yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                            Create your first project to start
                            organizing your work and collaborating
                            with your team.
                        </p>

                    </div>
                )}

            </div>
        </div>
    );
}

export default Home;