import TaskItem from "./TaskItem";
import type { Task } from "../../api/taskApi";

type TaskListProps = {
    tasks: Task[];
    onToggle: (taskId: string) => void;
    onDelete: (taskId: string) => void;
};

function TaskList({
    tasks,
    onToggle,
    onDelete,
}: TaskListProps) {
    return (
        <div className="space-y-3">
            {tasks.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
                    <p className="text-gray-500">
                        No tasks yet.
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                        Create your first task to get started.
                    </p>
                </div>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        title={task.title}
                        description={task.description ?? undefined}
                        completed={task.completed}
                        onToggle={() => onToggle(task.id)}
                        onDelete={() => onDelete(task.id)}
                    />
                ))
            )}
        </div>
    );
}

export default TaskList;