import {
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

type SenderReceiver = {
    id: string;
    full_name: string;
    phone?: string;
    country_code: string;
};

type Props = {
    data: SenderReceiver[];
    onEdit: (row: SenderReceiver) => void;
    onDeactivate: (id: string) => void;
};

export default function SenderReceiverTable({
    data,
    onEdit,
    onDeactivate,
}: Props) {
    return (
        <table className="w-full border text-sm">
            <thead className="bg-gray-100">
                <tr>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2">Phone</th>
                    <th className="p-2">Country</th>
                    <th className="p-2 text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                {data.map((row) => (
                    <tr key={row.id} className="border-t">
                        <td className="p-2">{row.full_name}</td>
                        <td className="p-2">{row.phone || "-"}</td>
                        <td className="p-2">{row.country_code}</td>

                        <td className="p-2 flex justify-center gap-3">
                            <button
                                onClick={() => onEdit(row)}
                                className="text-blue-600"
                            >
                                <PencilSquareIcon className="h-5 w-5" />
                            </button>

                            <button
                                onClick={() => onDeactivate(row.id)}
                                className="text-red-600"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
