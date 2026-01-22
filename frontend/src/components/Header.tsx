import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <header className="h-14 bg-white border-b flex items-center justify-between px-6">
            {/* Left */}
            <h1 className="text-lg font-semibold text-gray-800">
                Admin Dashboard
            </h1>

            {/* Right */}
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                    {user.full_name}
                </span>

                <button
                    onClick={handleLogout}
                    title="Logout"
                    className="text-gray-600 hover:text-red-600"
                >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}
