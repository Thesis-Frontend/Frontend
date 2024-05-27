import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RiDashboardLine, RiFileListLine, RiTeamLine, RiBuildingLine, RiBuilding2Line } from 'react-icons/ri';
import SessionHelper from "../../helpers/SessionHelper";
import dashboardImage from '../../assets/left.jpg'; // Use a beautiful dashboard image

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
];

const Dashboard = () => {
  const user = SessionHelper.getUser();
  const isCustomer = !!user.sector; // Assuming 'sector' indicates a customer

  return (
    <div className="flex flex-col h-full p-4 bg-gray-100 dark:bg-[#161A23] rounded-lg">
      <header className="flex justify-between items-center bg-white dark:bg-[#2D2F39] p-4 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-[#8A8C91]">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <RiDashboardLine size={24} className="text-gray-500" />
          <RiFileListLine size={24} className="text-gray-500" />
          <RiTeamLine size={24} className="text-gray-500" />
          <RiBuildingLine size={24} className="text-gray-500" />
          <RiBuilding2Line size={24} className="text-gray-500" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {isCustomer ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#2D2F39] dark:text-[#8A8C91] p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-gray-800 dark:text-[#8A8C91]">2400</span>
                  <span className="text-gray-500">Users</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-gray-800 dark:text-[#8A8C91]">1200</span>
                  <span className="text-gray-500">Sessions</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#2D2F39] dark:text-[#8A8C91] p-6 rounded-lg shadow-md">
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

            <div className="bg-white dark:bg-[#2D2F39] dark:text-[#8A8C91] p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <ul className="divide-y divide-gray-200">
                <li className="py-2">User A logged in</li>
                <li className="py-2">User B uploaded a file</li>
                <li className="py-2">User C updated profile</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center bg-white dark:bg-[#2D2F39] dark:text-[#8A8C91] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Welcome</h2>
            <img src={dashboardImage} alt="Welcome" className="w-full h-64 object-cover rounded-lg mb-4" />
            <p className="text-gray-600 dark:text-[#8A8C91] mb-4">
              Welcome to our website! Here you can find all the information you need about our services and features.
            </p>
            <p className="text-gray-600 dark:text-[#8A8C91]">
              We are committed to providing the best service to our users. Feel free to explore the various sections and discover what we have to offer.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex flex-col items-center">
                <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Service 1" className="w-full h-40 object-cover rounded-lg mb-2" />
                <p className="text-gray-600 dark:text-[#8A8C91]">Explore our top-notch services designed to meet your needs.</p>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Service 2" className="w-full h-40 object-cover rounded-lg mb-2" />
                <p className="text-gray-600 dark:text-[#8A8C91]">Learn more about our innovative solutions for your business.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
