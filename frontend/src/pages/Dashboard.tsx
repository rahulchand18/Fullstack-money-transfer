import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Dashboard
                </h1>

                <p className="mt-2 text-gray-600">
                    Welcome, <span className="font-medium">{user.full_name}</span>
                </p>

                <button
                    onClick={handleLogout}
                    className="mt-6 rounded-md bg-red-600 px-4 py-2 text-white text-sm hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
