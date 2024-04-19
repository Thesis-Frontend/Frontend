import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../assets/logo2.jpg";

const Navbar = ({ setLoginModal, setIsUserLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLoginOptions = () => {
    setShowLoginOptions(!showLoginOptions);
  };

  return (
    <nav className="absolute w-full flex items-center justify-between flex-wrap bg-blue-500 p-6 z-10">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={logo} alt="Logo" className="h-8 w-auto" />
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
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
        <div className="text-sm lg:flex-grow">
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 hover:text-blue-200"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 hover:text-blue-200"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/companies"
            className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 hover:text-blue-200"
            onClick={toggleMenu}
          >
            Companies
          </Link>
          <Link
            to="/contact"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-200"
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </div>
        <div>
          {!showLoginOptions ? (
            <button
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 mr-4"
              onClick={toggleLoginOptions}
            >
              Login
            </button>
          ) : (
            <>
              <Link
                className="inline-block text-sm px-4 py-2 leading-none border rounded-l text-white border-white hover:border-transparent border-r-0 hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
                onClick={() => {
                  setLoginModal(true);
                  setIsUserLogin(false);
                }}
              >
                Yönetici
              </Link>
              <Link
                className="inline-block text-sm px-4 py-2 leading-none border rounded-r text-white border-white hover:border-transparent border-l-0 hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 mr-4"
                onClick={() => {
                  setLoginModal(true);
                  setIsUserLogin(true);
                }}
              >
                Kullanıcı
              </Link>
            </>
          )}
        </div>
        <Link
          to="/sign-up"
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
          onClick={toggleMenu}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
