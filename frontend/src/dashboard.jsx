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
                <div className="col-span-2 bg-linear-to-b from-black/70 to-green-900  rounded-2xl text- font-prompt p-4 inset-shadow-sm inset-shadow-green-300">
                    <div className=" text-white flex gap-2 items-center justify-center">
                        <span className="material-symbols-outlined  animate-pulse" style={{fontSize : "40px"}}>
                        wand_stars
                    </span>
                    <h1 className="text-3xl">AI Insights</h1>
                    </div>
                    <br/>
                    <p className="text-xl
                              text-green-300
                            leading-relaxed ">
                         ✨ 2 batches have unusually low yield.
                    </p>
                    <p className="text-xl
                              text-green-300
                            leading-relaxed ">
                        ✨ One plant shows a declining yield trend.
                    </p>
                    <div className="text-lg hover:text-green-300 text-white mt-5 flex justify-center items-center gap-2">
                        <p>More detailed analysis</p>
                         <span className="material-symbols-outlined" style={{fontSize : "40px"}}>
                        arrow_circle_right
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