import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center bg-white p-8 rounded-lg shadow">
                <h1 className="text-4xl font-bold text-gray-800">404</h1>
                <p className="mt-2 text-gray-600">
                    Page not found
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
}
