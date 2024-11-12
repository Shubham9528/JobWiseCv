import React, { useState } from "react";
import axios from "axios";
import pdfToText from "react-pdftotext";
import{Link} from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
function FileUpload({showButton}) {
  const [extractedText, setExtractedText] = useState("");  // State to store the extracted text
//   const[file,setFile]=useState(null)

    // const navigate = useNavigate();

  function extractText(event) {
    const file = event.target.files[0]; // Get the file from the input field
    if (file && file.type === "application/pdf" && file!==null) {
      // Only process PDF files
      pdfToText(file)
        .then((text) => {
        //   console.log("Extracted text:", text); // Log the extracted text
          setExtractedText(text); // Update state with extracted text
        })
        .catch((error) => {
          alert("Failed to extract text from pdf", error);
        });
    } else {
      alert("Please upload a valid PDF file");
    }
  }

  const sendTextToServer = async () => {
    try {
       await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/resumeData`, {
        data: extractedText, // Send extracted text to the backend
      });
    
    //  console.log("Server Response:", response.data);
          
   // Update state with server response
   
    //   navigate("/resume");
    } catch (error) {
      console.log("Error sending text to the server:", error);
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
        onChange={extractText}
      />
      
      <Link to={`/aiResume`}>
        <button
          onClick={sendTextToServer}
          className="w-full py-3 bg-indigo-600 text-white font-semibold text-lg rounded-md hover:bg-indigo-700 transition-all duration-300 ease-in-out"
        >
          Create Resume
        </button>
      </Link>
    </>
  )}
</div>
  );
}

export default FileUpload;
