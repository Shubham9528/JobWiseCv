import React, { useState } from "react";
import axios from "axios";
import pdfToText from "react-pdftotext";
import { useNavigate } from "react-router-dom";

function FileUpload({ showButton }) {
  const [extractedText, setExtractedText] = useState(""); // State to store extracted text
  const [isProcessing, setIsProcessing] = useState(false); // Show processing animation
  const [file, setFile] = useState(false); // Check if file is uploaded
  const navigate = useNavigate();

  function extractText(event) {
    const file = event.target.files[0]; // Get the file from the input field
    if (file && file.type === "application/pdf") {
      setFile(true);
      pdfToText(file)
        .then((text) => {
          setExtractedText(text); // Update state with extracted text
        })
        .catch((error) => {
          alert("Failed to extract text from PDF:", error);
        });
    } else {
      alert("Please upload a valid PDF file.");
    }
  }

  const sendTextToServer = async () => {
    try {
      setIsProcessing(true); // Show processing animation
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/resumeData`, {
        data: extractedText, // Send extracted text to the backend
      });

      if (response.data.status === "success") {
        navigate("/aiResume"); // Redirect on success
      } else {
        setIsProcessing(false); // Stop processing on failure
        alert("AI processing failed. Please try again.");
      }
    } catch (error) {
      setIsProcessing(false); // Stop processing if an error occurs
      console.error("Error sending text to the server:", error);
      alert("Error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-6 w-full max-w-2xl">
      {showButton && (
        <>
          <label
            htmlFor="myfile"
            className="block text-lg font-semibold text-indigo-400 mb-2"
          >
            Upload Resume
          </label>

          {/* Warning Sign */}
          <div className="flex items-center mb-4 text-yellow-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 9v2M12 15h.01M21 3L3 21" />
            </svg>
            <span className="text-sm font-medium">
              Please upload a PDF file only.
            </span>
          </div>

          <input
            type="file"
            id="myfile"
            name="myfile"
            className="block w-full text-base text-gray-100 border border-gray-600 rounded-md p-3 mb-4 cursor-pointer focus:ring-4 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            accept=".pdf"
            placeholder="Upload"
            onChange={extractText}
          />

          {isProcessing ? (
            <div className="flex flex-col items-center">
              <div className="loader border-t-4 border-b-4 border-indigo-500 rounded-full w-12 h-12 animate-spin"></div>
              <p className="text-gray-300 mt-3 text-lg">AI is processing... Please wait.</p>
            </div>
          ) : (
            <button
              onClick={file ? sendTextToServer : () => alert("Please upload a valid PDF file.")}
              className="w-full py-3 rounded-md bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-border hover:bg-indigo-700 transition-all duration-300 ease-in-out"
            >
              <span className="text-black font-black animate-pulse text-lg">
                AI Generate
              </span>
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default FileUpload;
