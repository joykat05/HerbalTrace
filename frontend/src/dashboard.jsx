import Sidebar from "./components/sidebar";
import Card from "./components/card";
import { Link } from "react-router";
import StatusChart from "./components/StatusChart";
import YieldChart from "./components/linechart";
export default function Dashboard(){
    return(
        <>
        <div className="flex gap-4">
        <Sidebar />
        <div className="flex-1 ">
            <div className="flex gap-3">
                  <Card title={
                    <>
                    Total Batches
                    <p className="text-pink-400 text-3xl max-md:text-sm">50</p>
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
                    Total Batches
                    <p className="text-pink-400 text-3xl max-md:text-sm">50</p>
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
                    Total Batches
                    <p className="text-pink-400 text-3xl max-md:text-sm">50</p>
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
               <StatusChart />
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
                   
                    <YieldChart />
                </div>
                
            </div>
        </div>
        </div>
        </>
    );
}