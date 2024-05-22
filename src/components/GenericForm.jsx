import React, { useState } from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import Snackbar from "./Snackbar"; // Importing the Snackbar component
import CustomDropdown from "./CustomDropdown";

const GenericFormComponent = ({
  title,
  value,
  onChange,
  onNext,
  onPrevious,
  placeholder,
  type = "text",
  options = [],
}) => {
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleNext = (e) => {
    if (!value) {
      setSnackbarMessage(`${title} field is required`);
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000); // Hide snackbar after 3 seconds
    } else if (type === "email" && !isValidEmail(value)) {
      setSnackbarMessage("Please enter a valid email address");
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000); // Hide snackbar after 3 seconds
    } else {
      onNext(e);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNext(e);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-signupCardColor p-8 rounded-lg rounded-b-none shadow-lg w-2/5">
        <div className="mb-4 flex justify-center flex-col text-center items-center">
          <label className="block text-xl text-center text-white mb-6 font-medium">
            {title}
          </label>
          {type === "select" ? (
            <CustomDropdown
              title={title}
              options={options}
              selectedValue={value}
              onChange={(value) => onChange(value)}
              isMultiple={false}
            />
          ) : (
            <div className="relative">
              <input
                type={
                  type !== "password" ? "text" : showPassword ? "text" : "password"
                }
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-4 cursor-pointer"
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between rounded-lg w-2/5">
        <button
          onClick={onPrevious}
          className="bg-signupButtonStrokeColor text-left text-white px-4 py-4 w-1/2 rounded-lg rounded-r-none rounded-t-none hover:bg-gray-600 flex justify-start items-center"
        >
          <RiArrowLeftSLine className="mr-1" /> Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-signupButtonStrokeColor text-right text-white px-4 py-2 w-1/2 rounded-lg rounded-l-none rounded-t-none hover:bg-gray-600 flex justify-end items-center"
        >
          Next <RiArrowRightSLine className="ml-1" />
        </button>
      </div>
      <Snackbar
        message={snackbarMessage}
        show={showSnackbar}
        severity={"error"}
      />
    </div>
  );
};

export default GenericFormComponent;
