import Layout from "../layouts/Layout"
import { useState } from "react";

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
        <Layout>
            <section>
                <h1>Create your Account</h1>
                <p>Start managing your team today</p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Enter your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                    <div>
                        <label>Confirm password</label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">
                        Create account
                    </button>
                </form>
            </section>
        </Layout>
    );
}
export default Register