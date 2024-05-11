import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RiDashboardLine, RiFileListLine, RiTeamLine, RiBuildingLine, RiBuilding2Line } from 'react-icons/ri';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full p-4 bg-gray-100">
      <header className="flex justify-between items-center bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <RiDashboardLine size={24} className="text-gray-500" />
          <RiFileListLine size={24} className="text-gray-500" />
          <RiTeamLine size={24} className="text-gray-500" />
          <RiBuildingLine size={24} className="text-gray-500" />
          <RiBuilding2Line size={24} className="text-gray-500" />
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-gray-800">2400</span>
                <span className="text-gray-500">Users</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-gray-800">1200</span>
                <span className="text-gray-500">Sessions</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Chart</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <ul className="divide-y divide-gray-200">
              <li className="py-2">User A logged in</li>
              <li className="py-2">User B uploaded a file</li>
              <li className="py-2">User C updated profile</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
