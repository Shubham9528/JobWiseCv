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
        className="block text-lg font-semibold text-indigo-600 mb-2"
      >
        Upload Resume
      </label>
      <input
        type="file"
        id="myfile"
        name="myfile"
        className="block w-full text-base text-gray-700 border border-indigo-300 rounded-md p-3 mb-4 cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
        onChange={extractText}
      />
      <Link to={`/aiResume`}>
        <button
          onClick={sendTextToServer}
          className="w-full py-3 bg-indigo-600 text-white font-semibold text-lg rounded-md hover:bg-indigo-700 transition-all duration-300 ease-in-out"
        >
          Upload File
        </button>
      </Link>
    </>
  )}
</div>
  );
}

export default FileUpload;
