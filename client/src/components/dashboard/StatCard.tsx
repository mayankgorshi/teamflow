type StatCardProps = {
    title: string;
    value: string;
    description: string;
};

function StatCard({
    title,
    value,
    description,
}: StatCardProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
                {title}
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
                {value}
            </p>

            <p className="mt-2 text-sm text-gray-500">
                {description}
            </p>
        </div>
    );
}

export default StatCard;