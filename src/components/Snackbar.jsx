// Snackbar.js
import React from "react";

const Snackbar = ({
  message,
  show,
  setShow,
  severity,
  autoDuration = 4000,
}) => {
  const onClose = () => {
    setShow(false);
  };
  React.useEffect(() => {
    if (show && autoDuration) {
      const timer = setTimeout(onClose, autoDuration);
      return () => clearTimeout(timer);
    }
  }, [show, autoDuration, onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${
        severity === "success"
          ? "bg-green-500"
          : severity === "info"
          ? "bg-blue-500"
          : "bg-red-500"
      } text-white px-4 py-2 rounded transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
      <button className="ml-4 text-white hover:text-gray-300" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Snackbar;
