import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Loader } from "./components/ui";



export default function ViewCert() {
  const { batchId } = useParams();
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`http://localhost:5000/batches/${batchId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load batch");
        }

        setBatch(result);
      } catch (err) {
        setError(err.message || "Something went wrong");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBatch();
  }, [batchId]);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";
const handleViewPdf = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/batches/${batch._id}/certificate/pdf`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      showToast("Could not load certificate PDF", "error");
      return;
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    window.open(objectUrl, "_blank");

    // give the new tab a moment to load it before revoking
    setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  } catch (err) {
    showToast("Something went wrong", "error");
    console.error(err);
  }
};
  return (
    <div className="bg-linear-to-r from-green-800 to-gray-800 dark:from-green-800/80 dark:to-gray-800/80 m-5 max-md:m-2 text-white p-5 md:p-8 border-2 border-green-500 rounded-2xl font-prompt">
      <Link
        to="/batches"
        className="inline-flex items-center gap-1 text-white/80 hover:text-white transition mb-4"
      >
        <span className="material-symbols-outlined text-[30px]!">
          arrow_circle_left
        </span>
      </Link>

      {loading && (
        <div className="flex justify-center py-16">
          <Loader />
        </div>
      )}

      {!loading && error && (
        <p className="text-center text-red-300 py-16">{error}</p>
      )}

      {!loading && !error && batch && (
        <>
          <h1 className="text-3xl leading mb-1">
            {batch.batchNumber} {batch.name}
          </h1>

          <p className="text-2xl text-gray-200 flex items-center gap-2 mb-6">
            Certified
            <span
              className="material-symbols-outlined text-amber-300"
              style={{
                filter: "drop-shadow(0 0 6px rgba(251,191,36,0.8))",
              }}
            >
              verified
            </span>
          </p>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="rounded-2xl bg-white/20 border border-white/10 p-4">
              <p className="text-xs uppercase tracking-wide text-white/50 mb-1">
                Laboratory
              </p>
              <p className="text-lg font-medium">
                {batch.certificate?.labName || "—"}
              </p>
            </div>
            <div className="rounded-2xl bg-white/20 border border-white/10 p-4">
              <p className="text-xs uppercase tracking-wide text-white/50 mb-1">
                Issued On
              </p>
              <p className="text-lg font-medium">
                {formatDate(batch.certificate?.issuedDate)}
              </p>
            </div>
            <div className="rounded-2xl bg-white/20 border border-white/10 p-4">
              <p className="text-xs uppercase tracking-wide text-white/50 mb-1">
                Expires On
              </p>
              <p className="text-lg font-medium">
                {formatDate(batch.certificate?.expiryDate)}
              </p>
            </div>
          </div>
          

          {/* Certificate PDF */}
           {/* Certificate PDF */}
<div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex items-center justify-between gap-4">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-red-400 text-[32px]!">
      picture_as_pdf
    </span>
    <div>
      <p className="font-medium">Certificate Document</p>
      <p className="text-sm text-white/50">
        {batch?.certificate?.pdf ? "PDF available" : "No certificate uploaded"}
      </p>
    </div>
  </div>

  {batch?.certificate?.pdf && (
    <button
      onClick={handleViewPdf}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600/80 hover:bg-green-500 transition font-prompt shrink-0"
    >
      <span className="material-symbols-outlined text-[20px]!">
        visibility
      </span>
      View PDF
    </button>
  )}
</div>
          
        </>
      )}
    </div>
  );
}