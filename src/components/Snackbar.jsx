// Snackbar.js
import React from "react";

const Snackbar = ({ message, show, severity }) => {
  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${
        severity == "success"
          ? "bg-green-500"
          : severity == "info"
          ? "bg-blue-500"
          : "bg-red-500"
      } text-white px-4 py-2 rounded transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
    </div>
  );
};

export default Snackbar;
