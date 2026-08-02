import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Sidebar from "./components/sidebar";
import { Loader } from "./components/ui";

export default function AIInsights() {

    const [loading, setLoading] = useState(true);
    const [insights, setInsights] = useState("");
    const [error, setError] = useState("");
    const [question, setQuestion] = useState("");
    const [chat, setChat] = useState([]);
    const [chatLoading, setChatLoading] = useState(false);

    useEffect(() => {

        const generateInsights = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/ai/insights`,
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
                            setChat([
                {
                    role: "assistant",
                    content: data.insights
                }
            ]);

            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);

            }

        };

        generateInsights();
        

    }, []);
const askQuestion = async () => {

    if (!question.trim()) return;

    try {

        const token = localStorage.getItem("token");

        const updatedChat = [
            ...chat,
            {
                role: "user",
                content: question
            }
        ];

        setChat(updatedChat);
        setChatLoading(true);

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/ai/chat`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    question
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        setChat([
            ...updatedChat,
            {
                role: "assistant",
                content: data.reply
            }
        ]);

        setQuestion("");

    } catch (err) {

        setError(err.message);

    } finally {

        setChatLoading(false);

    }
};

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-black/60 min-h-screen p-4 md:p-6 lg:p-8 m-2 rounded-2xl">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-300 mb-4 lg:mb-6">
                        AI Production Insights
                    </h1>

                    {loading && (
                        <div className="flex justify-center mt-12 lg:mt-20">
                           <Loader size={150}/>
                        </div>
                    )}

                    {error && (
                        <div className="text-red-600 p-4 lg:p-8">
                            {error}
                        </div>
                    )}

                    {!loading && !error && (
                        
                        <div className="bg-linear-to-r to-green-500/60 from-black/60 text-white font-prompt rounded-xl shadow-lg p-4 md:p-6 lg:p-8 ">

                                                    {chat.map((msg, index) => (

                                <div
                                    key={index}
                                    className={
                                        msg.role === "assistant"
                                            ? "mb-6 max-w-none"
                                            : "bg-green-900 rounded-lg p-3 lg:p-4 my-4 max-w-[90%] md:max-w-[75%] ml-auto"
                                    }
                                >

                                    {msg.role === "assistant"
                                        ? <div className="prose prose-invert max-w-none prose-sm md:prose-base">
                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                          </div>
                                        : <p className="text-sm md:text-base break-words">{msg.content}</p>
                                    }

                                </div>

                            ))}
                            {chatLoading && (
    <div className="flex justify-center my-6">
        <Loader size={50} />
    </div>
)}
                            <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row gap-3">

                           <input
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    onKeyDown={(e) => {
        if (e.key === "Enter") {
            askQuestion();
        }
    }}
    placeholder="Ask about production..."
    className="flex-1 rounded-lg p-3 text-white bg-black border border-green-500 min-w-0"
/>

<button
    onClick={askQuestion}
    disabled={chatLoading}
    className="bg-green-600 px-5 py-3 sm:py-0 rounded-lg disabled:opacity-50 shrink-0"
>
    Send
</button>

                        </div>
                        </div>

                    )}
                 </div>
            </div>

    );
}