import { useState } from "react";

type AddTaskProps = {
    onAdd: (title: string, description: string) => void;
};

function AddTask({ onAdd }: AddTaskProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!title.trim()) return;

        onAdd(title, description);

        setTitle("");
        setDescription("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4"
        >
            <div className="grid gap-3 sm:grid-cols-2">
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
                />

                <input
                    type="text"
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
                />
            </div>

            <button
                type="submit"
                className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
                Add Task
            </button>
        </form>
    );
}

export default AddTask;