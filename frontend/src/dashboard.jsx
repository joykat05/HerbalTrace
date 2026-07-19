import Sidebar from "./components/sidebar";
import Card from "./components/card";
import { Link } from "react-router";
import StatusChart from "./components/StatusChart";
import YieldChart from "./components/linechart";
import { useEffect, useState } from "react";
import { Loader } from "./components/ui";
import { useNavigate } from "react-router";
export default function Dashboard(){
    const [dashboard, setDashboard] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
    const fetchDashboard = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
            setTimeout(() => {
                navigate("/login");
            }, 2000); // show loader for 2 seconds
            return;
        }

            const response = await fetch("http://localhost:5000/batches/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch dashboard");
            }

            const data = await response.json();
            setDashboard(data);

        } catch (err) {
            console.error(err);
        }
    };

        fetchDashboard();
    }, []);
        if (!dashboard) {
            return (<div className="flex justify-center my-4 transition-all duration-150 bg-white/90 rounded-4xl m-5 h-screen">
            <Loader size={200}/>
          </div>);
        }else{
    return(
        <>
        <div className="flex gap-4">
        <Sidebar />
        <div className="flex-1 ">
            <div className="rounded-2xl bg-linear-to-r from-green-300/80 via-green-300/80 to-white/80 dark:from-green-900/80 dark:via-green-900/80 dark:to-gray-700/80 p-8 m-5">
            <p className="text-green-700 dark:text-green-300 text-4xl font-prompt">Welcome, {dashboard.user.name}</p>
            <div className="flex justify-between text-green-700 dark:text-green-300 text-2xl font-prompt">
                 <p >Orgaization: {dashboard.user.organization}</p>
            <p>{dashboard.user.role}</p>
            </div>
           
            </div>
            <div className="flex gap-3">
                  <Card title={
                    <>
                    Total Batches
                    <p className="text-pink-400 text-3xl max-md:text-sm">{dashboard.kpis.totalBatches}</p>
                    </>
                }
                description={
                    <>
                    <Link to="/batches" className="hover:text-green-600 text-gray-600">Veiw all Batches</Link>
                    </>
                }>
                </Card>
                <Card title={
                    <>
                    Average Yield
                    <p className="text-pink-400 text-3xl max-md:text-sm">{dashboard.kpis.averageYield} ml</p>
                    </>
                }
                description={
                    <>
                    <Link to="/" className="hover:text-green-600 text-gray-600">Veiw all Batches</Link>
                    </>
                }>
                </Card>
                  <Card title={
                    <>
                    Available Qty
                    <p className="text-pink-400 text-3xl max-md:text-sm">{dashboard.kpis.availableQuantity} ml</p>
                    </>
                }
                description={
                    <>
                    <Link to="/" className="hover:text-green-600 text-gray-600">Veiw all Batches</Link>
                    </>
                }>
                </Card>
            </div>
            <div>
               <StatusChart data={dashboard.statusChart}/>
            </div>
            <div className="grid grid-cols-7 gap-2 m-4">
 <div
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
               relative overflow-hidden"
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
                <div className="col-span-5 ml-2">
                   
                    <YieldChart data={dashboard.yieldChart} />
                </div>
                
            </div>
        </div>
        </div>
        </>
    );}
}