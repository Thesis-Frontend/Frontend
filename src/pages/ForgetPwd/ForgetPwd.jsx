import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import "../Login/Login.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulating an asynchronous operation (e.g., sending email)
    setTimeout(() => {
      // Here you can add your logic to send the email or handle the forgot password process
      console.log("Email submitted:", email);
      // Close the modal or navigate back to the previous page
      onClose();
      setLoading(false);
    }, 2000); // Simulating a 2-second delay
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold mb-8 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="email" className="font-bold text-lg">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="px-4 py-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-300 transition-colors w-full"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="loader"></div>
              </div>
            ) : (
              "Send Email"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
