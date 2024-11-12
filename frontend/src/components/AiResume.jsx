import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function AiResume() {
    const [aiResponse, setAiResponse] = useState("");

    useEffect(() => {//Used for Running Code After the Component Renders
        const fetchAIData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/aiResume`);
                setAiResponse(response.data.data);  // Store the received data in state
                console.log("Received AI Process Result:");
            } catch (error) {
                console.error("Error fetching AI Process Result:", error);
            }
        };

        fetchAIData();
    }, []);

    return (
        <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-gray-100 font-sans">
  <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 animate-pulse mb-6">
    AI Generated Resume
  </h1>
  <textarea
    name="outputBox"
    rows="20"
    cols="50"
    value={aiResponse || "AI in progress, Please wait..."}
    readOnly
    className="w-full max-w-4xl p-4 text-lg rounded-lg bg-gray-900 text-gray-100 border border-gray-600 shadow-xl resize-none focus:outline-none focus:ring-4 focus:ring-indigo-500 transition duration-300 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-700 hover:scrollbar-thumb-indigo-400"
  />
</div>);
}
export default AiResume;
