import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Payment() {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const navigate = useNavigate();
  const { token } = useParams();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/checkout/${token}`, { state: formData });
  };

  return (
    <div className=" w-full h-screen grid bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl m-auto bg-white p-12 rounded shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-4">
              Billing Address
            </h3>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter your Address"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City:
              </label>
              <input
                type="text"
                id="city"
                placeholder="Enter your city"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State:
              </label>
              <input
                type="text"
                id="state"
                placeholder="Enter your state"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="zip"
                className="block text-sm font-medium text-gray-700"
              >
                Zip code:
              </label>
              <input
                type="text"
                id="zip"
                placeholder="Enter your zip code"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
                value={formData.zip}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-4">
              Payment
            </h3>
            <div className="mb-4">
              <label
                htmlFor="cardName"
                className="block text-sm font-medium text-gray-700"
              >
                Name On Card:
              </label>
              <input
                type="text"
                id="cardName"
                placeholder="Enter card name"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
                value={formData.cardName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Credit Card Number:
              </label>
              <input
                type="number"
                id="cardNumber"
                placeholder="Enter card number"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
                value={formData.cardNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-between mb-4">
              <div className="w-1/2 mr-2">
                <label
                  htmlFor="expMonth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiration Month:
                </label>
                <input
                  type="number"
                  id="expMonth"
                  placeholder="MM"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
                  value={formData.expMonth}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/2 ml-2">
                <label
                  htmlFor="expYear"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiration Year:
                </label>
                <input
                  type="number"
                  id="expYear"
                  placeholder="YYYY"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
                  value={formData.expYear}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700"
              >
                CVV:
              </label>
              <input
                type="number"
                id="cvv"
                placeholder="Enter CVV"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
                value={formData.cvv}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Proceed to Checkout"
          id="checkoutBtn"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg"
        />
      </form>
    </div>
  );
}
