import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from "../../components/Snackbar";
import SuccessPage from "../../components/SuccessModal";

export default function Checkout() {
  const location = useLocation();
  const [formData, setFormData] = useState(location.state || {});
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setSnackbarMessage(`Payment successful!`);
        setShowSnackbar(true);
        setSeverity("success");

        setShowSuccessModal(true);
      } else {
        throw new Error("Checkout failed");
      }
    } catch (error) {
      setSnackbarMessage(
        `An error occurred during checkout. Please try again.`
      );
      setShowSnackbar(true);
      setSeverity("error");
    }
  };

  return (
    <div className=" w-full h-screen grid bg-gray-100">
      <Snackbar
        message={snackbarMessage}
        show={showSnackbar}
        setShow={setShowSnackbar}
        severity={severity}
      />
      {showSuccessModal && (
        <SuccessPage
          message="You have successfully completed payment."
          title="Congratulations!"
          onReturnHome={() => {
            navigate("/welcome");
          }}
          buttonName={"Go to Home Page"}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl m-auto grid bg-white p-12 rounded shadow-lg"
      >
        <h3 className="text-lg font-semibold text-blue-600 mb-4">
          Review Your Information
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Address:
          </label>
          <p>{formData.address}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            City:
          </label>
          <p>{formData.city}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            State:
          </label>
          <p>{formData.state}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Zip code:
          </label>
          <p>{formData.zip}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name On Card:
          </label>
          <p>{formData.cardName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Credit Card Number:
          </label>
          <p>{formData.cardNumber}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Expiration Month:
          </label>
          <p>{formData.expMonth}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Expiration Year:
          </label>
          <p>{formData.expYear}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            CVV:
          </label>
          <p>{formData.cvv}</p>
        </div>
        <input
          type="submit"
          value="Submit Payment"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg"
        />
      </form>
    </div>
  );
}
