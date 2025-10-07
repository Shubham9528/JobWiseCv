import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resumeService } from "../../services/api.service";
import FileUpload from "../resume/FileUpload";
import { useAuth } from "../../contexts/AuthContext";

export default function InputBox() {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [status, setStatus] = useState("Paste Job Description here and click on submit");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Top Navigation - Absolute Position */}
      {currentUser && (
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-indigo-600">
              Welcome, {currentUser.displayName || currentUser.email?.split('@')[0] || 'User'}
            </span>
          </div>
          
          <div>
            <button
              onClick={handleLogout}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl w-full mx-auto pt-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Job Description Analysis
            </h1>
            <p className="text-sm text-gray-600">
              Paste your job description below and let AI extract the key requirements
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Description Textarea */}
            {!showButton && (
              <div>
                <label
                  htmlFor="inputBox"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Description
                </label>
                <textarea
                  name="inputBox"
                  rows="8"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Paste the complete job description here..."
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
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  AI Generated Keywords
                </label>
                <textarea
                  name="outputBox"
                  rows="8"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 outline-none cursor-not-allowed resize-none transition-colors"
                  value={outputValue}
                  readOnly
                />
              </div>
            )}

            {/* Status Message */}
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-gray-600">{status}</span>
              {isLoading && (
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-indigo-600 border-solid"></span>
              )}
            </div>

            {/* Submit Button */}
            {!showButton && (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? 'Processing...' : 'Analyze Job Description'}
              </button>
            )}
          </form>

          {/* File Upload Section */}
          {showButton && (
            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-md">
                <FileUpload showButton={showButton} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
