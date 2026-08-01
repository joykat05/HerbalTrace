import { useForm, Controller } from "react-hook-form";
import { Input, Loader, showToast, Modal, Button } from "./components/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Batchform() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const [showSuccessModal, setShowSuccessModal] = useState(false);
const [createdBatch, setCreatedBatch] = useState(null);

const onSubmit = async (data) => {
  try {
    setLoading(true);

    const response = await fetch(`${import.meta.env.VITE_API_URL}batches`, {
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
    <div className="flex gap-4 max-md:gap-0.5">
      <Sidebar />

      <div className="flex items-center justify-center min-h-screen m-5 max-md:m-2 flex-1 overflow-x-hidden">
        <div className="relative rounded-2xl overflow-hidden w-full max-w-3xl shadow-[0px_0px_24px_1px_rgba(253,139,223,1)]">
          <div className="absolute inset-0 bg-[url('/content/other-pink.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />

          <div className="relative z-10">
            <h1 className="text-3xl max-md:text-2xl text-white font-prompt p-10 pb-5 max-md:p-5 max-md:pb-3">
              Add Batch
            </h1>

            <hr className="text-white shadow-[0px_0px_24px_5px_rgba(255,255,255,1)] w-[calc(100%-2.5rem)] ml-5 mr-5 max-md:w-[calc(100%-1.5rem)] max-md:ml-3 max-md:mr-3" />

            <div className="flex justify-center items-center w-full mt-8 mb-8 max-md:mt-5 max-md:mb-5 px-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md space-y-4"
              >

                {/* Name */}
                <label className="text-2xl max-md:text-lg text-white font-prompt">
                  Enter Batch name:
                </label>
                <Input
                  placeholder="Batch Name"
                  className="focus:shadow-[0px_0px_24px_5px_rgba(253,139,223,1)] mt-2"
                  {...register("name", {
                    required: "Batch name is required",
                  })}
                />
                {errors.name && (
                 <p className="text-red-400 text-sm bg-black/50 rounded-2xl p-1">{errors.name.message}</p>
                )}

                {/* Plant */}
                <label className="text-2xl max-md:text-lg text-white font-prompt">
                  Enter Plant:
                </label>
                <Input
                  placeholder="Plant"
                  className="focus:shadow-[0px_0px_24px_5px_rgba(253,139,223,1)] mt-2"
                  {...register("plant", {
                    required: "Plant is required",
                  })}
                />
                {errors.plant && (
                  <p className="text-red-400 text-sm bg-black/50 rounded-2xl p-1">
                    {errors.plant.message}
                  </p>
                )}

                {/* Yield */}
                <label className="text-2xl max-md:text-lg text-white font-prompt">
                  Enter Yield (ml):
                </label>

                <Input
                  type="number"
                  placeholder="Yield in ml"
                  onWheel={(e) => e.target.blur()}
                  className="focus:shadow-[0px_0px_24px_5px_rgba(253,139,223,1)] mt-2"
                  {...register("yield", {
                    required: "Yield is required",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Quantity must be greater than 0",
                    },
                  })}
                />
                {errors.yield && (
                  <p className="text-red-400 text-sm bg-black/50 rounded-2xl p-1">
                    {errors.yield.message}
                  </p>
                )}

{/* Date */}
<label className="text-2xl max-md:text-lg text-white font-prompt">
  Enter Harvest Date:
</label>
<Controller
  control={control}
  name="date"
  render={({ field }) => (
<DatePicker
  selected={field.value}
  onChange={(date) => field.onChange(date)}
  placeholderText="dd-mm-yyyy"
  dateFormat="dd-MM-yyyy"
  withPortal
  isClearable
  showYearDropdown
  scrollableYearDropdown
  yearDropdownItemNumber={30}
  showMonthDropdown
  customInput={
    <Input className="focus:shadow-[0px_0px_24px_5px_rgba(253,139,223,1)] mt-2 w-full" />
  }
  wrapperClassName="w-full"
/>
  )}
/>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pink-500/80 text-white rounded-2xl text-xl max-md:text-lg font-prompt py-2 mt-4 hover:bg-pink-600 hover:scale-105 transition-all disabled:opacity-50"
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
  <div className="p-6 max-md:p-4 text-center space-y-4">
    <h2 className="text-2xl max-md:text-xl font-bold">Batch Created!</h2>

    <p className="max-md:text-sm">
      Batch <strong>{createdBatch?.batchNumber}</strong> has been created
      successfully.
    </p>

    <div className="flex justify-center gap-4 max-md:gap-2 mt-6 max-md:flex-col">
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
          onClick={() => navigate(`/certificates/${createdBatch._id}`)}
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