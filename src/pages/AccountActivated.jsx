import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai"; // Importing checkmark icon from 'react-icons'
import { useNavigate, useParams } from "react-router-dom";

const AccountActivated = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  return (
    <div className="confetti-background flex flex-col items-center justify-center min-h-screen bg-gray-100 z-10">
      <div className="bg-white text-center p-8 rounded-lg rounded-b-none shadow-lg w-2/5">
        <AiOutlineCheckCircle className="text-green-500 mx-auto text-6xl" />
        <h2 className="text-2xl font-semibold text-green-600 mt-4 mb-2">
          Congratulations!
        </h2>
        <p className="mb-4">Your email has been successfully verified.</p>
      </div>
      <button
        onClick={() => {
          navigate(`/payment/${token}`);
        }}
        className="block w-2/5 rounded-lg rounded-t-none bg-signupButtonStrokeColor text-white px-6 py-3 hover:hover:bg-gray-600 transition-colors"
      >
        Go to Payment
      </button>
    </div>
  );
};

export default AccountActivated;
