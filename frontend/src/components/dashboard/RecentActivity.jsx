import React from 'react';

const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {activities.map((activity, index) => (
          <div key={index} className="px-6 py-4">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'improvement' ? 'bg-blue-500' : 'bg-gray-400'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
