import { useEffect, useState } from "react";
import SenderReceiverTable from "../components/SenderReceiverTable";
import SenderReceiverFormModal from "../components/SenderReceiverFormModal";
import { senderReceiverApi } from "../api/senderReceiver.api";
import { showSuccess, showError } from "../utils/toast";
import Header from "../components/Header";

export default function SenderReceivers() {
    const [type, setType] = useState<"SENDER" | "RECEIVER">("SENDER");
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editing, setEditing] = useState<any>(null);

    const loadData = async () => {
        try {
            const res = await senderReceiverApi.getAll(type);
            setData(res.data.data);
        } catch {
            showError("Failed to load data");
        }
    };

    useEffect(() => {
        loadData();
    }, [type]);

    const handleCreate = async (payload: any) => {
        try {
            await senderReceiverApi.create(payload);
            showSuccess("Saved successfully");
            setOpenModal(false);
            loadData();
        } catch (e: any) {
            showError(e.response?.data?.message);
        }
    };

    const handleUpdate = async (payload: any) => {
        try {
            await senderReceiverApi.update(editing.id, payload);
            showSuccess("Updated successfully");
            setEditing(null);
            loadData();
        } catch {
            showError("Update failed");
        }
    };

    const handleDeactivate = async (id: string) => {
        try {
            await senderReceiverApi.deactivate(id);
            showSuccess("Deactivated");
            loadData();
        } catch {
            showError("Failed to deactivate");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <div className="p-6 max-w-5xl mx-auto bg-white mt-6 rounded shadow">
                {/* Tabs */}
                <div className="flex gap-4 mb-4">
                    {["SENDER", "RECEIVER"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setType(t as any)}
                            className={`px-4 py-2 rounded ${type === t
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200"
                                }`}
                        >
                            {t === "SENDER" ? "Senders" : "Receivers"}
                        </button>
                    ))}

                    <button
                        onClick={() => setOpenModal(true)}
                        className="ml-auto bg-green-600 text-white px-4 py-2 rounded"
                    >
                        + Add
                    </button>
                </div>

                <SenderReceiverTable
                    data={data}
                    onEdit={setEditing}
                    onDeactivate={handleDeactivate}
                />
            </div>

            <SenderReceiverFormModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleCreate}
                type={type}
            />

            <SenderReceiverFormModal
                open={!!editing}
                onClose={() => setEditing(null)}
                onSubmit={handleUpdate}
                type={type}
                initialData={editing}
            />
        </div>
    );
}
