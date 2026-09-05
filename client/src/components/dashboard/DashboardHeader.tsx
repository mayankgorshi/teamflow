import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function DashboardHeader() {
    const { user } = useAuth();
    const location = useLocation();

    const getHeader = () => {
        switch (location.pathname) {
            case "/":
                return {
                    title: "Dashboard",
                    subtitle: "Overview of your workspace",
                };

            case "/projects":
                return {
                    title: "Projects",
                    subtitle: "Manage and organize your projects",
                };

            case "/tasks":
                return {
                    title: "Tasks",
                    subtitle: "Track your work and stay productive",
                };

            case "/messages":
                return {
                    title: "Messages",
                    subtitle: "Chat with your teammates",
                };

            default:
                return {
                    title: "Dashboard",
                    subtitle: "Overview of your workspace",
                };
        }
    };

    const header = getHeader();

    const initial =
        user?.name?.charAt(0).toUpperCase() || "U";

    return (
        <header className="sticky top-0 z-10 flex h-[68px] items-center justify-between border-b border-gray-100 bg-white/80 px-5 backdrop-blur-md sm:px-6 lg:px-8">

            {/* Page title */}
            <div className="flex min-w-0 items-center gap-3">
                <span className="h-6 w-1 rounded-full bg-blue-600" />

                <div className="min-w-0">
                    <h1 className="text-[17px] font-semibold tracking-tight text-gray-900 sm:text-lg">
                        {header.title}
                    </h1>

                    <p className="mt-0.5 text-xs text-gray-400 sm:text-[13px]">
                        {header.subtitle}
                    </p>
                </div>
            </div>


            {/* User */}
            <button
                type="button"
                className="flex items-center gap-3 rounded-full py-1 pl-3 pr-1.5 transition hover:bg-gray-50"
            >
                {/* User information */}
                <div className="hidden text-right sm:block">
                    <p className="text-[13px] font-semibold leading-4 text-gray-900">
                        {user?.name || "User"}
                    </p>

                    <p className="mt-0.5 max-w-[160px] truncate text-[11px] text-gray-400">
                        {user?.email}
                    </p>
                </div>

                <span className="hidden h-8 w-px bg-gray-200 sm:block" aria-hidden="true" />

                {/* Avatar */}
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-semibold text-white shadow-sm ring-2 ring-white">
                    {initial}
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                </span>

                <svg
                    className="hidden h-4 w-4 text-gray-400 sm:block"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

        </header>
    );
}

export default DashboardHeader;