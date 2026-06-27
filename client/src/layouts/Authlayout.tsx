
type AuthLayoutProps = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
};

function AuthLayout({
    title,
    subtitle,
    children,
}: AuthLayoutProps) {
    return (
        <section className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

            <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 shadow-2xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
                    TeamFlow
                </p>
                <h1 className="text-4xl font-bold text-gray-900">
                    {title}
                </h1>

                <p className="mt-3 text-gray-600">
                    {subtitle}
                </p>

                <div className="mt-8">
                    {children}
                </div>

            </div>

        </section>
    );
}

export default AuthLayout;