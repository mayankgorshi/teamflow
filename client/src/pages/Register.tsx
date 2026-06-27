import AuthLayout from "../layouts/Authlayout";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("ConfirmPassword:", confirmPassword);
    }
    return (
        <AuthLayout
            title="Create Account 🚀"
            subtitle="Join thousands of productive teams.">
            <form onSubmit={handleSubmit}
                className="space-y-7">
                <div>
                    <label className="mb-2 block font-semibold">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:right-4 focus:ring-blue-100"
                    />
                </div>
                <div>
                    <label className="mb-2 block font-semibold">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:right-4 focus:ring-blue-100"
                    />
                </div>
                <div>
                    <label className="mb-2 block font-semibold">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:right-4 focus:ring-blue-100"
                    />
                </div>
                <div>
                    <label className="mb-2 block font-semibold">Confirm password</label>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:right-4 focus:ring-blue-100"
                    />
                </div>
                <div className="pt-2 text-center">
                    <Button
                        text="Create account"
                        fullWidth />
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
export default Register