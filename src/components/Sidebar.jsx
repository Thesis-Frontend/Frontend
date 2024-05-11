import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiHome2Line,
  RiFileList2Line,
  RiErrorWarningLine,
  RiHistoryLine,
  RiTeamLine,
  RiBuildingLine,
  RiBuilding2Line,
  RiMapPin2Line,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { BiCollapseHorizontal, BiExpandHorizontal } from "react-icons/bi";
import { SiAuthentik } from "react-icons/si";
import { LuBookMinus } from "react-icons/lu";
import { CiLight, CiDark } from "react-icons/ci";
import SessionHelper from "../helpers/SessionHelper"; // Adjust the path as necessary
import logo from "../assets/logo.png"; // Replace with the path to your logo
import logoCollapsed from "../assets/collapsed-logo.png"; // Replace with the path to your collapsed logo

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    SessionHelper.deleteUser();
    navigate("/welcome");
  };

  const handleMenuItemClick = (path, menuItem) => {
    setSelectedMenuItem(menuItem);
    navigate(path);
  };

  const getMenuItemClass = (menuItem) => {
    const baseClass =
      "flex items-center space-x-2 px-2 py-2 rounded-md cursor-pointer transition-colors duration-300";
    const selectedClass = selectedMenuItem === menuItem ? "bg-gray-300" : "";
    return `${baseClass} ${selectedClass}`;
  };

  const user = SessionHelper.getUser();
  const userName = user ? user.name : "Guest";
  const userRole = user ? user.role : "Unknown";

  return (
    <div
      className={`flex flex-col h-screen ${
        darkMode
          ? "bg-signupButtonStrokeColor text-white"
          : "bg-white text-black"
      } shadow-lg ${
        isOpen ? "w-64 justify-start" : "w-20 justify-center"
      }  transition-width duration-300 ease-in-out relative`}
    >
      <div
        className={`flex items-center ${
          isOpen ? "justify-between" : "justify-center"
        } p-4 bg-gray-100 text-white`}
      >
        <div className="flex items-center ">
          <img
            src={isOpen ? logo : logoCollapsed}
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>
        <button
          className="text-white focus:outline-none absolute right-0 top-24 transform translate-x-1/2 rounded-lg bg-white border-solid border-gray-400 border"
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <BiCollapseHorizontal className="text-black" size={20} />
          ) : (
            <BiExpandHorizontal className="text-black" size={20} />
          )}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4">
          <ul
            className={`space-y-6 ${!isOpen ? "items-center" : ""} ${
              darkMode ? "text-white" : "text-gray-600"
            }`}
          >
            <li
              className={getMenuItemClass("Dashboard")}
              onClick={() => handleMenuItemClick("/dashboard", "Dashboard")}
            >
              <RiHome2Line size={24} />
              {isOpen && <span>Dashboard</span>}
            </li>
            <li
              className={getMenuItemClass("Records")}
              onClick={() => handleMenuItemClick("/records", "Records")}
            >
              <RiFileList2Line size={24} />
              {isOpen && <span>Records</span>}
            </li>
            <li
              className={getMenuItemClass("Server Error Logs")}
              onClick={() =>
                handleMenuItemClick("/server-error-logs", "Server Error Logs")
              }
            >
              <RiErrorWarningLine size={24} />
              {isOpen && <span>Server Error Logs</span>}
            </li>
            <li
              className={getMenuItemClass("History")}
              onClick={() => handleMenuItemClick("/history", "History")}
            >
              <RiHistoryLine size={24} />
              {isOpen && <span>History</span>}
            </li>
            <hr className="border-t border-gray-300" />

            <li
              className={getMenuItemClass("Users")}
              onClick={() => handleMenuItemClick("/users", "Users")}
            >
              <RiTeamLine size={24} />
              {isOpen && <span>Users</span>}
            </li>
            <li
              className={getMenuItemClass("Companies")}
              onClick={() => handleMenuItemClick("/companies", "Companies")}
            >
              <RiBuildingLine size={24} />
              {isOpen && <span>Companies</span>}
            </li>
            <li
              className={getMenuItemClass("Departments")}
              onClick={() => handleMenuItemClick("/departments", "Departments")}
            >
              <RiBuilding2Line size={24} />
              {isOpen && <span>Departments</span>}
            </li>
            <li
              className={getMenuItemClass("Cities and Towns")}
              onClick={() =>
                handleMenuItemClick("/cities-and-towns", "Cities and Towns")
              }
            >
              <RiMapPin2Line size={24} />
              {isOpen && <span>Cities and Towns</span>}
            </li>
            <li
              className={getMenuItemClass("Role-Authorization Matrixsi")}
              onClick={() =>
                handleMenuItemClick(
                  "/role-auth-matrix",
                  "Role-Authorization Matrix"
                )
              }
            >
              <SiAuthentik size={24} />
              {isOpen && <span>Role-Authorization Matrix</span>}
            </li>
            <li
              className={getMenuItemClass("Traninings")}
              onClick={() => handleMenuItemClick("/trainings", "Traninings")}
            >
              <LuBookMinus size={24} />
              {isOpen && <span>Traninings</span>}
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={`p-4 ${
          !darkMode ? "bg-gray-100" : " bg-signupButtonStrokeColor"
        }  flex flex-col items-center transition-all ease-in-out`}
      >
        {isOpen && (
          <div className="text-center mb-4">
            <p className="font-bold text-lg">{userName}</p>
            <p className="text-sm text-gray-400">({userRole})</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-gray-300 rounded-md text-center flex items-center justify-center space-x-2 mb-4"
        >
          <RiLogoutCircleLine size={26} />
          {isOpen && <span>Logout</span>}
        </button>
        <button
          onClick={toggleDarkMode}
          className="w-full py-2 bg-gray-300 rounded-md text-center flex items-center justify-center space-x-2"
        >
          {darkMode ? <CiLight size={26} /> : <CiDark size={26} />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
