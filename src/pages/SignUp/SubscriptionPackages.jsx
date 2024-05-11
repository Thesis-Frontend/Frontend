import React, { useState } from "react";
import SubscriptionCard from "../../components/SubscriptionCard";

const data = {
  "2 years": [
    {
      title: "Bronze",
      price: 10,
      features: [
        "feature deneme2 111",
        "feature deneme2 222",
        "feature deneme2 333",
      ],
      currency: "$",
    },
    {
      title: "Silver",
      price: 20,
      features: [
        "feature deneme2 111",
        "feature deneme2 222",
        "feature deneme2 333",
      ],
      currency: "$",
      featured: true,
    },
    {
      title: "Gold",
      price: 30,
      features: [
        "feature deneme2 111",
        "feature deneme2 222",
        "feature deneme2 333",
      ],
      currency: "$",
    },
  ],
  "1 year": [
    {
      title: "Bronze",
      price: 10,
      features: [
        "feature deneme 111",
        "feature deneme 222",
        "feature denem 333",
      ],
      currency: "$",
    },
    {
      title: "Silver",
      price: 20,
      features: [
        "feature deneme 111",
        "feature deneme 222",
        "feature denem 333",
      ],
      currency: "$",
      featured: true,
    },
    {
      title: "Gold",
      price: 30,
      features: [
        "feature deneme 111",
        "feature deneme 222",
        "feature denem 333",
      ],
      currency: "$",
    },
  ],
};

const SubscriptionPackages = ({onSelectPackage}) => {
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
        className="bg-gray-100 cursor-pointer relative w-40 h-10 rounded-full border border-solid border-2"
      >
        <input
          type="checkbox"
          id="checkbox"
          className="sr-only peer"
          onClick={handleToggleDuration}
        />
        <span className="text-white text-center w-2/3 h-4/5 bg-indigo-400 absolute rounded-full left-2 top-1 peer-checked:bg-indigo-600 peer-checked:left-11 transition-all duration-500">
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
