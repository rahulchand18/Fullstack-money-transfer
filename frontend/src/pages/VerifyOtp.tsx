import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { showError, showSuccess } from "../utils/toast";

export default function VerifyOtp() {
    const navigate = useNavigate();
    const email = sessionStorage.getItem("loginEmail");

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");

    const getInitialTimer = () => {
        const requestedAt = sessionStorage.getItem("otpRequestedAt");
        if (!requestedAt) return 60;

        const elapsed = Math.floor(
            (Date.now() - Number(requestedAt)) / 1000
        );

        return elapsed >= 60 ? 0 : 60 - elapsed;
    };

    const [timer, setTimer] = useState(getInitialTimer);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
            return;
        }

        if (!email) {
            navigate("/");
        }
    }, [email, navigate]);
    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!otp) {
            setError("OTP is required");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post("/auth/verifyOTP", {
                email,
                otp,
            });

            const { token, user } = res.data.data;
            showSuccess("Login successful");

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            sessionStorage.removeItem("loginEmail");
            sessionStorage.removeItem("otpRequestedAt");

            navigate("/dashboard");
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Invalid or expired OTP"
            );
            showError("Invalid or expired OTP");

        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!email) return;

        try {
            setResending(true);
            setError("");

            await api.post("/auth/login", { email });

            sessionStorage.setItem(
                "otpRequestedAt",
                Date.now().toString()
            );
            setTimer(60);
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Unable to resend OTP"
            );
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-semibold text-gray-800 text-center">
                    Verify OTP
                </h1>

                <p className="text-sm text-gray-500 text-center mt-2">
                    Enter the 6-digit OTP sent to your email
                </p>

                <form onSubmit={handleVerify} className="mt-6 space-y-4">
                    <input
                        type="text"
                        maxLength={6}
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-blue-600 py-2 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    {timer > 0 ? (
                        <p>
                            Resend OTP in{" "}
                            <span className="font-semibold">{timer}s</span>
                        </p>
                    ) : (
                        <button
                            onClick={handleResend}
                            disabled={resending}
                            className="text-blue-600 hover:underline disabled:opacity-60"
                        >
                            {resending ? "Resending..." : "Resend OTP"}
                        </button>
                    )}
                </div>

                {error && (
                    <p className="mt-4 text-sm text-red-600 text-center">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}
