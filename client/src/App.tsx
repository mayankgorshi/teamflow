import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import Messages from "./pages/Messages";
import Projects from "./pages/Projects";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
    return (
        <Routes>

            {/* ==============================
                AUTH
            =============================== */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            {/* ==============================
                PROTECTED APP
            =============================== */}

            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route path="/projects"
                    element={<Projects />}
                />

                <Route
                    path="/tasks"
                    element={<Tasks />}
                />

                <Route
                    path="/messages"
                    element={<Messages />}
                />
            </Route>

        </Routes>
    );
}

export default App;