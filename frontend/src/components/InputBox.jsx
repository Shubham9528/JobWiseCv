import React, { useState } from "react";
import axios from "axios";
import FileUpload from "./FileUpload";

export default function InputBox({ setInputBox }) {
    const [inputValue, setInputValue] = useState("");
    const [outputValue, setOutputValue] = useState(""); // State to hold the output
    const [showButton, setShowButton] = useState(false);
    const [status, setStatus] = useState("Paste  Job Description here and click on submit");
    // const[aiResponse2,setAiResponse2]=useState("");
    // setAiResponse1(aiResponse2);
    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevents the page from reloading on submit

        setInputBox(inputValue); // Passes the input value to the parent component
        setInputValue("");
        setStatus("AI is analyzing your input, please wait...");


        if (inputValue.length > 20) {

            try {
                const response = await axios.post("http://localhost:4000/process", {
                    data: inputValue,
                });
                setOutputValue(response.data); // Set the output with the response data
                setShowButton(!showButton);
                setStatus("Success!!");

            } catch (error) {
                console.error("Error:", error);
            }
        }
        else {
            window.alert("Please enter more than 20 characters");
        }



    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Updates state as the user types
    };

    return (
        <div className="flex flex-col items-center p-8 bg-gradient-to-b from-indigo-100 to-blue-50 min-h-screen font-sans">
  {/* Main Heading */}
  <h1 className="text-6xl font-extrabold text-indigo-700 mb-4 tracking-wide animate-fadeIn">
    JobWiseCv.ai
  </h1>
  <p className="text-xl text-gray-800 mb-8 max-w-4xl text-center animate-fadeIn delay-100">
    AI-driven resume generation tailored to job descriptions, enhancing your ATS performance.
  </p>

  {/* Form Container */}
  <form
    className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-4xl transform transition-all "
    onSubmit={handleSubmit}
  >
    <div className="space-y-8">
      {/* Job Description Textarea */}
      <div>
        <label
          htmlFor="inputBox"
          className="block text-2xl font-semibold text-indigo-600 mb-3"
        >
          Job Description
        </label>
        <textarea
          name="inputBox"
          rows="12"
          className="w-full p-6 text-lg rounded-xl border border-indigo-300 focus:ring-4 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all"
          value={inputValue}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* AI Generated Keywords Textarea */}
      {showButton && (
        <div>
          <label
            htmlFor="outputBox"
            className="block text-2xl font-semibold text-indigo-600 mb-3"
          >
            AI Generated Keywords
          </label>
          <textarea
            name="outputBox"
            rows="12"
            className="w-full p-6 text-lg rounded-xl border border-gray-300 bg-gray-100 text-gray-700 outline-none cursor-not-allowed resize-none transition-colors"
            value={outputValue}
            readOnly
          />
        </div>
      )}
    </div>

    {/* Status and Submit Button */}
    <p className="mt-8 text-lg text-gray-700">
      Status: <span className="font-semibold text-lg text-green-600">{status}</span>
    </p>
    <button
      type="submit"
      className="mt-8 w-full py-4 bg-indigo-600 text-white font-semibold text-xl rounded-xl hover:bg-indigo-700 transition-all duration-300 ease-in-out shadow-lg"
    >
      Submit
    </button>
  </form>

  {/* File Upload Section */}
  <div className="mt-12 animate-fadeInUp delay-200">
    <FileUpload showButton={showButton} />
  </div>
</div>
    );
}
