// src/components/Sidebar.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  RiUser3Line,
} from "react-icons/ri";
import { BiCollapseHorizontal, BiExpandHorizontal } from "react-icons/bi";
import { IoIosMenu } from "react-icons/io";
import { SiAuthentik } from "react-icons/si";
import { LuBookMinus } from "react-icons/lu";
import { CiLight, CiDark } from "react-icons/ci";
import { useSession } from "../helpers/SessionContext";
import logo from "../assets/logo.png";
import logoCollapsed from "../assets/collapsed-logo.png";

const allMenuItems1 = [
  { name: "Records", path: "/records", icon: <RiFileList2Line size={24} /> },
  {
    name: "Server Error Logs",
    path: "/server-error-logs",
    icon: <RiErrorWarningLine size={24} />,
  },
  { name: "History", path: "/history", icon: <RiHistoryLine size={24} /> },
];
const allMenuItems2 = [
  { name: "Users", path: "/users", icon: <RiTeamLine size={24} /> },
  {
    name: "Companies",
    path: "/companies",
    icon: <RiBuildingLine size={24} />,
  },
  {
    name: "Departments",
    path: "/departments",
    icon: <RiBuilding2Line size={24} />,
  },
  {
    name: "Cities and Towns",
    path: "/cities-and-towns",
    icon: <RiMapPin2Line size={24} />,
  },
  {
    name: "Roles and Policies",
    path: "",
    icon: <SiAuthentik size={24} />,
    subItems: [
      {
        name: "Roles",
        path: "/roles",
        icon: <IoIosMenu size={20} />,
      },
      {
        name: "Policies",
        path: "/policies",
        icon: <IoIosMenu size={20} />,
      },
    ],
  },
  {
    name: "Trainings",
    path: "/trainings",
    icon: <LuBookMinus size={24} />,
    subItems: [
      {
        name: "Training Types",
        path: "/training-types",
        icon: <IoIosMenu size={20} />,
      },
      {
        name: "Training Records",
        path: "/training-records",
        icon: <IoIosMenu size={20} />,
      },
    ],
  },
];

const filterMenuItems = (menuItems, sections) => {
  if (sections) {
    return menuItems.filter((item) => {
      const section = sections.find((sec) => sec.section === item.name);
      if (!section) return false;
      if (item.subItems && section.subsections) {
        item.subItems = item.subItems.filter((subItem) =>
          section.subsections.some((subSec) => subSec.name === subItem.name)
        );
      }
      return true;
    });
  } else {
    return [];
  }
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const { user, logout } = useSession();
  const sections = user ? user.uiSections : [];
  const [isOpen, setIsOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(path);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      setTheme("dark");
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    const totalArr = [...allMenuItems1, ...allMenuItems2];
    totalArr.forEach((item) => {
      if (item.subItems) {
        item.subItems.forEach((subItem) => {
          if (subItem.path === path) {
            setExpandedMenus((prev) => ({ ...prev, [item.name]: true }));
          }
        });
      }
    });
  }, [path]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setExpandedMenus({});
    }
  };

  const toggleDarkMode = () => {
    if (theme === "light") {
      setTheme("dark");
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/welcome");
  };

  const handleMenuItemClick = (path) => {
    setSelectedMenuItem(path);
    navigate(path);
  };

  const handleUserNameClick = () => {
    navigate("/account-info");
  };

  const getMenuItemClass = (path) => {
    const baseClass =
      "flex items-center space-x-2 px-2 py-2 rounded-md cursor-pointer transition-colors duration-300";
    const selectedClass =
      selectedMenuItem === path ? "bg-gray-300 dark:bg-gray-600" : "";
    return `${baseClass} ${selectedClass}`;
  };

  const userName = user ? user.name + " " + user.surname : "Sude Nur Çevik";
  const userRole = user ? user.title : null;
  const userSector = user ? user.sector : null;

  const toggleMenu = (name) => {
    setExpandedMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const menuItems1 = filterMenuItems(allMenuItems1, sections);
  const menuItems2 = filterMenuItems(allMenuItems2, sections);

  return (
    <div
      className={`flex flex-col h-screen bg-white dark:bg-[#161A23] dark:text-[#8A8C91]
      shadow-lg ${
        isOpen ? "w-64 justify-start" : "w-20 justify-center"
      } relative`}
    >
      <div
        className={`flex items-center ${
          isOpen ? "justify-between" : "justify-center"
        } p-4 bg-gray-100 dark:bg-[#2D2F39] text-white`}
      >
        <div className="flex items-center">
          <img
            src={isOpen ? logo : logoCollapsed}
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>
        <button
          className="text-white focus:outline-none absolute h-10 w-auto right-0 top-24 transform translate-x-1/2 rounded-lg bg-white dark:bg-[#2D2F39] border-solid border-gray-400 border"
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <BiCollapseHorizontal
              className="text-black dark:text-[#8A8C91]"
              size={20}
            />
          ) : (
            <BiExpandHorizontal
              className="text-black dark:text-[#8A8C91]"
              size={20}
            />
          )}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4">
          <ul
            className={`space-y-6 ${
              !isOpen ? "items-center" : ""
            } text-gray-600 dark:text-[#8A8C91]`}
          >
            <li
              className={getMenuItemClass("/dashboard")}
              onClick={() => handleMenuItemClick("/dashboard")}
            >
              <RiHome2Line size={24} />
              {isOpen && <span>Dashboard</span>}
            </li>

            {menuItems1.map((item) => (
              <li
                key={item.name}
                className={getMenuItemClass(item.path)}
                onClick={() => handleMenuItemClick(item.path)}
              >
                {item.icon}
                {isOpen && <span>{item.name}</span>}
              </li>
            ))}
            {menuItems2.length > 0 && (
              <hr className="border-t border-gray-300 dark:border-gray-600" />
            )}
            {menuItems2.map((item) => (
              <li key={item.name}>
                <div
                  className={getMenuItemClass(item.path)}
                  onClick={() =>
                    item.subItems
                      ? toggleMenu(item.name)
                      : handleMenuItemClick(item.path)
                  }
                >
                  {item.icon}
                  {isOpen && <span>{item.name}</span>}
                  {item.subItems && expandedMenus[item.name] && isOpen ? (
                    <BiCollapseHorizontal size={20} />
                  ) : item.subItems && isOpen ? (
                    <BiExpandHorizontal size={20} />
                  ) : null}
                </div>
                {item.subItems && expandedMenus[item.name] && isOpen && (
                  <ul className="pl-8">
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.name}
                        className={getMenuItemClass(subItem.path)}
                        onClick={() => handleMenuItemClick(subItem.path)}
                      >
                        {subItem.icon}
                        {isOpen && <span>{subItem.name}</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`p-3 flex flex-col items-center`}>
        {isOpen && (
          <div
            className={`text-center mb-4 flex items-center space-x-2 ${
              userSector ? "cursor-pointer" : ""
            }`}
            onClick={userSector ? handleUserNameClick : undefined}
          >
            {userSector && <RiUser3Line size={24} />}
            <div>
              <p className="font-bold text-lg">{userName}</p>
              {userRole && (
                <p className="text-sm text-gray-400 dark:text-[#8A8C91]">
                  ({userRole})
                </p>
              )}
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-gray-300 dark:bg-gray-600 rounded-md text-center flex items-center justify-center space-x-2 mb-4"
        >
          <RiLogoutCircleLine size={26} />
          {isOpen && <span>Logout</span>}
        </button>
        <button
          onClick={toggleDarkMode}
          className="w-full py-2 bg-gray-300 dark:bg-gray-600 rounded-md text-center flex items-center justify-center space-x-2"
        >
          {theme !== "light" ? <CiLight size={26} /> : <CiDark size={26} />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
