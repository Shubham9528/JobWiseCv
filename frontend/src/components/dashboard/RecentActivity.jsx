import React from 'react';

const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity, index) => (
          <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${
                activity.type === 'success' ? 'bg-indigo-500' :
                activity.type === 'improvement' ? 'bg-blue-500' : 'bg-gray-400'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
