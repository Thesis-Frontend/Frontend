import React from "react";
import { CheckIcon } from "@heroicons/react/16/solid";

const SubscriptionCard = ({
  id,
  name,
  price,
  features,
  currency,
  featured = false,
  onSelectPackage,
}) => {
  const nameToBackgroundColor = {
    Bronze: "bg-cardBronze",
    Silver: "bg-cardSilver",
    Gold: "bg-cardGold",
  };

  return (
    // <div className="h-full flex justify-center items-center">
    <div
      id={id}
      className={`${
        nameToBackgroundColor[name]
      } border-neutral-400 rounded-md shadow-xl cursor-pointer relative ${
        featured ? "border-2" : "border border-opacity-10"
      }`}
    >
      {featured ? (
        <span className="bg-indigo-600 text-white px-6 py-1 rounded-full uppercase text-sm font-semibold whitespace-nowrap absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Best Price
        </span>
      ) : null}
      <div className="text-white px-6 py-12 border-b-2 border-gray-200">
        <p className="text-3xl font-semibold text-center mb-4">{name}</p>
        <div className="flex justify-center items-center">
          <div className="flex items-start">
            <p className="text-4xl font-medium">{currency}</p>
            <p className="text-7xl font-bold">{price}</p>
          </div>
          <p className="text-2xl text-white">/year</p>
        </div>
      </div>
      <div className="p-12 bg-cardBackground">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-4">
              <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
              <p className="text-lg text-white">{feature}</p>
            </li>
          ))}
        </ul>
        <button
          className={`mt-12 w-full py-4 px-4 rounded-lg text-lg whitespace-nowrap focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:ring-opacity-50 transition-all ${
            featured
              ? "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 transform"
              : "bg-white text-indigo-600 hover:bg-gray-50"
          }`}
          onClick={() => {
            onSelectPackage(id);
          }}
        >
          Buy
        </button>
      </div>
    </div>
    // </div>
  );
};

export default SubscriptionCard;
