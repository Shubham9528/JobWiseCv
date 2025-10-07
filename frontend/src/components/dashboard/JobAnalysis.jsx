import React from 'react';


const JobAnalysis = ({ analysisData, aiResumeData }) => {
  if (!analysisData && !aiResumeData) return null;

  const { keywords, score, suggestions, jobDescription } = analysisData || {};
  const { aiResponse } = aiResumeData || {};

  return (
    <div className="bg-white rounded-2xl shadow-xl mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Job Analysis Results</h3>
      </div>
      
      <div className="p-6 space-y-6">
        {/* ATS Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">ATS Match Score</span>
            <span className="text-2xl font-bold text-indigo-600">{score || 85}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${score || 85}%` }}></div>
          </div>
        </div>

        {/* Keywords */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Extracted Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {keywords?.map((keyword, index) => (
              <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Improvement Suggestions</h4>
          <ul className="space-y-2">
            {suggestions?.map((suggestion, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="mr-2 text-indigo-500">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>

        {/* Job Description Preview */}
        {jobDescription && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Job Description</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 line-clamp-3">{jobDescription}</p>
            </div>
          </div>
        )}

        {/* AI Generated Resume */}
        {aiResponse && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">AI Generated Resume</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="prose prose-sm max-w-none">
                <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans bg-transparent border-0 p-0">
                  {aiResponse}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobAnalysis;
