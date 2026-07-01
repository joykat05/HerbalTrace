import {ResponsiveContainer , LineChart , Line , Cell, Tooltip, XAxis ,YAxis} from "recharts";
const data = [
  { name: "Jasmine", value: 8 },
  { name: "Lavender", value: 15 },
  { name: "Rose", value: 40 },
  { name: "Neem", value: 60 },
];
export default function YieldChart(){
    return(
        <>
        <div className="bg-linear-to-b from-green-900/80 to-black/80 rounded-2xl">
         <h1 className="text-2xl text-white pt-4 pl-4 font-prompt">Yeild Chart</h1>
         <div className="p-10 h-70"> 
            <ResponsiveContainer>
            <LineChart data = {data}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Line dataKey="value" stroke="#22c55e" strokeWidth={3} />
                <Tooltip labelFormatter={(label) => label}
                contentStyle={{
                    border: "none",
                    borderRadius: "10px",
                }}
                />
                            </LineChart>
        </ResponsiveContainer>
         </div>
        
        </div>
        </>
    );
}