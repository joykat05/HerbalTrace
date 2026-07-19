import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Sidebar from "./components/sidebar";
import { Loader } from "./components/ui";

export default function AIInsights() {

    const [loading, setLoading] = useState(true);
    const [insights, setInsights] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {

        const generateInsights = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:5000/api/ai/insights",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({})
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setInsights(data.insights);

            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);

            }

        };

        generateInsights();

    }, []);

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-black/60 min-h-screen p-8 m-2 rounded-2xl">
                    <h1 className="text-4xl font-bold text-green-300 mb-6">
                        AI Production Insights
                    </h1>

                    {loading && (
                        <div className="flex justify-center mt-20">
                           <Loader size={150}/>
                        </div>
                    )}

                    {error && (
                        <div className="text-red-600 p-8">
                            {error}
                        </div>
                    )}

                    {!loading && !error && (
                        
                        <div className="bg-linear-to-r to-green-500/60 from-black/60 text-white font-prompt rounded-xl shadow-lg p-8 ">

                            <ReactMarkdown>
                                {insights}
                            </ReactMarkdown>
                            {/* <div claassname ="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin">
                                giheh</div>    */}
                        </div>

                    )}
                 </div>
            </div>

    );
}
