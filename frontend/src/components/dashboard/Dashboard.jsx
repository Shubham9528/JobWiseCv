import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
import { resumeService } from '../../services/api.service';
import Sidebar from './Sidebar';
import Header from './Header';
import StatsCard from './StatsCard';
import RecentActivity from './RecentActivity';
import JobAnalysis from './JobAnalysis';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiResumeData, setAiResumeData] = useState(null);
  // const { currentUser } = useAuth();
  const location = useLocation();
  const { resumeData } = location.state || {};

  useEffect(() => {
    const fetchAiResume = async () => {
      try {
        const response = await resumeService.getAiResume();
        const cleanedResume = response.data.replace(/[*#]/g, "");
        setAiResumeData({ aiResponse: cleanedResume });
      } catch (error) {
        console.error("Error fetching AI resume:", error);
        setAiResumeData({ aiResponse: "Error loading resume. Please try again." });
      }
    };

    fetchAiResume();
  }, []);

  const stats = [
    { name: 'Total Resumes', value: '12', icon: '📄', color: 'from-blue-500 to-blue-600' },
    { name: 'ATS Score', value: '85%', icon: '🎯', color: 'from-green-500 to-green-600' },
    { name: 'Jobs Analyzed', value: '24', icon: '🔍', color: 'from-purple-500 to-purple-600' },
    { name: 'Improvements', value: '8', icon: '⚡', color: 'from-orange-500 to-orange-600' },
  ];

  const recentActivity = [
    { action: 'Resume analyzed for Software Engineer', time: '2 hours ago', type: 'success' },
    { action: 'New job description uploaded', time: '4 hours ago', type: 'info' },
    { action: 'ATS score improved by 15%', time: '1 day ago', type: 'improvement' },
    { action: 'Cover letter generated', time: '2 days ago', type: 'success' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Display job analysis and AI resume results */}
          {(resumeData || aiResumeData) && (
            <JobAnalysis analysisData={resumeData} aiResumeData={aiResumeData} />
          )}
          
          <StatsCard stats={stats} />
          <RecentActivity activities={recentActivity} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
