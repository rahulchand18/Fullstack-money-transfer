import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

type Admin = {
    id: string;
    email: string;
    full_name: string;
    is_active: boolean;
};

type Props = {
    admins: Admin[];
    onEdit: (admin: Admin) => void;
    onDeactivate: (id: string) => void;
};

export default function AdminTable({ admins, onEdit, onDeactivate }: Props) {
    return (
        <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
                <tr>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                {admins.map((admin) => (
                    <tr key={admin.id} className="border-t">
                        <td className="p-2">{admin.full_name}</td>
                        <td className="p-2">{admin.email}</td>
                        <td className="p-2">
                            {admin.is_active ? (
                                <span className="text-green-600">Active</span>
                            ) : (
                                <span className="text-red-600">Inactive</span>
                            )}
                        </td>

                        <td className="p-2 flex justify-center gap-3">
                            {/* Edit */}
                            <button
                                onClick={() => onEdit(admin)}
                                title="Edit"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                <PencilSquareIcon className="h-5 w-5" />
                            </button>

                            {/* Deactivate */}
                            <button
                                onClick={() => onDeactivate(admin.id)}
                                title="Deactivate"
                                className="text-red-600 hover:text-red-800"
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
