import React, { useState } from "react";
import pdfToText from "react-pdftotext";
import { useNavigate } from "react-router-dom";
import { resumeService } from "../../services/api.service";

function FileUpload({ showButton }) {
  const [extractedText, setExtractedText] = useState(""); // State to store extracted text
  const [isProcessing, setIsProcessing] = useState(false); // Show processing animation
  const [file, setFile] = useState(false); // Check if file is uploaded
  const navigate = useNavigate();

  function extractText(event) {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFile(true);
      pdfToText(file)
        .then((text) => {
          setExtractedText(text);
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
      setIsProcessing(true);
      const result = await resumeService.generateResume(extractedText);
      navigate('/dashboard', { state: { resumeData: result, source: 'resume-upload' } });
    } catch (error) {
      console.error("Error sending text to server:", error);
      alert("Failed to send resume to server. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-6 w-full max-w-2xl">
      <label
        htmlFor="myfile"
        className="block text-lg font-semibold text-black mb-2"
      >
        Upload Resume
      </label>

      <div className="flex items-center mb-4 text-black">
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
        className="block w-full text-base text-black border border-gray-600 rounded-md p-3 mb-4 cursor-pointer focus:ring-4 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
        accept=".pdf"
        onChange={extractText}
      />

      {isProcessing ? (
        <div className="flex flex-col items-center">
          <div className="loader border-t-4 border-b-4 border-indigo-500 rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-black mt-3 text-lg">AI is processing... Please wait.</p>
        </div>
      ) : (
        <button
          onClick={file ? sendTextToServer : () => alert("Please upload a valid PDF file.")}
          className="w-full py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 ease-in-out"
        >
          AI Generate Resume
        </button>
      )}
    </div>
  );
}

export default FileUpload;
