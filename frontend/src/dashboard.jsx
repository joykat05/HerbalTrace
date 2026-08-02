import Sidebar from "./components/sidebar";
import Card from "./components/card";
import { Link } from "react-router";
import StatusChart from "./components/StatusChart";
import YieldChart from "./components/linechart";
import { useEffect, useState, useRef } from "react";
import { Loader } from "./components/ui";
import { useNavigate } from "react-router";
import { showToast } from "./components/ui";
import { isAdmin } from "./utils/auth";

export default function Dashboard(){
    const [dashboard, setDashboard] = useState(null);
    const [alertsExpanded, setAlertsExpanded] = useState(() => {
        const stored = localStorage.getItem("alertsExpanded");
        return stored === null ? true : stored === "true"; // default: expanded
      });

      const toggleAlerts = () => {
        const updated = !alertsExpanded;
        setAlertsExpanded(updated);
        localStorage.setItem("alertsExpanded", String(updated));
      };

    const [showAiFloater, setShowAiFloater] = useState(false);
    const aiCardRef = useRef(null);

    const navigate = useNavigate();

   const hasFetched = useRef(false);

useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchDashboard = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
            setTimeout(() => {
                navigate("/login");
            }, 2000);
            return;
        }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/batches/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch dashboard");
            }

            const data = await response.json();
            setDashboard(data);
            if (data.alerts?.length > 0) {
              showToast(
                `${data.alerts.length} batch${data.alerts.length > 1 ? "es" : ""} showing low yield`,
                "warning"
              );
            }

        } catch (err) {
            console.error(err);
        }
    };

    fetchDashboard();
}, []);

    // Watch AI card visibility to toggle the floater
    useEffect(() => {
      if (!aiCardRef.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setShowAiFloater(!entry.isIntersecting);
        },
        { threshold: 0.3 }
      );

      observer.observe(aiCardRef.current);

      return () => observer.disconnect();
    }, [dashboard]);

        if (!dashboard) {
            return (<div className="flex justify-center my-4 transition-all duration-150 bg-white/90 rounded-4xl m-5 h-screen">
            <Loader size={200}/>
          </div>);
        }else{
           const hasBatches = dashboard.kpis.totalBatches > 0;
           const admin = isAdmin();

          const dispatchedCount = dashboard.statusChart?.reduce((sum, s) => {
            return (s.name === "Partially Dispatched" || s.name === "Completely Dispatched")
              ? sum + s.value
              : sum;
          }, 0) || 0;

    return(
        <>
        <div className="flex gap-4 max-md:gap-0.5">
        <Sidebar />
        <div className="flex-1 overflow-x-hidden">
            <div className="rounded-2xl bg-linear-to-r backdrop-blur-sm from-green-200/200 via-white to-green-50/200 dark:from-green-900/150 dark:via-green-900 dark:to-gray-700/200 p-8 ml-2 mr-3 mt-5 mb-5 max-lg:ml-1 max-md:ml-1 max-md:p-3">
            <p className="text-green-900 dark:text-green-300 text-4xl max-md:text-2xl font-prompt">Welcome, {dashboard.user.name}</p>
            <div className="flex justify-between max-md:flex-col max-md:gap-2 text-green-800 dark:text-green-300 text-2xl max-md:text-sm font-prompt">
                 <p >Organization: {dashboard.user.organization}</p>
            <p >{dashboard.user.role}</p>
            </div>

            </div>
                           {admin && dashboard.alerts?.length > 0 && (
  <div className="mx-2 mb-4 rounded-xl border border-amber-400/30 bg-amber-200/60 backdrop-blur-2xl p-4 font-prompt">
    <button
      onClick={toggleAlerts}
      className="flex w-full items-center justify-between font-semibold text-amber-700"
    >
      <span className="flex items-center gap-2">
        <span className="material-symbols-outlined">warning</span>
        Low Yield Alert{dashboard.alerts.length > 1 ? "s" : ""} ({dashboard.alerts.length})
      </span>
      <span className="material-symbols-outlined transition-transform duration-200"
            style={{ transform: alertsExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
        expand_more
      </span>
    </button>

    {alertsExpanded && (
      <ul className="mt-3 space-y-1 text-sm text-amber-700 dark:text-amber-300">
        {dashboard.alerts.slice(0, 5).map((a) => (
          <li key={a.batchId}>
            {a.batchNumber} ({a.plant}) — {a.yield}ml, {a.percentBelowAverage}% below average
          </li>
        ))}
      </ul>
    )}
  </div>
)}
            <div className="flex gap-3 mr-0 max-md:mr-2">
                  <Card title={
                    <>
                    <p className="max-md:text-sm">Total Batches</p>
                    <p className="text-pink-400 text-3xl max-md:text-sm">{dashboard.kpis.totalBatches}</p>
                    </>
                }>
                </Card>
                {admin ? (
                <Card title={
                    <>
                    Average Yield
                    <p className="text-pink-400 text-3xl max-md:text-sm">{dashboard.kpis.averageYield} ml</p>
                    </>
                }
                >
                </Card>
              ) : (
                <Card title={
                    <>
                    Dispatches
                    <p className="text-pink-400 text-3xl max-md:text-sm">{dispatchedCount}</p>
                    </>
                }
                >
                </Card>
              )}
                  <Card title={
                    <>
                    Available Qty
                    <p className="text-pink-400 text-3xl max-md:text-sm">{dashboard.kpis.availableQuantity} ml</p>
                    </>
                }
                >
                </Card>
            </div>
            {hasBatches ? (
              <>
            <div className="w-full overflow-hidden mt-4">
               <StatusChart data={dashboard.statusChart}/>
            </div>
               {admin && (
            <div className="grid grid-cols-7 gap-4 m-4 max-md:grid-cols-1 md:grid-cols-2 xl:grid-cols-7">
 <div
    ref={aiCardRef}
    onClick={() => navigate("/ai-insights")}
    className="col-span-2 cursor-pointer rounded-2xl
               bg-gradient-to-br from-black/90 to-green-900/90
               border border-white/10
               shadow-lg shadow-black/20
               p-6 font-prompt
               transition-all duration-300
               hover:-translate-y-1
               hover:border-emerald-400/40
               hover:shadow-emerald-500/20
               relative overflow-hidden
               max-md:col-span-1 md:col-span-1 xl:col-span-2 max-md:p-4 max-md:text-xl max-md:mt-4"
  >
    {/* Soft Glow */}
    <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-emerald-400/10 blur-3xl" />

    {/* Header */}
    <div className="relative flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/15">
        <span
          className="material-symbols-outlined text-emerald-300"
          style={{ fontSize: "30px" }}
        >
          psychiatry
        </span>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-white">
          AI Insights
        </h2>
        <p className="text-sm text-gray-300">
          Essential Oil Analytics
        </p>
      </div>
    </div>

    {/* Description */}
    <div className="relative mt-8">
           
      <p className="text-sm leading-6 text-gray-200">
        Generate an AI-powered report with production summaries, top-performing plants, yield observations, and production trends.
      </p>
    </div>

    {/* CTA */}
    <div className="relative mt-3 flex items-center justify-between border-t border-white/10 pt-4">
      <span className="text-emerald-300 font-medium">
        Generate Report
      </span>

      <span className="material-symbols-outlined text-emerald-300 transition-transform duration-300 hover:translate-x-1">
        arrow_forward
      </span>
    </div>
  </div>
                <div className="col-span-5 max-md:col-span-1 md:col-span-5 lg:col-span-5 max-md:ml-0">
                   
                    <YieldChart data={dashboard.yieldChart} />
                </div>
                
            </div>
             )}
            </>
            ) : (
                              <div className="flex flex-col items-center justify-center text-center gap-3 mt-10 mb-10 mx-4 p-10 rounded-2xl border border-dashed border-green-300 dark:border-green-700 bg-white/80 dark:bg-gray-800/40">
                    <span className="material-symbols-outlined text-green-400" style={{ fontSize: "48px" }}>
                        science
                    </span>
                    {admin ? (
                      <>
                    <p className="text-2xl font-prompt text-green-900 dark:text-green-300">
                        No batches yet
                    </p>
                    <p className="text-md text-gray-500 dark:text-gray-400 max-w-md font-prompt">
                        Once you start adding batches, your production charts and insights will show up here.
                    </p>
                    <Link
                        to="/addbatch"
                        className="mt-2 px-4 py-2 rounded-xl bg-green-600 text-white text-xl hover:bg-green-700 transition-colors font-prompt"
                    >
                        Add your first batch
                    </Link>
                    </>
                    ) : (
                       <>
            <p className="text-2xl font-prompt text-green-900 dark:text-green-300">
                No batches yet
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400 max-w-md font-prompt">
                Your organization has no batches yet. Please wait for an admin to add one.
            </p>
          </>
        )}
                </div>
            )}

            {admin && showAiFloater && (
              <button
                onClick={() =>
                  aiCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
                }
                className="fixed bottom-6 right-6 z-40 flex items-center gap-2
                           rounded-full bg-gradient-to-br from-black/90 to-green-900/90
                           border border-emerald-400/30 shadow-lg shadow-black/30
                           px-5 py-3 font-prompt text-white
                           hover:-translate-y-1 hover:border-emerald-400/60
                           transition-all duration-300 animate-bounce-slow"
              >
                <span className="material-symbols-outlined text-emerald-300">psychiatry</span>
                <span className="hidden sm:inline">AI Insights</span>

              </button>
            )}
        </div>
        </div>
        </>
    );
}
}