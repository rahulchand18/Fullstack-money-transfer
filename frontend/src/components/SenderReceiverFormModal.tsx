import { useEffect, useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    type: "SENDER" | "RECEIVER";
    initialData?: any;
};

export default function SenderReceiverFormModal({
    open,
    onClose,
    onSubmit,
    type,
    initialData,
}: Props) {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("NP");

    useEffect(() => {
        if (initialData) {
            setFullName(initialData.full_name);
            setPhone(initialData.phone || "");
            setCountry(initialData.country_code);
        }
    }, [initialData]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-96">
                <h2 className="text-lg font-semibold mb-4">
                    {initialData ? "Edit" : "Add"}{" "}
                    {type === "SENDER" ? "Sender" : "Receiver"}
                </h2>

                <input
                    className="w-full border p-2 mb-3"
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <input
                    className="w-full border p-2 mb-3"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <select
                    className="w-full border p-2 mb-4"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    <option value="NP">Nepal (NP)</option>
                    <option value="JP">Japan (JP)</option>
                </select>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose}>Cancel</button>
                    <button
                        onClick={() =>
                            onSubmit({
                                type,
                                full_name: fullName,
                                phone,
                                country_code: country,
                            })
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
