import React, { useState, useEffect } from "react";
import axios from "axios";

function AiResume() {
  const [aiResponse, setAiResponse] = useState(
    "AI is analyzing your input, please wait... or refresh the page"
  );
  const [interviewQuestions, setInterviewQuestions] = useState(
    "Fetching interview preparation questions, please wait... or refresh the page"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_PORT}/aiResume`
        );
  
        // Clean up data to remove unwanted characters (* and #)
        const cleanedResume = response.data.data.replace(/[*#]/g, "");
        const cleanedQuestions = response.data.questions.replace(/[*#]/g, "");
  
        // Update state with cleaned data
        setAiResponse(cleanedResume);
        setInterviewQuestions(cleanedQuestions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
    window.scrollTo(0, 0);
  }, []);
  

  return (
    <div className="flex flex-col items-center p-3 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-gray-100 font-sans">
      {/* AI Generated Resume Section */}
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 animate-pulse mb-4">
        AI Generated Resume
      </h1>
      <h3 className="text-xl text-gray-200 mb-3">
        Update your resume accordingly and check your ATS score{" "}
        <a
          href="https://skillsyncer.com/?ref=RxLT-KQO8J"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:text-indigo-700 font-semibold transition-colors duration-300"
        >
          Click Here
        </a>
      </h3>
      <textarea
        name="outputBox"
        rows="20"
        cols="50"
        value={aiResponse}
        readOnly
        className="w-full p-4 text-lg rounded-lg bg-gray-900 text-gray-100 border border-gray-600 shadow-xl resize-none focus:outline-none focus:ring-4 focus:ring-indigo-500 transition duration-300 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-700 hover:scrollbar-thumb-indigo-400"
      />

      {/* Interview Preparation Questions Section */}
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-pulse mt-10 mb-4">
        Interview Preparation Questions
      </h1>
      <textarea
        name="interviewBox"
        rows="20"
        cols="50"
        value={interviewQuestions}
        readOnly
        className="w-full p-4 text-lg rounded-lg bg-gray-900 text-gray-100 border border-gray-600 shadow-xl resize-none focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-700 hover:scrollbar-thumb-green-400"
      />
    </div>
  );
}

export default AiResume;
