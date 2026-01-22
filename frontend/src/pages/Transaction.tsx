import { useEffect, useState } from "react";
import { transactionApi } from "../api/transaction.api";
import Header from "../components/Header";
import { showError, showSuccess } from "../utils/toast";
import CreateTransactionModal from "../components/CreateTransactionModal";
import { senderReceiverApi } from "../api/senderReceiver.api";

export default function Transactions() {
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [senders, setSenders] = useState<any[]>([]);
    const [receivers, setReceivers] = useState<any[]>([]);
    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        sender_id: "",
        receiver_id: "",
    });

    const load = async () => {
        try {
            const res = await transactionApi.getAll();
            setData(res.data.data);
        } catch {
            showError("Failed to load transactions");
        }
    };

    const handleCreate = async (payload: any) => {
        try {
            await transactionApi.create(payload);
            showSuccess("Transaction queued. Processing...");
            setOpenModal(false);
            load();
        } catch {
            showError("Failed to create transaction");
        }
    };
    const handleMarkCompleted = async (id: string) => {
        try {
            await transactionApi.updateStatus(id, "COMPLETED");
            showSuccess("Transaction marked as completed");
            load();
        } catch (e: any) {
            showError(
                e.response?.data?.message || "Failed to update status"
            );
        }
    };
    const applyFilters = async () => {
        try {
            const res = await transactionApi.getAll(filters);
            setData(res.data.data);
        } catch {
            showError("Failed to apply filters");
        }
    };



    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        senderReceiverApi.getAll("SENDER").then(r =>
            setSenders(r.data.data)
        );
        senderReceiverApi.getAll("RECEIVER").then(r =>
            setReceivers(r.data.data)
        );
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <div className="p-6 max-w-6xl mx-auto bg-white mt-6 rounded shadow">
                <h1 className="text-xl font-semibold mb-4">
                    Transactions
                </h1>
                <button
                    onClick={() => setOpenModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    + Create Transaction
                </button>
                <div className="grid grid-cols-5 gap-4 m-4">
                    <input
                        type="date"
                        className="border p-2"
                        value={filters.startDate}
                        onChange={(e) =>
                            setFilters({ ...filters, startDate: e.target.value })
                        }
                    />

                    <input
                        type="date"
                        className="border p-2"
                        value={filters.endDate}
                        onChange={(e) =>
                            setFilters({ ...filters, endDate: e.target.value })
                        }
                    />

                    <select
                        className="border p-2"
                        value={filters.sender_id}
                        onChange={(e) =>
                            setFilters({ ...filters, sender_id: e.target.value })
                        }
                    >
                        <option value="">All Senders</option>
                        {senders.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.full_name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="border p-2"
                        value={filters.receiver_id}
                        onChange={(e) =>
                            setFilters({ ...filters, receiver_id: e.target.value })
                        }
                    >
                        <option value="">All Receivers</option>
                        {receivers.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.full_name}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={applyFilters}
                        className="bg-blue-600 text-white rounded"
                    >
                        Filter
                    </button>
                </div>

                <table className="w-full my-3 border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-center">Amount (JPY)</th>
                            <th className="p-2 text-center">Converted (NPR)</th>
                            <th className="p-2 text-center">Fee (NPR)</th>
                            <th className="p-2 text-center">Total (NPR)</th>
                            <th className="p-2 text-center">Status</th>
                            <th className="p-2 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((tx: any) => (
                            <tr key={tx.id} className="border-t">
                                <td className="p-2 text-center">{tx.amount}</td>
                                <td className="p-2 text-center">{tx.converted_amount}</td>
                                <td className="p-2 text-center">{tx.fee}</td>
                                <td className="p-2 text-center font-medium">{tx.total_payable}</td>

                                <td className="p-2 text-center">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${tx.status === "PENDING"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : tx.status === "COMPLETED"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {tx.status}
                                    </span>
                                </td>

                                <td className="p-2 text-center">
                                    {tx.status === "PENDING" ? (
                                        <button
                                            onClick={() => handleMarkCompleted(tx.id)}
                                            className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Mark Completed
                                        </button>
                                    ) : (
                                        <span className="text-gray-400 text-sm">
                                            —
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <CreateTransactionModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    onSubmit={handleCreate}
                />
            </div>
        </div>
    );
}
