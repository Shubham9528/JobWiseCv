import React from 'react';
import JobAnalysisForm from '../features/job-analysis/InputBox';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            JobWiseCV AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your resume with AI-powered optimization tailored to specific job descriptions
          </p>
        </div>
        
        <JobAnalysisForm />
      </div>
    </div>
  );
};

export default HomePage;
