import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../assets/logo.png";
import Login from "../pages/Login/Login";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLoginOptions = () => {
    setShowLoginOptions(!showLoginOptions);
  };

  const linkStyles = (path) => {
    return location.pathname === path
      ? "block mt-4 lg:inline-block lg:mt-0 text-black font-bold text-xl hover:text-blue-200 border-b-2 border-blue-500"
      : "block mt-4 lg:inline-block lg:mt-0 text-black font-bold text-xl hover:text-blue-200";
  };

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <nav className="absolute w-full flex items-center justify-between flex-wrap landingBackgroundColor p-6 z-10">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-8 mr-10 w-auto" />
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          className="lg:flex-grow flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
          onClick={toggleMenu}
        >
          {isOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
        </button>
      </div>
      <div
        className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${
          isOpen ? "" : "hidden"
        } lg:block`}
      >
        <div className="lg:flex-grow flex lg:justify-start items-center space-x-8">
          <Link to="/" className={linkStyles("/welcome")} onClick={toggleMenu}>
            <span className="text-base lg:text-base">Home</span>
          </Link>
          <Link
            to="/about-us"
            className={linkStyles("/about-us")}
            onClick={toggleMenu}
          >
            <span className="text-base lg:text-base">About</span>
          </Link>
          <Link
            to="/contact"
            className={linkStyles("/contact")}
            onClick={toggleMenu}
          >
            <span className="text-base lg:text-base">Contact</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          {!showLoginOptions ? (
            <button
              className="text-md px-6 py-3 leading-none border rounded-full text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white transition-all duration-300 ease-in-out"
              onClick={toggleLoginOptions}
              style={{
                backgroundColor: "#5C5E64",
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              Login
            </button>
          ) : (
            <>
              <Link
                className="text-md px-6 py-3 leading-none border rounded-l-full text-white border-white hover:border-transparent border-r-0 hover:text-blue-500 hover:bg-white transition-all duration-300 ease-in-out"
                onClick={() => {
                  handleLoginClick(true);
                  setIsUserLogin(false);
                }}
                style={{
                  backgroundColor: "#5C5E64",
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                Yönetici
              </Link>
              <Link
                className="text-md px-6 py-3 leading-none border rounded-r-full text-white border-white hover:border-transparent border-l-0 hover:text-blue-500 hover:bg-white transition-all duration-300 ease-in-out"
                onClick={() => {
                  handleLoginClick(true);
                  setIsUserLogin(true);
                }}
                style={{
                  backgroundColor: "#5C5E64",
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                Kullanıcı
              </Link>
            </>
          )}
          <Link
            to="/sign-up"
            className="text-md px-6 py-3 leading-none border rounded-full text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white transition-all duration-300 ease-in-out"
            onClick={toggleMenu}
            style={{
              backgroundColor: "#5C5E64",
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Link>
        </div>
        <Login
          isOpen={showModal}
          onClose={handleCloseModal}
          isUserLogin={isUserLogin}
        />
      </div>
    </nav>
  );
};

export default Navbar;
