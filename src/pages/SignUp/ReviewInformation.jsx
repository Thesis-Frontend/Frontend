import React from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const ReviewInformation = ({ data, onEdit, onSubmit, onPrevious }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-signupCardColor p-8 rounded-lg rounded-b-none shadow-lg w-2/5">
        <h2 className="block text-xl text-center text-white mb-6 font-medium">
          Review Your Information
        </h2>
        <div className="space-y-2 text-white">
          <div>
            <strong>1. Full Name</strong>
            <div className="opacity-75">
              {data.name} {data.surname}
            </div>
            <hr className="mt-4 opacity-40" />
          </div>
          <div>
            <strong>2. E-Mail</strong>
            <div className="opacity-75">{data.email}</div>
            <hr className="mt-4 opacity-40" />
          </div>
          <div>
            <strong>3. Company Name</strong>
            <div className="opacity-75">{data.companyName}</div>
            <hr className="mt-4 opacity-40" />
          </div>
          <div>
            <strong>4. Sector Name</strong>
            <div className="opacity-75">{data.sectorName}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between rounded-lg  w-2/5">
        <button
          onClick={onPrevious}
          className="bg-signupButtonStrokeColor text-left text-white px-4 py-4 w-1/2 rounded-lg rounded-r-none rounded-t-none hover:bg-gray-600 flex justify-start items-center"
        >
          <RiArrowLeftSLine className="mr-2" size="1.5em" /> Previous
        </button>
        <button
          onClick={onSubmit}
          className="bg-signupButtonStrokeColor text-right text-white px-4 py-4 w-1/2 rounded-lg rounded-l-none rounded-t-none hover:bg-gray-600 flex justify-end items-center"
        >
          Send <RiArrowRightSLine className="ml-2" size="1.5em" />
        </button>
      </div>
    </div>
  );
};

export default ReviewInformation;
