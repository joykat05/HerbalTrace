import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function StatusChart({ data }) {
  const COLORS = ["#d77dfe", "#7db9fe", "#d1de3b", "#49b63f"];
  const [activeIndex, setActiveIndex] = useState(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  return (
    <div className="bg-linear-to-r/srgb max-md:bg-linear-to-br/srgb from-green-400/70 via-gray-300 to-gray-300/70 shadow-lg dark:from-green-800/70 dark:via-gray-700/70 dark:to-gray-900/60 rounded-2xl font-prompt m-2 mr-3 overflow-hidden max-md:h-[340px]
    backdrop-blur-xs ">
      <p className="pl-4 pt-4 text-2xl max-lg:text-xl max-md:text-lg text-green-950 font-medium leading-tight dark:text-white">
        Batch Status
      </p>

      <div className="grid grid-cols-7 max-md:grid-cols-1 h-64 max-lg:h-60 max-md:h-[450px]">
        {/* Pie */}
        <div className="col-span-3 max-md:col-span-1 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? 55 : isTablet ? 80 : 100}
                innerRadius={isMobile ? 35 : isTablet ? 50 : 60}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div
          className="
          col-span-3
          max-md:col-span-1

          px-6
          max-lg:px-4
          max-md:px-3

          py-4
          max-md:py-2

          text-2xl
          max-lg:text-xl
          max-md:text-sm

          space-y-2
          dark:text-white
          "
        >
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex items-center ${
                activeIndex === index
                  ? "bg-pink-500/70 rounded-xl p-2 max-md:p-1"
                  : "py-1"
              }`}
            >
              <div className="flex items-center gap-2 max-md:w-[75%] w-full">
                <div
                  className="w-5 h-5 max-lg:w-4 max-lg:h-4 max-md:w-3 max-md:h-3 rounded-full shrink-0"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />

                <p className="">{item.name}</p>
              </div>

              <p className="font-semibold w-8 text-right">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}