import { useEffect, useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { email: string; full_name: string }) => void;
    initialData?: any;
};

export default function AdminFormModal({
    open,
    onClose,
    onSubmit,
    initialData,
}: Props) {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");

    useEffect(() => {
        if (initialData) {
            setEmail(initialData.email);
            setFullName(initialData.full_name);
        }
    }, [initialData]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-lg font-semibold mb-4">
                    {initialData ? "Edit Admin" : "Add Admin"}
                </h2>

                <input
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border p-2 mb-3"
                />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 mb-4"
                    disabled={!!initialData}
                />

                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2">
                        Cancel
                    </button>
                    <button
                        onClick={() => onSubmit({ email, full_name: fullName })}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
