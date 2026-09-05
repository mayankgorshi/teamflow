
type TaskItemProps = {
    title: string;
    description?: string;
    completed: boolean;
    onToggle: () => void;
    onDelete: () => void;
};

function TaskItem({
    title,
    description,
    completed,
    onToggle,
}: TaskItemProps) {
    return (
        <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4">
            <button
                onClick={onToggle}
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${completed
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 hover:border-blue-500"
                    }`}
            >
                {completed && "✓"}
            </button>

            <div className="min-w-0 flex-1">
                <h4
                    className={`font-medium ${completed
                            ? "text-gray-400 line-through"
                            : "text-gray-900"
                        }`}
                >
                    {title}
                </h4>

                {description && (
                    <p className="mt-1 text-sm text-gray-500">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}

export default TaskItem;