import { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import AdminFormModal from "../components/AdminFormModal";
import { adminApi } from "../api/admin.api";
import { showSuccess, showError } from "../utils/toast";
import Header from "../components/Header";

export default function Dashboard() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState<any>(null);

    const loadAdmins = async () => {
        setLoading(true);
        const res = await adminApi.getAll();
        setAdmins(res.data.data);
        setLoading(false);
    };

    useEffect(() => {
        loadAdmins();
    }, []);

    const handleCreate = async (data: any) => {
        try {
            await adminApi.create(data);
            showSuccess("Admin created successfully");
            setOpenModal(false);
            loadAdmins();
        } catch (err: any) {
            showError(err.response?.data?.message || "Failed to create admin");
        }
    };

    const handleUpdate = async (data: any) => {
        try {
            await adminApi.update(editingAdmin.id, {
                full_name: data.full_name,
            });
            showSuccess("Admin updated successfully");
            setEditingAdmin(null);
            loadAdmins();
        } catch (err: any) {
            showError(err.response?.data?.message || "Failed to update admin");
        }
    };
    const handleDeactivate = async (id: string) => {
        try {
            await adminApi.deactivate(id);
            showSuccess("Admin deactivated successfully");
            loadAdmins();
        } catch (err: any) {
            showError(err.response?.data?.message || "Failed to deactivate admin");
        }
    };


    return (

        <div className="min-h-screen bg-gray-100 p-6">
            <Header />

            <div className="max-w-5xl mx-auto my-3 bg-white p-6 rounded shadow">
                <div className="flex justify-between mb-4">
                    <h1 className="text-xl font-semibold">User Management</h1>
                    <button
                        onClick={() => setOpenModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Add User
                    </button>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <AdminTable
                        admins={admins}
                        onEdit={setEditingAdmin}
                        onDeactivate={handleDeactivate}
                    />
                )}
            </div>

            <AdminFormModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleCreate}
            />

            <AdminFormModal
                open={!!editingAdmin}
                onClose={() => setEditingAdmin(null)}
                onSubmit={handleUpdate}
                initialData={editingAdmin}
            />
        </div>
    );
}
