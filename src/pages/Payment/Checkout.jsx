import React, { useState, useEffect } from "react";
import Request from "../../helpers/Request";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Snackbar from "../../components/Snackbar";
import SuccessPage from "../../components/SuccessModal";
import pic1 from "../../assets/Giriş1-removebg-preview.png";
import pic2 from "../../assets/Giriş2-removebg-preview.png";
import pic3 from "../../assets/Giriş3-removebg-preview.png";

export default function Checkout() {
  const location = useLocation();
  const [formData, setFormData] = useState(location.state || {});
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Request(
        "post",
        "/api/subscription/customer/activate",
        null,
        { key: token }
      );

      if (response.status === 200) {
        setShowSuccessModal(true);
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      setSnackbarMessage(`An error occurred during signup. Please try again.`);
      setShowSnackbar(true);
      setSeverity("error");
    }
    setLoading(false);
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
        <h3 className="text-lg font-semibold text-updateButton mb-4">
          Review Your Information
        </h3>
        <div className="mb-4 border-b pb-2">
          <label className="block text-sm font-bold text-signupButtonStrokeColor">
            Name On Card:
          </label>
          <p className="block text-sm font-medium text-signupCardColor">
            {formData.cardName}
          </p>
        </div>
        <div className="mb-4 border-b pb-2">
          <label className="block text-sm font-bold text-signupButtonStrokeColor">
            Credit Card Number:
          </label>
          <p className="block text-sm font-medium text-signupCardColor">
            {formData.cardNumber}
          </p>
        </div>
        <div className="mb-4 border-b pb-2">
          <label className="block text-sm font-bold text-signupButtonStrokeColor">
            Expiration Month:
          </label>
          <p className="block text-sm font-medium text-signupCardColor">
            {formData.expMonth}
          </p>
        </div>
        <div className="mb-4 border-b pb-2">
          <label className="block text-sm font-bold text-signupButtonStrokeColor">
            Expiration Year:
          </label>
          <p className="block text-sm font-medium text-signupCardColor">
            {formData.expYear}
          </p>
        </div>
        <div className="mb-4 border-b pb-2">
          <label className="block text-sm font-bold text-signupButtonStrokeColor">
            CVV:
          </label>
          <p className="block text-sm font-medium text-signupCardColor">
            {formData.cvv}
          </p>
        </div>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <input
            type="submit"
            value="Submit Payment"
            className="mt-6 px-4 py-2 bg-loginSuccess text-white rounded-md hover:bg-green-700 text-lg cursor-pointer"
          />
        )}
      </form>
      <img
        src={pic1}
        alt="Left Image 1"
        className="absolute bottom-0 left-0 h-2/5 w-auto"
      />
      <img
        src={pic2}
        alt="Right Image 1"
        className="absolute bottom-0 right-0 h-2/5 w-auto"
      />
      <img
        src={pic3}
        alt="Top Image 1"
        className="absolute top-0 left-0 h-2/5 w-auto"
      />
    </div>
  );
}
