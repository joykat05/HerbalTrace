import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import { Input, Modal, showToast } from "./components/ui";
import EditBatchModal from "./components/EditBatchModal";

export default function Batches() {
    const [batches, setBatches] = useState([]);
    const [search, setSearch] = useState("");
    const [editingBatch, setEditingBatch] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deletingBatch, setDeletingBatch] = useState(null);

    const token = localStorage.getItem("token"); // adjust if stored differently

    // Fetch all batches
    const fetchBatches = async () => {
        try {
            const res = await fetch("http://localhost:5000/batches", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setBatches(data);
        } catch (err) {
            showToast("Something went wrong", "error");
            console.error(err);
        }
    };

    // Search batches
    const searchBatches = async () => {
        try {
            if (!search.trim()) {
                fetchBatches();
                return;
            }

            const res = await fetch(
                 `http://localhost:5000/batches/search/filter?search=${encodeURIComponent(search)}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();
            setBatches(data);
        } catch (err) {
            showToast("Something went wrong", "error");
            console.error(err);
        }
    };
    const deleteBatch = async () => {
    if (!deletingBatch) return;

    try {
        const res = await fetch(
            `http://localhost:5000/batches/${deletingBatch._id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res.ok) {
            throw new Error("Failed to delete batch");
        }

        setIsDeleteOpen(false);
        setDeletingBatch(null);

        fetchBatches();
    } catch (err) {
        showToast("Something went wrong", "error");
        console.error(err);
    }
};

    useEffect(() => {
        fetchBatches();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            searchBatches();
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <>
        <div className="flex gap-4">
            <Sidebar />
            <div className="flex-1 px-10 transition-all duration-300">
                <div className="w-full flex flex-col justify-center items-center m-5">
                    <div className="grid grid-cols-5 gap-2 mt-5  w-full max-w-4xl">
                        <button
                                className="text-2xl text-white bg-green-700/70 w-full col-span-1 font-prompt rounded-2xl
                                hover:animate-pulse hover:bg-pink-700/70 transition-all duration-200 "
                            >
                                Filter
                            </button>

                            <Input
                                placeholder="Search Batches..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="col-span-4 focus:shadow-[0px_0px_24px_5px_rgba(46,255,157,1)]"
                            />
                        </div>

                        {/* TABLE */}

                        <div className="mt-8  w-full max-w-5xl overflow-x-auto rounded-2xl border border-green-700/40 ">
                            <table className="w-full text-white">
                                <thead className="bg-green-700/70 font-prompt">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Batch No.</th>
                                        <th className="px-4 py-3 text-left">Name</th>
                                        <th className="px-4 py-3 text-left">Plant</th>
                                        <th className="px-4 py-3 text-left">Yield</th>
                                        <th className="px-4 py-3 text-left">Available</th>
                                        <th className="px-4 py-3 text-left">Status</th>
                                        <th className="px-4 py-3 text-left">Production Date</th>
                                        <th className="px-4 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {batches.length > 0 ? (
                                        batches.map((batch) => (
                                            <tr
                                                key={batch._id}
                                                className="border-b border-white/50 bg-linear-to-r from-green-700/80 to-gray-700/80 hover:bg-black transition-all font-prompt"
                                            >
                                                <td className="px-4 py-3">
                                                    {batch.batchNumber}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {batch.name}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {batch.plant}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {batch.yield.quantity} {batch.yield.unit}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {batch.availableQuantity}
                                                </td>

                                                <td className="px-4 py-3 capitalize">
                                                    {batch.status}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {new Date(batch.productionDate).toLocaleDateString()}
                                                </td>

                                                <td className="px-4 py-3">
                                                    <div className="flex justify-center gap-3">
                                                        <button
                                                            className="text-green-300 hover:text-green-100 transition-all"
                                                             onClick={() => {
                                                                setEditingBatch(batch);
                                                                setIsEditOpen(true);
                                                            }}
                                                        >
                                                            <span
                                                                className="material-symbols-outlined"
                                                                style={{ fontSize: "28px" }}
                                                            >
                                                                edit
                                                            </span>
                                                        </button>

                                                        <button
                                                            className="text-red-300 hover:text-red-100 transition-all"
                                                             onClick={() => {
                                                                    setDeletingBatch(batch);
                                                                    setIsDeleteOpen(true);
                                                                }}
                                                            >
                                                            <span
                                                                className="material-symbols-outlined"
                                                                style={{ fontSize: "28px" }}
                                                            >
                                                                delete
                                                            </span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="text-center py-6 text-gray-700 bg-white/60 font-prompt"
                                            >
                                                No batches found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <EditBatchModal
                open={isEditOpen}
                batch={editingBatch}
                onClose={() => setIsEditOpen(false)}
                onUpdated={() => {
                    fetchBatches();
                    setIsEditOpen(false);
                }}
            />
            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
            >
                <h2 className="text-2xl font-prompt text-center mb-4">
                    Delete Batch?
                </h2>

                <p className="text-center text-white/90 mb-6">
                    Are you sure you want to delete
                    <br />
                    <span className="font-bold">
                        {deletingBatch?.batchNumber}
                    </span>
                    ?
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setIsDeleteOpen(false)}
                        className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-500 font-prompt transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={deleteBatch}
                        className="px-4 py-2 rounded-xl bg-red-400 hover:bg-red-700 font-prompt transition"
                    >
                        Delete
                    </button>
                </div>
            </Modal>
        </>
    );
}