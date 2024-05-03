import React from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const GenericFormComponent = ({
  title,
  value,
  onChange,
  onNext,
  onPrevious,
  placeholder,
  type = "text",
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-signupCardColor p-8 rounded-lg rounded-b-none shadow-lg w-2/5">
        <div className="mb-4 flex justify-center flex-col text-center items-center">
          <label className="block text-xl text-center text-white mb-6 font-medium">{title}</label>
          {type === "select" ? (
            <select
              className="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            >
            </select>
          ) : (
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          )}
        </div>
      </div>
      <div className="flex justify-between rounded-lg  w-2/5">
        <button
          onClick={onPrevious}
          className="bg-signupButtonStrokeColor text-left text-white px-4 py-4 w-1/2 rounded rounded-r-none rounded-t-none hover:bg-gray-600 flex justify-start items-center"
        >
          <RiArrowLeftSLine className="mr-1" /> Previous
        </button>
        <button
          onClick={onNext}
          className="bg-signupButtonStrokeColor text-right text-white px-4 py-2 w-1/2 rounded rounded-l-none rounded-t-none hover:bg-gray-600 flex justify-end items-center"
        >
          Next <RiArrowRightSLine className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default GenericFormComponent;
