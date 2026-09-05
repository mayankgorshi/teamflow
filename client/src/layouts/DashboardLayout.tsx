import { Outlet } from "react-router-dom";
import { useState } from "react";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";

function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">

            <DashboardSidebar
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />

            <main className="min-w-0 flex-1 lg:pl-64">

                {/* Mobile menu */}
                <div className="p-4 lg:hidden">
                    <button
                        type="button"
                        onClick={() =>
                            setSidebarOpen(true)
                        }
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
                    >
                        ☰ Menu
                    </button>
                </div>

                <DashboardHeader />

                <Outlet />

            </main>
        </div>
    );
}

export default DashboardLayout;