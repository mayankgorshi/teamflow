import AuthLayout from "../layouts/Authlayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/dashboard/Button";
import { registerUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const data = await registerUser({
                name,
                email,
                password,
            });

            console.log("Registration successful:", data);

            // Save user + JWT through AuthContext
            login(data.user, data.token);

            alert("Account created successfully! 🎉");

            // Go directly to dashboard
            navigate("/");

        } catch (error) {
            console.error("Registration error:", error);

            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Something went wrong");
            }
        }
    }

    return (
        <AuthLayout
            title="Create Account 🚀"
            subtitle="Join thousands of productive teams."
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-7"
            >
                <div>
                    <label className="mb-2 block font-semibold">
                        Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:ring-blue-100"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-semibold">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:ring-blue-100"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-semibold">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:ring-blue-100"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-semibold">
                        Confirm password
                    </label>

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:ring-blue-100"
                    />
                </div>

                <div className="pt-2 text-center">
                    <Button
                        text="Create account"
                        fullWidth
                    />
                </div>

                <p className="text-center text-gray-600">
                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}

export default Register;