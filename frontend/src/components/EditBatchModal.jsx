import { useEffect, useState } from "react";
import { Input } from "./ui";

export default function EditBatchModal({
    open,
    batch,
    onClose,
    onUpdated,
}) {
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        name: "",
        plant: "",
        quantity: "",
        unit: "",
        productionDate: "",
    });

    useEffect(() => {
        if (!batch) return;

        setFormData({
            name: batch.name || "",
            plant: batch.plant || "",
            quantity: batch.yield?.quantity || "",
            unit: batch.yield?.unit || "",
            productionDate: batch.productionDate
                ? batch.productionDate.slice(0, 10)
                : "",
        });
    }, [batch]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateBatch = async () => {
        try {
            const res = await fetch(
                `http://localhost:5000/batches/${batch._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        plant: formData.plant,
                        yield: {
                            quantity: Number(formData.quantity),
                            unit: formData.unit,
                        },
                        productionDate: formData.productionDate,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to update batch");
            }

            const updated = await res.json();

            onUpdated(updated);
        } catch (err) {
            console.error(err);
            alert("Failed to update batch.");
        }
    };

    if (!open || !batch) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="w-150 rounded-2xl bg-gray-900/80 border border-green-700 p-8 shadow-[0px_0px_24px_5px_rgba(46,255,157,1)]">

                <h2 className="text-3xl font-prompt text-white mb-6">
                    Edit Batch
                </h2>

                <div className="space-y-4">

                    <Input
                        name="name"
                        placeholder="Batch Name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <Input
                        name="plant"
                        placeholder="Plant"
                        value={formData.plant}
                        onChange={handleChange}
                    />

                    <div className="grid grid-cols-2 gap-4">

                        <Input
                            name="quantity"
                            type="number"
                            placeholder="Quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                        />

                        <Input
                            name="unit"
                            disabled
                            placeholder="ml"
                            value={formData.unit}
                            onChange={handleChange}
                        />

                    </div>

                    <Input
                        name="productionDate"
                        type="date"
                        value={formData.productionDate}
                        onChange={handleChange}
                    />

                </div>

                <div className="flex justify-end gap-4 mt-8">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-prompt transition-all"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={updateBatch}
                        className="px-5 py-2 rounded-xl bg-green-700 hover:bg-pink-700 text-white font-prompt transition-all"
                    >
                        Save Changes
                    </button>

                </div>

            </div>
        </div>
    );
}