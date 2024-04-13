import React from "react";
import notFoundImage from "../assets/not_found.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={notFoundImage} alt="Page not found" className="w-64 h-64 mb-8" />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops! Page not found</h1>
      <p className="text-lg text-gray-600">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
    </div>
  );
};

export default NotFound;
