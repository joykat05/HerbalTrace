import {ResponsiveContainer , PieChart , Pie , Cell, Tooltip} from "recharts";
import { useState } from "react";
const data = [
  { name: "Pending", value: 8 },
  { name: "Certificate Ready", value: 15 },
  { name: "Ready to Dispatch", value: 40 },
  { name: "Completed", value: 60 },
];
export default function StatusChart (){
    const COLORS =["#d77dfe","#7db9fe","#d1de3b","#49b63f"];
    const [activeIndex, setActiveIndex] = useState(null);
    
    return(
        <>
        <div className="bg-linear-to-r/srgb from-green-500/70 via-gray-200 to-pink-400/70 dark:from-green-800/70 dark:via-gray-700/70 dark:to-pink-900/70 rounded-2xl font-prompt m-2">
            <p className="pl-4 pt-4 text-2xl text-white leading-tight">Batch Status</p>
            <div className="h-60 grid grid-cols-7">
                <div className="col-span-3">
                    <ResponsiveContainer>
            <PieChart>
                <Pie 
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            onMouseEnter={(_,index) => setActiveIndex(index)}
            onMouseLeave={()=>setActiveIndex(null)}

                >
                    {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                            ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
                </div>
                <div className="col-span-3 text-2xl m-7 mt-10 text-gray-700 space-y-2 dark:text-white">                        
                    {data.map((item, index) => (
                            <div key={index} className={`flex gap-2 justify-between ${(activeIndex === index)?"bg-pink-500/70 rounded-2xl p-2":""}`}>
                                <div className="flex gap-2 justify-center items-center">
                               <div className="w-5 h-5 rounded-3xl"style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <p>{item.name}</p>
                                </div>
                                <p >{item.value}</p>
                            </div>
                            ))}
                </div>
        </div>
        
        </div>
        </>
    );
}