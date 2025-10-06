import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resumeService } from "../../services/api.service";
import FileUpload from "../resume/FileUpload";

export default function InputBox() {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [status, setStatus] = useState("Paste Job Description here and click on submit");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the page from reloading on submit
    // setInputBox(inputValue); // No longer needed with new structure
    setInputValue("");
    setStatus("AI is analyzing your input, please wait...");
    setIsLoading(true); // Show loading animation

    if (inputValue.length > 20) {
      try {
        const response = await resumeService.processJobDescription(inputValue);
        setOutputValue(response);
        setShowButton(true);
        setStatus("Keywords extracted! Ready to build your resume.");
      } catch (error) {
        console.error("Error:", error);
        setStatus("AI processing failed. Please try again.");
      } finally {
        setIsLoading(false); // Hide loading animation
      }
    } else {
      window.alert("Please enter more than 20 characters");
      setIsLoading(false); // Hide loading animation
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-gray-100 font-sans">
      {/* Main Heading */}
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 animate-pulse mb-4 tracking-wide">
        JobWiseCv.ai
      </h1>
      <p className="text-xl text-gray-200 mb-8 max-w-4xl text-center animate-fadeIn delay-100">
        AI-driven resume generation tailored to job descriptions, enhancing your ATS performance.
      </p>

      {/* Form Container */}
      <form
        className="bg-gray-900 shadow-2xl rounded-xl p-10 w-full max-w-4xl transform transition-all"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8">
          {/* Job Description Textarea */}
          {!showButton && (
            <div>
              <label
                htmlFor="inputBox"
                className="block text-2xl font-semibold text-indigo-400 mb-3"
              >
                Job Description
              </label>
              <textarea
                name="inputBox"
                rows="12"
                className="w-full p-6 text-lg text-black rounded-xl border border-gray-600 focus:ring-4 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
            </div>
          )}

          {/* AI Generated Keywords Textarea */}
          {showButton && (
            <div>
              <label
                htmlFor="outputBox"
                className="block text-2xl font-semibold text-indigo-400 mb-3"
              >
                AI Generated Keywords
              </label>
              <textarea
                name="outputBox"
                rows="12"
                className="w-full p-6 text-lg rounded-xl border border-gray-600 bg-gray-800 text-gray-100 outline-none cursor-not-allowed resize-none transition-colors"
                value={outputValue}
                readOnly
              />
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => navigate('/resume', { state: { keywords: outputValue } })}
              >
                Create Resume with AI
              </button>
            </div>
          )}
        </div>

        {/* Loading Animation or Status */}
        <p className="mt-8 text-lg text-gray-200 flex items-center">
          Status:{" "}
          <span className="font-semibold text-lg text-green-600 ml-2">
            {status}
          </span>
          {isLoading && (
            <span className="ml-4 animate-spin rounded-full h-6 w-6 border-t-4 border-indigo-400 border-solid"></span>
          )}
        </p>

        {/* Submit Button */}
        {!showButton && (
          <button
            type="submit"
            className="mt-8 w-full py-4 bg-indigo-600 text-white font-semibold text-xl rounded-xl hover:bg-indigo-700 transition-all duration-300 ease-in-out shadow-lg"
          >
            Submit
          </button>
        )}
      </form>
      {/* File Upload Section */}
     {
      showButton && (
        
        <div className="mt-12 animate-fadeInUp delay-200">
        <FileUpload showButton={showButton} />
      </div>
      )
      
     }
      
      
    </div>
  );
}
