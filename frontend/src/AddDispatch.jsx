import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { Input, Loader, showToast } from "./components/ui";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const formatISO = (date) =>
  date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`
    : "";

export default function DispatchForm() {
  const { batchId } = useParams();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [batchOptions, setBatchOptions] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);

  useEffect(() => {
    if (!batchId) return;

    const loadBatch = async () => {
      try {
        const response = await fetch(`http://localhost:5000/batches/${batchId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const batch = await response.json();

        if (!response.ok) {
          throw new Error(batch.message || "Failed to load batch");
        }

        setSelectedBatch(batch);
        setValue("batchId", `${batch.batchNumber} (${batch.name})`);
      } catch (err) {
        showToast(err.message || "Could not load batch", "error");
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
        `http://localhost:5000/batches/search?query=${encodeURIComponent(value)}&status=certified,partially_dispatched`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to search batches");
      }

      setBatchOptions(result);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      if (!selectedBatch) {
        throw new Error("Please select a valid batch.");
      }

      const payload = {
        buyerName: data.buyerName,
        quantity: {
          value: Number(data.quantity),
          unit: "ml",
        },
        dispatchedAt: formatISO(data.dispatchedAt),
      };

      const response = await fetch(
        `http://localhost:5000/batches/${selectedBatch._id}/dispatch`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create dispatch");
      }

      showToast("Dispatch added successfully!");

      if (batchId) {
        reset({
          batchId: getValues("batchId"),
          buyerName: "",
          quantity: "",
          dispatchedAt: null,
        });
      } else {
        reset();
        setSelectedBatch(null);
        setBatchOptions([]);
      }
    } catch (err) {
      showToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 max-md:gap-0.5">
      <Sidebar />

      <div className="flex flex-1 justify-center items-center min-h-screen m-5 max-md:m-2 overflow-x-hidden">
        <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-[0px_0px_24px_1px_rgba(244,246,245,0.8)]">
          <div className="absolute inset-0 bg-[url('/content/white-flowers.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />

          <div className="relative z-10">
            <h1 className="text-3xl max-md:text-2xl text-white font-prompt p-10 pb-5 max-md:p-5 max-md:pb-3">
              Add Dispatch
            </h1>

            <hr className="text-white shadow-[0px_0px_24px_2px_rgba(255,255,255,1)] mx-5 max-md:mx-3" />

            <div className="flex justify-center my-8 max-md:my-5 px-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md space-y-5 max-md:space-y-4"
              >
                {/* Batch */}

                <label className="text-2xl max-md:text-lg text-white font-prompt">
                  Batch ID
                </label>

                {batchId ? (
                  <Input
                    readOnly
                    className="mt-2 w-full"
                    {...register("batchId", {
                      required: "Batch ID is required",
                    })}
                  />
                ) : (
                  <>
                    <Input
                      list="batchList"
                      placeholder="Search Batch Number..."
                      className="mt-2 w-full"
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

                        setSelectedBatch(selected || null);
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
                  <p className="text-red-400 text-sm bg-black/50 rounded-2xl p-1">
                    {errors.batchId.message}
                  </p>
                )}
                {selectedBatch && (
                  <p className="text-green-300 font-prompt max-md:text-sm">
                    Available Quantity: <strong>{selectedBatch.availableQuantity} ml</strong>
                  </p>
                )}

                {/* Buyer Name */}

                <label className="text-2xl max-md:text-lg text-white font-prompt">
                  Buyer Name
                </label>

                <Input
                  placeholder="Buyer Name"
                  className="mt-2 w-full"
                  {...register("buyerName", {
                    required: "Buyer name is required",
                  })}
                />

                {errors.buyerName && (
                  <p className="text-red-400 text-sm bg-black/50 rounded-2xl p-1">
                    {errors.buyerName.message}
                  </p>
                )}

                {/* Quantity */}

                <label className="text-2xl max-md:text-lg text-white font-prompt">
                  Quantity (ml)
                </label>

                <Input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  max={selectedBatch?.availableQuantity}
                  placeholder="Enter quantity"
                  className="mt-2 w-full"
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: {
                      value: 1,
                      message: "Quantity must be greater than 0",
                    },
                    validate: (value) =>
                      !selectedBatch ||
                      value <= selectedBatch.availableQuantity ||
                      `Only ${selectedBatch.availableQuantity} ml available`,
                  })}
                />

                {errors.quantity && (
                  <p className="text-red-400 text-sm bg-black/50 rounded-2xl p-1">
                    {errors.quantity.message}
                  </p>
                )}

                {/* Dispatch Date */}

                <label className="text-2xl max-md:text-lg text-white font-prompt">
                  Dispatch Date
                </label>

                <Controller
                  control={control}
                  name="dispatchedAt"
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
                      customInput={<Input className="mt-2 w-full" />}
                      wrapperClassName="w-full"
                    />
                  )}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600/80 text-white rounded-2xl text-xl max-md:text-lg font-prompt py-2 mt-6 max-md:mt-4 hover:bg-green-800 hover:scale-105 transition-all disabled:opacity-50"
                >
                  {loading ? <Loader /> : "Add Dispatch"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}