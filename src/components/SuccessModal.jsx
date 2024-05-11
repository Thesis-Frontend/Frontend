import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai"; // Importing checkmark icon from 'react-icons'
import confetti from "canvas-confetti";

const SuccessPage = ({ onReturnHome, message, title, buttonName }) => {
  React.useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="confetti-background flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white text-center p-8 rounded-lg rounded-b-none shadow-lg w-2/5">
        <AiOutlineCheckCircle className="text-green-500 mx-auto text-6xl" />
        <h2 className="text-2xl font-semibold text-green-600 mt-4 mb-2">
          {title}
        </h2>
        <p className="mb-4">{message}</p>
      </div>
      <button
        onClick={onReturnHome}
        className="block w-2/5 rounded-lg rounded-t-none bg-signupButtonStrokeColor text-white px-6 py-3 hover:hover:bg-gray-600 transition-colors"
      >
        {buttonName}
      </button>
    </div>
  );
};

export default SuccessPage;
