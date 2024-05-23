import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from "../../components/Snackbar";
import SuccessPage from "../../components/SuccessModal";
import pic1 from "../../assets/Giriş1-removebg-preview.png";
import pic2 from "../../assets/Giriş2-removebg-preview.png";
import pic3 from "../../assets/Giriş3-removebg-preview.png";

export default function Checkout() {
  const location = useLocation();
  const [formData, setFormData] = useState(location.state || {});
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: "",
    severity: "",
  });
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
        setSnackbar({
          show: true,
          message: "Payment successful!",
          severity: "success",
        });
        setShowSuccessModal(true);
      } else {
        throw new Error("Checkout failed");
      }
    } catch (error) {
      setSnackbar({
        show: true,
        message: "An error occurred during checkout. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <div className=" w-full h-screen grid bg-gray-100">
      <Snackbar
        message={snackbar.message}
        show={snackbar.show}
        severity={snackbar.severity}
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
        <h3 className="text-lg font-semibold text-updateButton mb-4">
          Review Your Information
        </h3>
        <div className="mb-4 border-b pb-2">
          <label className="block text-sm font-bold text-signupButtonStrokeColor">
            Name On Card:
          </label>
          <p className="block text-sm font-medium text-signupCardColor">{formData.cardName}</p>
        </div>
        <div className="mb-4 border-b pb-2">
          <label className="block text-sm font-bold text-signupButtonStrokeColor">
            Credit Card Number:
          </label>
          <p className="block text-sm font-medium text-signupCardColor">{formData.cardNumber}</p>
        </div>
        <div className="mb-4 border-b pb-2">
          <label className="block text-sm font-bold text-signupButtonStrokeColor">
            Expiration Month:
          </label>
          <p className="block text-sm font-medium text-signupCardColor">{formData.expMonth}</p>
        </div>
        <div className="mb-4 border-b pb-2">
          <label className="block text-sm font-bold text-signupButtonStrokeColor">
            Expiration Year:
          </label>
          <p className="block text-sm font-medium text-signupCardColor">{formData.expYear}</p>
        </div>
        <div className="mb-4 border-b pb-2">
          <label className="block text-sm font-bold text-signupButtonStrokeColor">
            CVV:
          </label>
          <p className="block text-sm font-medium text-signupCardColor">{formData.cvv}</p>
        </div>
        <input
          type="submit"
          value="Submit Payment"
          className="mt-6 px-4 py-2 bg-loginSuccess text-white rounded-md hover:bg-green-700 text-lg cursor-pointer"
        />
      </form>
      <img
        src={pic1}
        alt="Left Image 1"
        className="absolute -bottom-16 -left-20"
      />
      <img
        src={pic2}
        alt="Right Image 1"
        className="absolute -bottom-16 -right-12"
      />
      <img
        src={pic3}
        alt="Right Image 1"
        className="absolute -top-32 -left-12"
      />
    </div>
  );
}
