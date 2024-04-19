import React from "react";
import { CheckIcon } from "@heroicons/react/16/solid";

const SubscriptionCard = ({ title, price, features, currency }) => {
  return (
    <div className="h-full flex justify-center items-center px-6 py-12">
      <div className="bg-white border border-indigo-600 border-opacity-10 rounded-md shadow-xl cursor-pointer">
        <div className="px-6 py-12 border-b-2 border-gray-200">
          <p className="text-3xl font-semibold text-center mb-4">{title}</p>
          <div className="flex justfiy-center items-center">
            <div className="flex items-start">
              <p className="text-4xl font-medium">{currency}</p>
              <p className="text-7xl font-bold">{price}</p>
            </div>
            <p className="text-2xl text-gray-400">/year</p>
          </div>
        </div>
        <div className="p-12 bg-gray-100">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-4">
                <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                <p className="text-lg text-gray-600">{feature}</p>
              </li>
            ))}
          </ul>
          <button className="mt-12 w-full py-4 px-4 rounded-lg text-lg whitespace-nowrap bg-white text-indigo-600 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:ring-opacity-50 transition-all">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
