import { useEffect, useState } from "react";
import { senderReceiverApi } from "../api/senderReceiver.api";

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
};

export default function CreateTransactionModal({
    open,
    onClose,
    onSubmit,
}: Props) {
    const [senders, setSenders] = useState<any[]>([]);
    const [receivers, setReceivers] = useState<any[]>([]);

    const [senderId, setSenderId] = useState("");
    const [receiverId, setReceiverId] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [currency, setCurrency] = useState("JPY");

    const exchangeRate = 0.92;
    const convertedAmount = amount * exchangeRate;

    let fee = 0;
    if (convertedAmount <= 100000) fee = 500;
    else if (convertedAmount <= 200000) fee = 1000;
    else fee = 3000;

    const totalPayable = convertedAmount + fee;

    useEffect(() => {
        if (open) {
            senderReceiverApi.getAll("SENDER").then(r =>
                setSenders(r.data.data)
            );
            senderReceiverApi.getAll("RECEIVER").then(r =>
                setReceivers(r.data.data)
            );
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[420px]">
                <h2 className="text-lg font-semibold mb-6">
                    Create Transaction
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Sender
                        </label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={senderId}
                            onChange={(e) => setSenderId(e.target.value)}
                        >
                            <option value="">Select Sender</option>
                            {senders.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.full_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Receiver
                        </label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={receiverId}
                            onChange={(e) => setReceiverId(e.target.value)}
                        >
                            <option value="">Select Receiver</option>
                            {receivers.map((r) => (
                                <option key={r.id} value={r.id}>
                                    {r.full_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Amount
                        </label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Currency
                        </label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <option value="JPY">JPY</option>
                            <option value="NPR">NPR</option>
                        </select>
                    </div>

                    <div className="text-sm text-gray-700 space-y-1">
                        <div>Forex Rate: 1 JPY = 0.92 NPR</div>
                        <div>Converted Amount: NPR {convertedAmount.toFixed(2)}</div>
                        <div>Service Fee: NPR {fee}</div>
                        <div className="font-semibold">
                            Total Payable: NPR {totalPayable.toFixed(2)}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() =>
                            onSubmit({
                                sender_id: senderId,
                                receiver_id: receiverId,
                                amount,
                                currency,
                            })
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
