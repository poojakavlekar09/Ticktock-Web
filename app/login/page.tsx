"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.ok) {
            setError("");
            redirect("/dashboard"); // Redirect to dashboard on successful login
        } else {
            setError("Invalid email or password. Please try again.");
        }

    };

    return (
        <div className="min-h-screen flex">
            {/* Left - Login Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-10 bg-white">
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-2xl font-semibold mb-6">Welcome back</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="name@example.com"
                                className="w-full px-4 py-2 border border-gray-400 rounded-md text-sm focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-gray-400 rounded-md text-sm focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center text-sm text-gray-400">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                                className="mr-2"
                            />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <span className="text-red-500 text-sm text-center block">{error}</span>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition"
                        >
                            Sign in
                        </button>
                    </form>

                    <footer className="mt-5 text-xs text-gray-400 text-center">© 2024 tentwenty</footer>
                </div>
            </div>

            {/* Right - Blue Panel */}
            <div className="hidden md:flex md:w-1/2 bg-blue-600 text-white items-center justify-center px-10">
                <div>
                    <h1 className="text-3xl font-bold mb-4">ticktock</h1>
                    <p className="text-sm leading-relaxed">
                        Introducing ticktock, our cutting-edge timesheet web application designed to
                        revolutionize how you manage employee work hours. With ticktock, you can
                        effortlessly track and monitor employee attendance and productivity from
                        anywhere, anytime, using any internet-connected device.
                    </p>
                </div>
            </div>
        </div>
    );
} 