import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { Input, Loader, showToast } from "./components/ui";

export default function CertificateForm() {
  const { batchId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
     reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

const [batchOptions, setBatchOptions] = useState([]);
const [selectedBatchId, setSelectedBatchId] = useState(batchId || "");

 useEffect(() => {
  if (!batchId) return;

  const loadBatch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/batches/${batchId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const batch = await response.json();

      setSelectedBatchId(batch._id);

      setValue(
        "batchId",
        `${batch.batchNumber} (${batch.name})`
      );

    } catch (err) {
      console.error(err);
    }
  };

  loadBatch();

}, [batchId, setValue]);

  const searchBatches = async (value) => {
  if (!value.trim()) {
    setBatchOptions([]);
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/batches/search?query=${encodeURIComponent(value)}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to search batches");
    }

    const result = await response.json();

    setBatchOptions(result);
  } catch (err) {
    console.error(err);
  }
};

 const onSubmit = async (data) => {
  try {
    setLoading(true);

    const id = batchId || selectedBatchId;

    if (!id) {
      throw new Error("Please select a batch.");
    }

    const formData = new FormData();

    formData.append("labName", data.labName);
    formData.append("issuedDate", data.issuedDate);
    formData.append("expiryDate", data.expiryDate);

    if (data.pdf?.[0]) {
      formData.append("pdf", data.pdf[0]);
    }

    const response = await fetch(
      `http://localhost:5000/batches/${id}/certificate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Upload failed");
    }

    showToast("Certificate uploaded successfully!");
        if (batchId) {
    reset({
        batchId: getValues("batchId"),
        labName: "",
        issuedDate: "",
        expiryDate: "",
        uploadedAt: "",
        pdf: null,
    });
    } else {
    reset();
    setSelectedBatchId("");
    setBatchOptions([]);
    }

  } catch (err) {
    showToast(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex gap-4">
      <Sidebar />

      <div className="flex flex-1 justify-center items-center min-h-screen m-5">
        <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-[0px_0px_24px_1px_rgba(46,255,126,0.8)]">

          <div className="absolute inset-0 bg-[url('/content/lab.avif')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />

          <div className="relative z-10">

            <h1 className="text-3xl text-white font-prompt p-10 pb-5">
              Add Certificate
            </h1>

            <hr className="text-white shadow-[0px_0px_24px_2px_rgba(255,255,255,1)] mx-5" />

            <div className="flex justify-center my-8">

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-md space-y-5"
              >

                {/* Batch ID */}

                <label className="text-2xl text-white font-prompt">
                  Batch ID
                </label>

                {batchId ? (
                  <Input
                    readOnly
                    className="mt-2"
                    {...register("batchId", {
                      required: "Batch ID is required",
                    })}
                  />
                ) : (
                  <>
                   <Input
                    list="batchList"
                    placeholder="Search Batch Number..."
                    className="mt-2"
                    autoComplete="off"
                    {...register("batchId", {
                        required: "Batch ID is required",
                    })}
                    onChange={(e) => {
                        const value = e.target.value;

                        searchBatches(value);

                        const selected = batchOptions.find(
                        (batch) =>
                            `${batch.batchNumber} (${batch.name})` === value
                        );

                        if (selected) {
                        setSelectedBatchId(selected._id);
                        }
                    }}
                    />

                    <datalist id="batchList">
                    {batchOptions.map((batch) => (
                        <option
                        key={batch._id}
                        value={`${batch.batchNumber} (${batch.name})`}
                        />
                    ))}
                    </datalist>
                  </>
                )}

                {errors.batchId && (
                  <p className="text-red-400 text-sm">
                    {errors.batchId.message}
                  </p>
                )}

                {/* Laboratory */}

                <label className="text-2xl text-white font-prompt">
                  Laboratory Name
                </label>

                <Input
                  placeholder="Lab Name"
                  className="mt-2"
                  {...register("labName", {
                    required: "Laboratory name is required",
                  })}
                />

                {errors.labName && (
                  <p className="text-red-400 text-sm">
                    {errors.labName.message}
                  </p>
                )}

                {/* PDF */}

                <label className="text-2xl text-white font-prompt">
                  Certificate PDF
                </label>

                <Input
                  type="file"
                  accept=".pdf"
                  className="mt-2"
                  {...register("pdf")}
                />

                {/* Issued Date */}

                <label className="text-2xl text-white font-prompt">
                  Issued Date
                </label>

                <Input
                  type="date"
                  className="mt-2"
                  {...register("issuedDate")}
                />

                {/* Expiry Date */}

                <label className="text-2xl text-white font-prompt">
                  Expiry Date
                </label>

                <Input
                  type="date"
                  className="mt-2"
                  {...register("expiryDate")}
                />

                {/* Uploaded At */}

                <label className="text-2xl text-white font-prompt">
                  Uploaded At
                </label>

                <Input
                  type="date"
                  className="mt-2"
                  {...register("uploadedAt")}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600/80 text-white rounded-2xl text-xl font-prompt py-2 mt-6 hover:bg-green-800 hover:scale-105 transition-all disabled:opacity-50"
                >
                  {loading ? <Loader /> : "Upload Certificate"}
                </button>

              </form>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}