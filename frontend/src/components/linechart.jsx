import {ResponsiveContainer, LineChart, Line, Cell, Tooltip, XAxis, YAxis} from "recharts";

export default function YieldChart({ data }) {
    return (
        <div className="bg-linear-to-b from-green-900/80 to-black/80 rounded-2xl">
            <h1 className="text-2xl text-white pt-4 pl-4 font-prompt">Yield Chart</h1>

            <div className="p-10 h-70 overflow-x-auto md:overflow-x-visible">
                <div className="h-full min-w-[600px] md:min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis dataKey="name" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Line dataKey="value" stroke="#22c55e" strokeWidth={3} />
                            <Tooltip
                                labelFormatter={(label) => label}
                                contentStyle={{
                                    border: "none",
                                    borderRadius: "10px",
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}