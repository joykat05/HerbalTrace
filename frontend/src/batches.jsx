import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { Input, Modal, showToast } from "./components/ui";
import EditBatchModal from "./components/EditBatchModal";

const CERT_ELIGIBLE_STATUSES = new Set(["certified", "partially_dispatched", "dispatched"]);
const DISPATCH_ELIGIBLE_STATUSES = new Set(["certified", "partially_dispatched"]);

export default function Batches() {
    const navigate = useNavigate();
    const [batches, setBatches] = useState([]);
    const [search, setSearch] = useState("");
    const [editingBatch, setEditingBatch] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deletingBatch, setDeletingBatch] = useState(null);

    const [selectionMode, setSelectionMode] = useState(null);
    const [selectedBatchId, setSelectedBatchId] = useState(null);

    const token = localStorage.getItem("token");

    const fetchBatches = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/batches`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setBatches(data);
        } catch (err) {
            showToast("Something went wrong", "error");
            console.error(err);
        }
    };

    const searchBatches = async () => {
        try {
            if (!search.trim()) {
                fetchBatches();
                return;
            }
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/batches/search/filter?search=${encodeURIComponent(search)}`,
                { headers: { Authorization: `Bearer ${token}` } }
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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/batches/${deletingBatch._id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete batch");
            setIsDeleteOpen(false);
            setDeletingBatch(null);
            fetchBatches();
            showToast("Batch deleted successfully!", "success");
        } catch (err) {
            showToast("Something went wrong", "error");
            console.error(err);
        }
    };

    useEffect(() => { fetchBatches(); }, []);
    useEffect(() => {
        const timeout = setTimeout(() => { searchBatches(); }, 300);
        return () => clearTimeout(timeout);
    }, [search]);

    const startSelection = (mode) => {
        setSelectionMode(mode);
        setSelectedBatchId(null);
    };

    const cancelSelection = () => {
        setSelectionMode(null);
        setSelectedBatchId(null);
    };

    const confirmSelection = () => {
        if (!selectedBatchId) return;
        if (selectionMode === "certificate") {
            navigate(`/certificates/${selectedBatchId}`);
        } else if (selectionMode === "dispatch") {
            navigate(`/dispatch/${selectedBatchId}`);
        } else if (selectionMode === "track") {
            navigate(`/trackbatch/${selectedBatchId}`);
        } else if (selectionMode === "viewcert") {
            navigate(`/seecert/${selectedBatchId}`);
        }
        cancelSelection();
    };

    const handleRowClick = (batch) => {
        if (selectionMode) {
            setSelectedBatchId(batch._id);
        } 
    };

   const displayedBatches =
    selectionMode === "certificate"
        ? batches.filter((b) => b.status === "pending")
        : selectionMode === "dispatch"
        ? batches.filter((b) => DISPATCH_ELIGIBLE_STATUSES.has(b.status))
        : selectionMode === "viewcert"
        ? batches.filter((b) => CERT_ELIGIBLE_STATUSES.has(b.status))
        : batches;

    const statusLabel = (status) =>
        status === "partially_dispatched" ? "Partially Dispatched"
        : status === "dispatched" ? "Dispatched"
        : status.charAt(0).toUpperCase() + status.slice(1);

    const emptyMessage =
    selectionMode === "certificate"
        ? "No batches awaiting certification."
        : selectionMode === "dispatch"
        ? "No batches available for dispatch."
        : selectionMode === "viewcert"
        ? "No certified batches found."
        : "No batches found.";

    return (
        <>
        <div className="flex gap-4">
            <Sidebar />
            <div className="flex-1 min-w-0 px-10 transition-[width] duration-200">
                <div className="w-full max-w-6xl mx-auto flex flex-col items-center py-5">

                    {/* SEARCH ROW */}
                    <div className="grid grid-cols-5 gap-2 mt-5 w-full max-w-4xl">
                        <button
                            className="text-2xl text-white bg-green-700/70 w-full col-span-1 font-prompt rounded-2xl max-md:text-sm
                            hover:animate-pulse hover:bg-pink-700/70 transition-all duration-200"
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

                    {/* ACTION TOOLBAR */}
                    <div className="flex flex-wrap gap-2 mt-4 w-full max-w-4xl font-prompt">
                        <button
                            onClick={() => navigate("/addbatch")}
                            className="px-4 py-2 rounded-xl bg-green-700/70 hover:bg-green-600 text-white transition"
                        >
                            + Add Batch
                        </button>

                        <button
                            onClick={() => startSelection("certificate")}
                            disabled={!!selectionMode}
                            className={`px-4 py-2 rounded-xl text-white transition ${
                                selectionMode === "certificate"
                                    ? "bg-pink-700 ring-2 ring-pink-300"
                                    : "bg-gray-700/70 hover:bg-gray-600"
                            } disabled:opacity-40`}
                        >
                            + Add Certificate
                        </button>

                        <button
                            onClick={() => startSelection("dispatch")}
                            disabled={!!selectionMode}
                            className={`px-4 py-2 rounded-xl text-white transition ${
                                selectionMode === "dispatch"
                                    ? "bg-pink-700 ring-2 ring-pink-300"
                                    : "bg-gray-700/70 hover:bg-gray-600"
                            } disabled:opacity-40`}
                        >
                            + Add Dispatch
                        </button>

                        <button
                            onClick={() => startSelection("viewcert")}
                            disabled={!!selectionMode}
                            className={`px-4 py-2 rounded-xl text-white transition ${
                                selectionMode === "viewcert"
                                    ? "bg-pink-700 ring-2 ring-pink-300"
                                    : "bg-gray-700/70 hover:bg-gray-600"
                            } disabled:opacity-40`}
                        >
                            View Certificate
                        </button>

                        <button
                            onClick={() => startSelection("track")}
                            disabled={!!selectionMode}
                            className={`px-4 py-2 rounded-xl text-white transition ${
                                selectionMode === "track"
                                    ? "bg-pink-700 ring-2 ring-pink-300"
                                    : "bg-gray-700/70 hover:bg-gray-600"
                            } disabled:opacity-40`}
                        >
                            Track Batch
                        </button>
                    </div>

                    {/* SELECTION BANNER */}
                   {/* SELECTION BANNER */}
{selectionMode && (
    <div className="w-full max-w-4xl mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-pink-900/40 border border-pink-500/50 rounded-xl px-4 py-3 font-prompt text-white">
        <span className="text-sm md:text-base break-words">
            Select a batch for{" "}
            {selectionMode === "certificate" ? "Add Certificate"
                : selectionMode === "dispatch" ? "Add Dispatch"
                : selectionMode === "viewcert" ? "View Certificate"
                : "Track Batch"}
        </span>
        <div className="flex gap-2 shrink-0 self-end md:self-auto">
            <button
                onClick={cancelSelection}
                className="px-3 py-1.5 rounded-lg bg-gray-600 hover:bg-gray-500 transition whitespace-nowrap"
            >
                Cancel
            </button>
            <button
                onClick={confirmSelection}
                disabled={!selectedBatchId}
                className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-40 transition whitespace-nowrap"
            >
                Continue
            </button>
        </div>
    </div>
)}

                    {/* TABLE - desktop */}
                    <div className="mt-8 w-full max-w-5xl overflow-x-auto rounded-2xl border border-green-700/40 hidden md:block">
                        <table className="w-full text-white">
                            <thead className="bg-green-700/70 font-prompt">
                                <tr>
                                    {selectionMode && <th className="px-3 py-3 w-10"></th>}
                                    <th className="px-4 py-3 text-left">Batch No.</th>
                                    <th className="px-4 py-3 text-left">Name</th>
                                    <th className="px-4 py-3 text-left">Plant</th>
                                    <th className="px-4 py-3 text-left">Yield</th>
                                    <th className="px-4 py-3 text-left">Available</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Production Date</th>
                                    <th className="px-4 py-3 text-center sticky right-0 bg-green-700/70">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedBatches.length > 0 ? (
                                    displayedBatches.map((batch) => (
                                        <tr
                                            key={batch._id}
                                            onClick={() => handleRowClick(batch)}
                                            className={`border-b border-white/50 bg-linear-to-r from-green-700/80 to-gray-700/80 hover:bg-black transition-all font-prompt cursor-pointer ${
                                                selectedBatchId === batch._id ? "outline outline-2 outline-pink-400" : ""
                                            }`}
                                        >
                                            {selectionMode && (
                                                <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                                                    <input
                                                        type="radio"
                                                        name="batch-select"
                                                        checked={selectedBatchId === batch._id}
                                                        onChange={() => setSelectedBatchId(batch._id)}
                                                    />
                                                </td>
                                            )}
                                            <td className="px-4 py-3">{batch.batchNumber}</td>
                                            <td className="px-4 py-3">{batch.name}</td>
                                            <td className="px-4 py-3">{batch.plant}</td>
                                            <td className="px-4 py-3">{batch.yield.quantity} {batch.yield.unit}</td>
                                            <td className="px-4 py-3">{batch.availableQuantity}</td>
                                            <td className="px-4 py-3 capitalize whitespace-normal wrap-break-word">
                                                {statusLabel(batch.status)}
                                            </td>
                                            <td className="px-4 py-3">
                                                {new Date(batch.productionDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 sticky right-0 bg-gray-800/90" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex justify-center gap-3">
                                                    <button
                                                        className="text-green-300 hover:text-green-100 transition-all"
                                                        onClick={() => { setEditingBatch(batch); setIsEditOpen(true); }}
                                                    >
                                                        <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>edit</span>
                                                    </button>
                                                    <button
                                                        className="text-red-300 hover:text-red-100 transition-all"
                                                        onClick={() => { setDeletingBatch(batch); setIsDeleteOpen(true); }}
                                                    >
                                                        <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={selectionMode ? 9 : 8} className="text-center py-6 text-gray-700 bg-white/60 font-prompt">
                                            {emptyMessage}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* CARDS - mobile/tablet */}
                    <div className="mt-8 w-full flex flex-col gap-3 md:hidden">
                        {displayedBatches.length > 0 ? displayedBatches.map((batch) => (
                            <div
                                key={batch._id}
                                onClick={() => handleRowClick(batch)}
                                className={`rounded-2xl border border-green-700/40 bg-linear-to-r from-green-700/80 to-gray-700/80 p-4 font-prompt text-white ${
                                    selectedBatchId === batch._id ? "outline outline-2 outline-pink-400" : ""
                                }`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-start gap-2">
                                        {selectionMode && (
                                            <input
                                                type="radio"
                                                name="batch-select-mobile"
                                                checked={selectedBatchId === batch._id}
                                                onChange={() => setSelectedBatchId(batch._id)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="mt-1.5"
                                            />
                                        )}
                                        <div>
                                            <p className="text-lg font-bold">{batch.batchNumber}</p>
                                            <p className="text-sm text-white/80">{batch.name}</p>
                                        </div>
                                    </div>
                                    {!selectionMode && (
                                        <div className="flex gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                                            <button className="text-green-300 hover:text-green-100" onClick={() => { setEditingBatch(batch); setIsEditOpen(true); }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: "26px" }}>edit</span>
                                            </button>
                                            <button className="text-red-300 hover:text-red-100" onClick={() => { setDeletingBatch(batch); setIsDeleteOpen(true); }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: "26px" }}>delete</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-y-2 text-sm">
                                    <div className="text-white/60">Plant</div>
                                    <div>{batch.plant}</div>
                                    <div className="text-white/60">Yield</div>
                                    <div>{batch.yield.quantity} {batch.yield.unit}</div>
                                    <div className="text-white/60">Available</div>
                                    <div>{batch.availableQuantity}</div>
                                    <div className="text-white/60">Status</div>
                                    <div className="capitalize">{statusLabel(batch.status)}</div>
                                    <div className="text-white/60">Production Date</div>
                                    <div>{new Date(batch.productionDate).toLocaleDateString()}</div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-6 text-gray-700 bg-white/60 rounded-2xl font-prompt">
                                {emptyMessage}
                            </div>
                        )}
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
                    showToast("Batch updated successfully!", "success");
                }}
            />

            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                <h2 className="text-2xl font-prompt text-center mb-4">Delete Batch?</h2>
                <p className="text-center text-white/90 mb-6">
                    Are you sure you want to delete
                    <br />
                    <span className="font-bold">{deletingBatch?.batchNumber}</span>?
                </p>
                <div className="flex justify-end gap-3">
                    <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-500 font-prompt transition">
                        Cancel
                    </button>
                    <button onClick={deleteBatch} className="px-4 py-2 rounded-xl bg-red-400 hover:bg-red-700 font-prompt transition">
                        Delete
                    </button>
                </div>
            </Modal>
        </div>
        </>
    );
}