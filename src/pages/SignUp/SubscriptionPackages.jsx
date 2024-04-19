import React, { useState } from "react";
import SubscriptionCard from "../../components/SubscriptionCard";

const data = [
  {
    title: "Bronze",
    price: 10,
    features: ["feature 1", "feature 2", "feature 3"],
    currency: "$",
  },
  {
    title: "Silver",
    price: 20,
    features: ["feature 1", "feature 2", "feature 3"],
    currency: "$",
  },
  {
    title: "Gold",
    price: 30,
    features: ["feature 1", "feature 2", "feature 3"],
    currency: "$",
  },
];

const SubscriptionPackages = () => {
  const [subscriptionDuration, setSubscriptionDuration] = useState("1 year");

  const handleToggleDuration = () => {
    setSubscriptionDuration((prevDuration) =>
      prevDuration === "1 year" ? "2 years" : "1 year"
    );
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {/* Toggle subscription duration button */}
      <button
        onClick={handleToggleDuration}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {subscriptionDuration}
      </button>
      {/* Subscription package cards */}
      <div className="max-w-4xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Subscription package card 1 */}
        <SubscriptionCard {...data[0]} />
        {/* Subscription package card 2 */}
        <SubscriptionCard {...data[1]} />
        {/* Subscription package card 3 */}
        <SubscriptionCard {...data[2]} />
      </div>
    </div>
  );
};

export default SubscriptionPackages;
