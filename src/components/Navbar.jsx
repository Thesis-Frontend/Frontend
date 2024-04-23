import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../assets/logo.png";

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
    <nav className="absolute w-full flex items-center justify-between flex-wrap landingBackgroundColor p-6 z-10">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={logo} alt="Logo" className="h-8 mr-20 w-auto" />
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
            className="block mt-4 mr-20 lg:inline-block lg:mt-0 landingFontColor hover:text-blue-200"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block mt-4 mr-20 lg:inline-block lg:mt-0 landingFontColor hover:text-blue-200"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/companies"
            className="block mt-4 mr-20 lg:inline-block lg:mt-0 landingFontColor hover:text-blue-200"
            onClick={toggleMenu}
          >
            Companies
          </Link>
          <Link
            to="/contact"
            className="block mt-4 mr-20 lg:inline-block lg:mt-0 landingFontColor hover:text-blue-200"
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </div>
        {/* Login Sign Up */}
        <div>
          {!showLoginOptions ? (
            <button
              className="inline-block text-sm px-4 py-2 leading-none border rounded-full text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 mr-4"
              onClick={toggleLoginOptions}
              style={{
                borderRadius: "25px",
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
                className="inline-block text-sm px-4 py-2 leading-none border rounded-l-full text-white border-white hover:border-transparent border-r-0 hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
                onClick={() => {
                  setLoginModal(true);
                  setIsUserLogin(false);
                }}
                style={{
                  borderRadius: "25px",
                  backgroundColor: "#5C5E64",
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                Yönetici
              </Link>
              <Link
                className="inline-block text-sm px-4 py-2 leading-none border rounded-r-full text-white border-white hover:border-transparent border-l-0 hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 mr-4"
                onClick={() => {
                  setLoginModal(true);
                  setIsUserLogin(true);
                }}
                style={{
                  borderRadius: "25px",
                  backgroundColor: "#5C5E64",
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                Kullanıcı
              </Link>
            </>
          )}
        </div>

        <Link
          to="/sign-up"
          className="inline-block text-sm px-4 py-2 leading-none border rounded-full text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
          onClick={toggleMenu}
          style={{
            borderRadius: "25px",
            backgroundColor: "#5C5E64",
            color: "#ffffff",
            fontWeight: "bold",
          }}
        >
          Sign Up
        </Link>
        {/* Login Sign Up END*/}
      </div>
    </nav>
  );
};

export default Navbar;
