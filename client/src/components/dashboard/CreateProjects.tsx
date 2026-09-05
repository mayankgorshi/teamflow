import { useState } from "react";
import { createProject } from "../../api/projectsApi";

type CreateProjectProps = {
    onProjectCreated: () => void;
};

function CreateProject({ onProjectCreated }: CreateProjectProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!name.trim()) return;

        try {
            setLoading(true);

            await createProject({
                name: name.trim(),
                description: description.trim(),
            });

            setName("");
            setDescription("");

            onProjectCreated();
        } catch (error) {
            console.error("Failed to create project:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to create project"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">

            {/* Header */}
            <div className="flex items-start gap-4 border-b border-gray-100 p-6">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-sm ring-1 ring-blue-700/10">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                    >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                    </svg>
                </div>

                <div>
                    <h2 className="text-base font-semibold text-gray-900">
                        Create a new project
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Set up a workspace and start collaborating.
                    </p>
                </div>

            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="p-6"
            >

                {/* Project name */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Project name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="e.g. Website Redesign"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />
                </div>

                {/* Description */}
                <div className="mt-5">

                    <div className="flex items-center justify-between">

                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>

                        <span className="text-xs text-gray-400">
                            Optional
                        </span>

                    </div>

                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        placeholder="Briefly describe what this project is about..."
                        rows={4}
                        className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />

                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between gap-4">

                    <p className="hidden text-xs text-gray-400 sm:block">
                        You can add tasks and team members later.
                    </p>

                    <button
                        type="submit"
                        disabled={
                            loading ||
                            !name.trim()
                        }
                        className="ml-auto flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading && (
                            <svg
                                className="h-4 w-4 animate-spin"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                        )}

                        {loading
                            ? "Creating..."
                            : "Create project"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default CreateProject;