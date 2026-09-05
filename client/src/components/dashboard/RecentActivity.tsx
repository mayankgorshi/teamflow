const activities = [
    "You completed the authentication system.",
    "A new project was created.",
    "You updated a project task.",
    "A team member joined your workspace.",
];

function RecentActivity() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
                Recent Activity
            </h3>

            <div className="space-y-5">
                {activities.map((activity, index) => (
                    <div
                        key={index}
                        className="flex gap-3"
                    >
                        <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />

                        <p className="text-sm text-gray-600">
                            {activity}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentActivity;