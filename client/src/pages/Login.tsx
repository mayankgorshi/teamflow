import Layout from "../layouts/Layout"
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        console.log("Email:", email);
        console.log("Password:", password)
    }
    return (
        <Layout>
            <section>
                <h1>Welcome Back</h1>
                <p>Login to continue managing your projects</p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">
                        Login
                    </button>
                </form>
            </section>
        </Layout>
    );
}
export default Login