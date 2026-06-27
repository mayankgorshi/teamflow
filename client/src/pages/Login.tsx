
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../layouts/Authlayout";
import Button from "../components/common/Button";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        console.log("Email:", email);
        console.log("Password:", password)
    }
    return (
        
            <AuthLayout
                title="Welcome Back 👋"
                subtitle="Login to continue managing your projects.">
                <form onSubmit={handleSubmit}
                    className="space-y-5">
                    <div>
                        <label className="mb-2 block font-medium">
                            Email
                        </label>

                        <input
                            type= "email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:right-4 focus:ring-blue-100"


                        />
                    </div>
                    <div>
                        <label className="mb-2  block font-medium">
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
                        text= "Login"
                        fullWidth/>
                    </div>
                    <p className="text-center text-gray-600">
                    Don't have an account?{""}
                    <Link to="/register"
                    className="font-semibold text-blue-600 hover:underline">
                        Create one
                    </Link>
                </p>
            </form>
        </AuthLayout>
        
    );
}
export default Login