import { useForm } from "react-hook-form";
import { Input, Loader, showToast, Modal, Button } from "./components/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";

export default function Batchform() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const [showSuccessModal, setShowSuccessModal] = useState(false);
const [createdBatch, setCreatedBatch] = useState(null);

const onSubmit = async (data) => {
  try {
    setLoading(true);

    const response = await fetch("http://localhost:5000/batches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT
      },
      body: JSON.stringify({
        name: data.name,
        plant: data.plant,
        yield: {
          quantity: Number(data.yield),
          unit: "ml",
        },
      }),
    });

          let result;

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to create batch");
      }

    setCreatedBatch(result);
    setShowSuccessModal(true);
  } catch (err) {
    showToast(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
    <div className="flex gap-4">
      <Sidebar />
    
      <div className="flex items-center justify-center min-h-screen m-5 flex-1">
        <div className="relative rounded-2xl overflow-hidden max-w-4xl shadow-[0px_0px_24px_8px_rgba(253,139,223,1)]">
          <div className="absolute inset-0 bg-[url('/content/other-pink.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

          <div className="relative z-10">
            <h1 className="text-3xl text-white font-prompt p-10 pb-5">
              Add Batch
            </h1>

            <hr className="text-white shadow-[0px_0px_24px_5px_rgba(255,255,255,1)] w-3xl ml-5 mr-5" />

            <div className="flex justify-center items-center w-full mt-8 mb-8 ">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-md space-y-4"
              >

                {/* Name */}
                <label className="text-2xl text-white font-prompt">
                  Enter Batch name:
                </label>
                <Input
                  placeholder="Batch Name"
                  className="focus:shadow-[0px_0px_24px_8px_rgba(253,139,223,1)] mt-2"
                  {...register("name", {
                    required: "Batch name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name.message}</p>
                )}

                {/* Plant */}
                <label className="text-2xl text-white font-prompt">
                  Enter Plant:
                </label>
                <Input
                  placeholder="Plant"
                  className="focus:shadow-[0px_0px_24px_8px_rgba(253,139,223,1)] mt-2"
                  {...register("plant", {
                    required: "Plant is required",
                  })}
                />
                {errors.plant && (
                  <p className="text-red-400 text-sm">
                    {errors.plant.message}
                  </p>
                )}

                {/* Yield */}
                <label className="text-2xl text-white font-prompt">
                  Enter Yield (ml):
                </label>

                <Input
                  type="number"
                  placeholder="Yield in ml"
                  className="focus:shadow-[0px_0px_24px_8px_rgba(253,139,223,1)] mt-2"
                  {...register("yield", {
                    required: "Yield is required",
                    valueAsNumber: true,
                  })}
                />
                {errors.yield && (
                  <p className="text-red-400 text-sm">
                    {errors.yield.message}
                  </p>
                )}

                {/* Date */}
                <label className="text-2xl text-white font-prompt">
                  Enter Harvest Date:
                </label>
                <Input
                  type="date"
                  className="focus:shadow-[0px_0px_24px_8px_rgba(253,139,223,1)] mt-2"
                  {...register("date")}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pink-500/80 text-white rounded-2xl text-xl font-prompt py-2 mt-4 hover:bg-pink-600 hover:scale-105 transition-all disabled:opacity-50"
                >
                  {loading ? <Loader /> : "Add Batch"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Modal
  isOpen={showSuccessModal}
  onClose={() => setShowSuccessModal(false)}
>
  <div className="p-6 text-center space-y-4">
    <h2 className="text-2xl font-bold">Batch Created!</h2>

    <p>
      Batch <strong>{createdBatch?.batchNumber}</strong> has been created
      successfully.
    </p>

    <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => {
    setShowSuccessModal(false);
    navigate("/dashboard");
  }}
          
          className="
            border border-white
            px-4 py-2
            rounded-lg
            text-white
            hover:bg-white
            hover:text-green-500
            transition
          "
        >
          Later
        </button>

        <button
          onClick={() => navigate(`/certificate/create/${createdBatch._id}`)}
          className="
            bg-white
            text-green-500
            px-4 py-2
            rounded-lg
            font-medium
            hover:bg-green-100
            transition
          "
        >
          Add Certificate
        </button>
      </div>
  </div>
</Modal>
    </>
  );
}