import React, { useState } from "react";
import SubscriptionCard from "../../components/SubscriptionCard";

const data = {
  "2 years": [
    {
      title: "Bronze",
      price: 17,
      features: [
        "User quota: 1000",
        "Data storage limit: 5GB",
        "Basic customer support (email support, response within 48 hours)",
      ],
      currency: "$",
    },
    {
      title: "Silver",
      price: 34,
      features: [
        "User quota: 5000",
        "Data storage limit: 15GB",
        "Priority customer support (email and phone support, response within 24 hours)",
      ],
      currency: "$",
      featured: true,
    },
    {
      title: "Gold",
      price: 50,
      features: [
        "User quota: 10000",
        "Data storage limit: 30GB",
        "Premium customer support (24/7 support, dedicated account manager)",
      ],
      currency: "$",
    },
  ],
  "1 year": [
    {
      title: "Bronze",
      price: 10,
      features: [
        "User quota: 1000",
        "Data storage limit: 5GB",
        "Basic customer support (email support, response within 48 hours)",
      ],
      currency: "$",
    },
    {
      title: "Silver",
      price: 20,
      features: [
        "User quota: 5000",
        "Data storage limit: 15GB",
        "Priority customer support (email and phone support, response within 24 hours)",
      ],
      currency: "$",
      featured: true,
    },
    {
      title: "Gold",
      price: 30,
      features: [
        "User quota: 10000",
        "Data storage limit: 30GB",
        "Premium customer support (24/7 support, dedicated account manager)",
      ],
      currency: "$",
    },
  ],
};

const SubscriptionPackages = ({ onSelectPackage }) => {
  const [subscriptionDuration, setSubscriptionDuration] = useState("1 year");

  const handleToggleDuration = () => {
    setSubscriptionDuration((prevDuration) =>
      prevDuration === "1 year" ? "2 years" : "1 year"
    );
  };

  return (
    <div className="h-screen flex-col gap-y-32 lg:flex lg:justify-center lg:items-center">
      <label
        htmlFor="checkbox"
        className="bg-gray-100 cursor-pointer relative w-40 h-10 rounded-full border-solid border-2"
      >
        <input
          type="checkbox"
          id="checkbox"
          className="sr-only peer"
          onClick={handleToggleDuration}
        />
        <span className="text-white text-center w-2/3 h-4/5 bg-indigo-400 absolute rounded-full left-2 top-1 peer-checked:bg-indigo-600 peer-checked:left-11 transition-all duration-500">
          <span
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs"
            style={{ fontSize: "0.75rem" }}
          >
            {" "}
            {/* Adjusted font size here */}
            {subscriptionDuration}
          </span>
        </span>
      </label>

      <div className="grid lg:grid-cols-3 gap-12 lg:gap-0">
        {data[subscriptionDuration].map((plan) => (
          <div
            className={`w-full max-w-md mx-auto ${
              plan.featured
                ? "order-first lg:order-none lg:scale-110 lg:transform lg:z-10"
                : "lg:transform lg:scale-90"
            }`}
          >
            <SubscriptionCard {...plan} onSelectPackage={onSelectPackage} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPackages;
