import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { Loader } from "./components/ui";
import { isAdmin } from "./utils/auth";

const API_BASE = `${import.meta.env.VITE_API_URL}/batches`;

const STATUS_META = {
  pending: {
    label: "Pending",
    badge: "bg-white/10 text-white/70 border border-white/20",
    dot: "bg-white/50",
  },
  certified: {
    label: "Certified",
    badge: "bg-green-900/50 text-green-300 border border-green-500/60",
    dot: "bg-green-400",
  },
  partially_dispatched: {
    label: "Partially dispatched",
    badge: "bg-green-800/40 text-green-200 border border-green-500/40",
    dot: "bg-green-300",
  },
  dispatched: {
    label: "Fully dispatched",
    badge: "bg-green-600/30 text-green-300 border border-green-400/60",
    dot: "bg-green-200",
  },
};

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDateTime(d) {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${meta.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

/* ---------- Tick-line timeline ---------- */

function StepIcon({ state }) {
  if (state === "done") {
    return (
      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-black">
          <path d="M7.629 13.233 3.396 9l-1.396 1.396 5.629 5.629L18.4 5.154 17.004 3.758z" />
        </svg>
      </div>
    );
  }
  if (state === "current") {
    return (
      <div className="w-6 h-6 rounded-full bg-black border-2 border-green-400 flex items-center justify-center shrink-0">
        <div className="w-2 h-2 rounded-full bg-green-400" />
      </div>
    );
  }
  return <div className="w-6 h-6 rounded-full border-2 border-white/15 bg-black shrink-0" />;
}

function TimelineStep({ state, title, meta, children, showLine = true }) {
  return (
    <div className="relative flex gap-4">
      {showLine && (
        <div
          className={`absolute left-[11px] top-6 bottom-[-4px] w-px ${
            state === "done" ? "bg-green-500/40" : "bg-white/10"
          }`}
        />
      )}
      <div className="relative z-10 mt-0.5">
        <StepIcon state={state} />
      </div>
      <div className="flex-1 min-w-0 pb-8">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className={`font-semibold ${state === "pending" ? "text-white/40" : "text-white"}`}>
            {title}
          </div>
          {meta && (
            <div
              className={`text-xs shrink-0 ${
                state === "current" ? "text-white/50 italic" : "text-white/40"
              }`}
            >
              {meta}
            </div>
          )}
        </div>
        {children && <div className="mt-1.5 text-sm text-white/60 space-y-0.5">{children}</div>}
      </div>
    </div>
  );
}

function BatchTimeline({ batch, dispatches }) {
  const isCertified = batch.status !== "pending";
  const certState = isCertified ? "done" : "current";

  // multiple dispatches from one batch -> shown as individual steps, oldest first
  const sortedDispatches = [...dispatches].sort(
    (a, b) => new Date(a.dispatchedAt) - new Date(b.dispatchedAt)
  );

  const showEmptyDispatch = isCertified && sortedDispatches.length === 0;

  return (
    <div>
      <TimelineStep
        state="done"
        title={`${batch.name} · ${batch.batchNumber}`}
        meta={formatDate(batch.productionDate)}
      >
        <div className="mb-1">
          <StatusBadge status={batch.status} />
        </div>
        <div>Plant: {batch.plant}</div>
        <div>
          Yield: {batch.yield?.quantity} {batch.yield?.unit}
        </div>
      </TimelineStep>

      <TimelineStep
        state={certState}
        title="Certified"
        meta={isCertified ? formatDate(batch.certificate?.issuedDate) : "Pending certification"}
        showLine={isCertified}
      >
        {isCertified ? (
          <>
            <div>Lab: {batch.certificate?.labName || "—"}</div>
            <div>Expires {formatDate(batch.certificate?.expiryDate)}</div>
          </>
        ) : (
          <>
      <div>No certificate uploaded yet.</div>
      <AddCertificateButton batch={batch} />
    </>

        )}
      </TimelineStep>

      {showEmptyDispatch && (
        <TimelineStep state="pending" title="Dispatch" meta="Not yet dispatched" showLine={false}>
          <div>This batch hasn't shipped to any buyer.</div>
        </TimelineStep>
      )}

      {isCertified &&
        sortedDispatches.map((d, i) => (
          <TimelineStep
            key={d._id}
            state="done"
            title={`Dispatched to ${d.buyerName}`}
            meta={formatDateTime(d.dispatchedAt)}
            showLine={i !== sortedDispatches.length - 1}
          >
            <div>
              {d.quantity?.value} {d.quantity?.unit}
            </div>
          </TimelineStep>
        ))}
    </div>
  );
}

/* ---------- Record dispatch button ---------- */
function RecordDispatchButton({ batch }) {
  const disabled = batch.status === "pending" || batch.status === "dispatched";
  if (disabled) return null;

  return (
    <div className="mt-2 pt-4 border-t border-white/10 flex items-center justify-between">
      <div className="text-xs text-white/40">Available: {batch.availableQuantity} ml</div>
      <Link
        to={`/dispatch/${batch._id}`}
        className="bg-green-600 hover:bg-green-500 transition-colors px-4 py-2 rounded-lg text-sm font-medium text-white"
      >
        Record a dispatch
      </Link>
    </div>
  );
}
/* ---------- Add certificate button ---------- */
function AddCertificateButton({ batch }) {
  if (batch.status !== "pending") return null;
  if (!isAdmin()) return null; 

  return (
    <Link
      to={`/certificates/${batch._id}`}
      className="mt-2 inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-500 transition-colors px-3 py-1.5 rounded-lg text-xs font-medium text-white"
    >
      Add certificate
    </Link>
  );
}
/* ---------- Search dropdown ---------- */
function BatchSearchDropdown({ onSelect, displayValue }) {
  const [query, setQuery] = useState(displayValue || "");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  // keep input text in sync when a batch gets selected (incl. via /trackbatch/:id)
  useEffect(() => {
    setQuery(displayValue || "");
  }, [displayValue]);

  useEffect(() => {
    let active = true;
    const t = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/search?query=${encodeURIComponent(query)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (active && res.ok) setResults(data);
      } catch (e) {
        // dropdown just stays empty on failure
      }
    }, 250);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [query]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={boxRef} className="relative w-full max-w-sm">
      <input
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        placeholder="Search by batch number or name…"
        className="w-full rounded-lg px-3 py-2 text-sm bg-black border border-green-500/40 text-white placeholder:text-white/30 focus:outline-none focus:border-green-400"
      />

      {open && (
  <div className="absolute z-20 mt-1 w-full bg-black border border-green-500/30 rounded-lg shadow-lg max-h-64 overflow-y-auto">
    {results.length === 0 && (
      <div className="px-3 py-3 text-sm text-white/40">No batches found.</div>
    )}
    {results.map((b) => (
      <button
        key={b._id}
        onClick={() => {
          onSelect(b);
          setOpen(false);
        }}
        className="w-full text-left px-3 py-2 text-sm hover:bg-green-900/30 border-b border-white/5 last:border-b-0"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-white font-medium">{b.batchNumber}</span>
          <StatusBadge status={b.status} />
        </div>
        <div className="text-white/40 text-xs">
          {b.name} · {b.availableQuantity} ml available
        </div>
      </button>
    ))}
  </div>
)}
    </div>
  );
}

/* ---------- Page ---------- */
export default function TrackBatch() {
  const { batchId: routeBatchId } = useParams();
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(routeBatchId || null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [dispatches, setDispatches] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState("");

  // /trackbatch/:batchId -> auto-select that batch
  useEffect(() => {
    setSelectedId(routeBatchId || null);
  }, [routeBatchId]);

  useEffect(() => {
    if (!selectedId) {
      setSelectedBatch(null);
      setDispatches([]);
      return;
    }

    const loadDetail = async () => {
      setLoadingDetail(true);
      setError("");
      try {
        const token = localStorage.getItem("token");

        const [batchRes, dispatchesRes] = await Promise.all([
          fetch(`${API_BASE}/${selectedId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE}/${selectedId}/dispatches`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const batchData = await batchRes.json();
        const dispatchData = await dispatchesRes.json();

        if (!batchRes.ok) throw new Error(batchData.message || "Failed to load batch");
        if (!dispatchesRes.ok) throw new Error(dispatchData.message || "Failed to load dispatches");

        setSelectedBatch(batchData);
        setDispatches(dispatchData);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoadingDetail(false);
      }
    };

    loadDetail();
  }, [selectedId]);

  const handleSelect = (b) => {
    navigate(`/trackbatch/${b._id}`);
  };

  const displayValue = selectedBatch ? `${selectedBatch.batchNumber} — ${selectedBatch.name}` : "";

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-black/60 min-h-screen p-8 m-2 rounded-2xl">
        <h1 className="text-4xl font-bold text-green-300 mb-6 max-md:text-2xl">Batch Tracking</h1>

        <div className="mb-8">
          <BatchSearchDropdown onSelect={handleSelect} displayValue={displayValue} />
        </div>

        {error && <div className="text-red-400 p-4">{error}</div>}

        <div className="bg-black/30 rounded-xl p-6 min-h-[300px] max-w-2xl">
          {loadingDetail && (
            <div className="flex justify-center mt-12">
              <Loader size={80} />
            </div>
          )}

          {!loadingDetail && selectedBatch && (
            <>
              <BatchTimeline batch={selectedBatch} dispatches={dispatches} />
              <RecordDispatchButton batch={selectedBatch} />
            </>
          )}

          {!loadingDetail && !selectedBatch && !error && (
            <div className="text-white/40 text-center mt-12">
              Search for a batch above to see its progress.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}