import { NavLink, useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Header() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <header className="h-14 bg-white border-b flex items-center justify-between px-6">
            <div className="flex items-center gap-6">
                <h1 className="font-semibold">Admin Panel</h1>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "text-blue-600 font-medium" : "text-gray-600"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/sender-receivers"
                    className={({ isActive }) =>
                        isActive ? "text-blue-600 font-medium" : "text-gray-600"
                    }
                >
                    Senders / Receivers
                </NavLink>

                <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                        isActive ? "text-blue-600 font-medium" : "text-gray-600"
                    }
                >
                    Transactions
                </NavLink>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{user.full_name}</span>

                <button onClick={logout} className="text-red-600">
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}
