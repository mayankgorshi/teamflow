type Project = {
    id: string;
    name: string;
    description?: string | null;
    status: string;
};

type RecentProjectsProps = {
    projects: Project[];
};

function RecentProjects({ projects }: RecentProjectsProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    Recent Projects
                </h3>

                <button className="text-sm font-medium text-blue-600 hover:underline">
                    View all
                </button>
            </div>

            {projects.length === 0 ? (
                <div className="py-8 text-center">
                    <p className="text-gray-500">
                        No projects yet.
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                        Create your first project to get started.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {projects.slice(0, 3).map((project) => (
                        <div key={project.id}>
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                    {project.name}
                                </span>

                                <span className="text-xs font-medium text-gray-500">
                                    {project.status}
                                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                <div
                                    className="h-full w-full rounded-full bg-blue-600"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RecentProjects;