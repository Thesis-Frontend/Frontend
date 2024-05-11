import React, { useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Snackbar from "./Snackbar";  // Importing the Snackbar component

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
      setTimeout(() => setShowSnackbar(false), 3000);  // Hide the snackbar after 3 seconds
    } else if (type === "email" && !isValidEmail(value)) {
      setSnackbarMessage("Please enter a valid email address");
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);  // Hide the snackbar after 3 seconds
    } else {
      onNext(e);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNext(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-signupCardColor p-8 rounded-lg rounded-b-none shadow-lg w-2/5">
        <div className="mb-4 flex justify-center flex-col text-center items-center">
          <label className="block text-xl text-center text-white mb-6 font-medium">
            {title}
          </label>
          {type === "select" ? (
            <select
              className="form-select appearance-none block w-1/2 p-3 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyPress}
            >
              <option disabled value="">
                Select One
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
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
      <Snackbar message={snackbarMessage} show={showSnackbar} severity={"error"} />
    </div>
  );
};

export default GenericFormComponent;
