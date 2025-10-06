import React from 'react';
import { useLocation } from 'react-router-dom';
import FileUpload from '../features/resume/FileUpload';
import AiResume from '../features/resume/AiResume';

const ResumePage = () => {
  const location = useLocation();
  const { keywords } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resume Builder
          </h1>
          <p className="text-xl text-gray-600">
            Upload your resume and let AI optimize it for your target job
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Upload Resume</h2>
            <FileUpload keywords={keywords} />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">AI-Optimized Resume</h2>
            <AiResume />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
