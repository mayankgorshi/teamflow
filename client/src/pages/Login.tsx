import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/Authlayout";
import Button from "../components/dashboard/Button";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const data = await loginUser({
                email,
                password,
            });

            login(data.user, data.token);

            alert("Login successful 🎉");

            navigate("/");

        } catch (error) {
            console.error("Login error:", error);

            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Something went wrong");
            }
        }
    }

    return (
        <AuthLayout
            title="Welcome Back 👋"
            subtitle="Login to continue managing your projects."
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div>
                    <label className="mb-2 block font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-blue-100"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                </div>

                <div className="pt-2 text-center">
                    <Button
                        text="Login"
                        fullWidth
                    />
                </div>

                <p className="text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Create one
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}

export default Login;