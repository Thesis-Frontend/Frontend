import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const iconSize = 24; // Icon boyutu

  return (
    <footer className="absolute bottom-0 w-full bg-transparent p-6 z-10">
      <div className="flex items-center justify-between">
        <div className="text-white">
          <span className="mr-16 hover:text-blue-200 cursor-pointer text-black font-bold">
            Terms and Conditions
          </span>
          <span className="mr-16 hover:text-blue-200 cursor-pointer text-black font-bold">
            Privacy Policy
          </span>
          <span className="mr-16 hover:text-blue-200 cursor-pointer text-black font-bold">
            Security
          </span>
          <span className="mr-16 hover:text-blue-200 cursor-pointer text-black font-bold">
            Accessibility Statement
          </span>
          <span className="hover:text-blue-200 cursor-pointer text-black font-bold">
            LPPD Clarification Text
          </span>
        </div>
        <div className="text-black flex">
          <span className="mr-8 hover:text-blue-200 cursor-pointer">
            <FaFacebook size={iconSize * 1.4} />
          </span>
          <span className="mr-8 hover:text-blue-200 cursor-pointer">
            <FaInstagram size={iconSize * 1.4} />
          </span>
          <span className="mr-8 hover:text-blue-200 cursor-pointer">
            <FaLinkedin size={iconSize * 1.4} />
          </span>
          <span className="mr-4 hover:text-blue-200 cursor-pointer">
            <FaEnvelope size={iconSize * 1.4} />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
