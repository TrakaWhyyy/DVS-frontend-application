"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validate inputs
        if (!username.trim() || !password.trim()) {
            setError("Username and password are required");
            return;
        }
        try {
            const res = await fetch("http://localhost:8005/api/v1/login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
                credentials: "include",
            });
            if (res.ok) {
                router.push("/dashboard");
            } else {
                setError("Invalid credentials");
            }
        } catch {
            setError("Login failed");
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!username.trim() || !password.trim()}
                >
                    Login
                </button>
            </form>
        </div>
    );
}