import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type DashboardSidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

// ======================================================
// ICONS
// ======================================================

function LogoMark() {
    return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-sm ring-1 ring-blue-700/10">
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7 7.5L12 4L17 7.5V13.5L12 17L7 13.5V7.5Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />

                <path
                    d="M7 13.5L12 17L17 13.5"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />

                <path
                    d="M12 4V10"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}


function HomeIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-[19px] w-[19px]"
        >
            <path
                d="M3.5 10.5L12 3.5L20.5 10.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M5.5 9.5V20H18.5V9.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M9.5 20V14H14.5V20"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}


function ProjectsIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-[19px] w-[19px]"
        >
            <path
                d="M4 7.5C4 6.67 4.67 6 5.5 6H9L11 8H18.5C19.33 8 20 8.67 20 9.5V18.5C20 19.33 19.33 20 18.5 20H5.5C4.67 20 4 19.33 4 18.5V7.5Z"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M4 10H20"
                strokeLinecap="round"
            />
        </svg>
    );
}


function TasksIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-[19px] w-[19px]"
        >
            <path
                d="M9 6H19"
                strokeLinecap="round"
            />

            <path
                d="M9 12H19"
                strokeLinecap="round"
            />

            <path
                d="M9 18H19"
                strokeLinecap="round"
            />

            <path
                d="M4.5 6L5.5 7L7 5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M4.5 12L5.5 13L7 11"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M4.5 18L5.5 19L7 17"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}


function MessagesIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-[19px] w-[19px]"
        >
            <path
                d="M5 5.5H19C19.83 5.5 20.5 6.17 20.5 7V15C20.5 15.83 19.83 16.5 19 16.5H11L7 19.5V16.5H5C4.17 16.5 3.5 15.83 3.5 15V7C3.5 6.17 4.17 5.5 5 5.5Z"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M7.5 10H16.5"
                strokeLinecap="round"
            />

            <path
                d="M7.5 13H13"
                strokeLinecap="round"
            />
        </svg>
    );
}


function LogoutIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-[19px] w-[19px]"
        >
            <path
                d="M10 5H6.5C5.67 5 5 5.67 5 6.5V17.5C5 18.33 5.67 19 6.5 19H10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M14 8L18 12L14 16"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M18 12H9"
                strokeLinecap="round"
            />
        </svg>
    );
}


// ======================================================
// COMPONENT
// ======================================================

function DashboardSidebar({
    isOpen,
    onClose,
}: DashboardSidebarProps) {

    const { logout } = useAuth();


    const links = [
        {
            name: "Dashboard",
            path: "/",
            icon: <HomeIcon />,
        },
        {
            name: "Projects",
            path: "/projects",
            icon: <ProjectsIcon />,
        },
        {
            name: "Tasks",
            path: "/tasks",
            icon: <TasksIcon />,
        },
        {
            name: "Messages",
            path: "/messages",
            icon: <MessagesIcon />,
        },
    ];


    return (
        <>
            {/* ==================================================
                MOBILE OVERLAY
            ================================================== */}

            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px] lg:hidden"
                    onClick={onClose}
                />
            )}


            {/* ==================================================
                SIDEBAR
            ================================================== */}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-hidden border-r border-gray-200 bg-gray-50 px-4 py-5 transition-transform duration-300 lg:translate-x-0 ${
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }`}
            >

                {/* ==================================================
                    BRAND
                ================================================== */}

                <div className="mb-10 flex items-start justify-between px-2">

                    <div className="flex items-center gap-3">

                        <LogoMark />

                        <div>

                            <h1 className="text-[19px] font-bold leading-none tracking-tight text-gray-950">
                                TeamFlow
                            </h1>

                            <p className="mt-1.5 text-[11px] font-medium text-gray-400">
                                Work better together.
                            </p>

                        </div>

                    </div>


                    {/* Mobile close */}

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 lg:hidden"
                        aria-label="Close menu"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-5 w-5"
                        >
                            <path
                                d="M6 6L18 18"
                                strokeLinecap="round"
                            />

                            <path
                                d="M18 6L6 18"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>

                </div>


                {/* ==================================================
                    NAVIGATION
                ================================================== */}

                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">

                    <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                        Workspace
                    </p>


                    {links.map((link) => (

                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${
                                    isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:bg-gray-100/70 hover:text-gray-950"
                                }`
                            }
                        >

                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-blue-600" />
                                    )}

                                    <span
                                        className={`flex h-5 w-5 shrink-0 items-center justify-center transition ${
                                            isActive
                                                ? "text-blue-600"
                                                : "text-gray-400 group-hover:text-gray-700"
                                        }`}
                                    >
                                        {link.icon}
                                    </span>

                                    <span>
                                        {link.name}
                                    </span>
                                </>
                            )}

                        </NavLink>

                    ))}

                </nav>


                {/* ==================================================
                    ACCOUNT
                ================================================== */}

                <div className="border-t border-gray-100 pt-4">

                    {/* User */}

                    <div className="mb-2 flex items-center gap-3 rounded-xl px-3 py-3">

                        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-semibold text-white shadow-sm ring-2 ring-white">
                            R
                            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                        </div>

                        <div className="min-w-0">

                            <p className="truncate text-sm font-semibold text-gray-900">
                                Rahul
                            </p>

                            <p className="truncate text-[11px] text-gray-400">
                                Account
                            </p>

                        </div>

                    </div>


                    {/* Logout */}

                    <button
                        type="button"
                        onClick={logout}
                        className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-medium text-gray-500 transition hover:bg-red-50 hover:text-red-500"
                    >

                        <span className="flex h-5 w-5 items-center justify-center">
                            <LogoutIcon />
                        </span>

                        Logout

                    </button>

                </div>

            </aside>
        </>
    );
}

export default DashboardSidebar;