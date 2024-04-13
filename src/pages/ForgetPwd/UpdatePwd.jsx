import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdClose, MdVisibility, MdVisibilityOff } from "react-icons/md";
import "../Login/Login.css";

const UpdatePassword = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (updateSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect to login page after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [updateSuccess, navigate]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setUpdateSuccess(true);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Failed to update password");
    }

    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
      <div className="bg-white p-16 rounded-lg relative w-1/4">
        <h2 className="text-2xl font-bold mb-8 text-center">Update Password</h2>
        <form className="flex flex-col gap-8">
          <section className="flex flex-col gap-2">
            <label htmlFor="password" className="text-lg font-medium">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your new password"
                className="px-4 py-3 border rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
          </section>
          <section className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-lg font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your new password"
                className="px-4 py-3 border rounded w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
          </section>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-green-500 flex justify-center text-white px-4 py-2 rounded hover:bg-green-300 transition-colors w-full"
            onClick={handleUpdatePassword}
            disabled={loading}
          >
            {loading ? <div className="loader"></div> : "Update Password"}
          </button>
          {updateSuccess && (
            <p className="text-center text-blue-500">
              Redirecting to <Link to="/login">Login</Link>...
            </p>
          )}
          {updateSuccess && (
            <p className="text-center text-blue-500">
              <Link to="/login">Back to Login</Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
