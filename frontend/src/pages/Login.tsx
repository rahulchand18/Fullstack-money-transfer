import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!email) {
            setError("Email is required");
            return;
        }

        try {
            setLoading(true);
            const res = await api.post("/auth/login", { email });
            sessionStorage.setItem("loginEmail", email);
            sessionStorage.setItem("otpRequestedAt", Date.now().toString());
            navigate("/verify-otp");

            setMessage(res.data.message || "OTP sent to your email");
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">

                <h1 className="text-2xl font-semibold text-gray-800 text-center">
                    Admin Login
                </h1>

                <p className="text-sm text-gray-500 text-center mt-2">
                    Enter your email to receive an OTP
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="admin@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-blue-600 py-2 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
                    >
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-sm text-green-600 text-center">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="mt-4 text-sm text-red-600 text-center">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}
