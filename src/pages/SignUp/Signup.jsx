import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubscriptionPackages from "./SubscriptionPackages";
import GenericFormComponent from "../../components/GenericForm";
import ReviewInformation from "./ReviewInformation";
import SuccessPage from "../../components/SuccessModal";
import NotFound from "../../components/NotFound";
import Snackbar from "../../components/Snackbar"; // Import your custom Snackbar
import pic1 from "../../assets/Giriş1-removebg-preview.png";
import pic2 from "../../assets/Giriş2-removebg-preview.png";
import pic3 from "../../assets/Giriş3-removebg-preview.png";

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState({
    subscriptionPackage: {},
    name: "",
    surname: "",
    companyName: "",
    email: "",
    password: "",
    sectorName: "",
  });

  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const options = [
    { id: 1, name: "EDC" },
    { id: 2, name: "WATER" },
    { id: 3, name: "ENERGY" },
  ];

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const navigate = useNavigate();

  const handleDataChange = (field, value) => {
    setSignupData({ ...signupData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (response.status === 200) {
        setShowSuccessModal(true);
        setSnackbarMessage(
          `An error occurred during signup. Please try again.`
        );
        setShowSnackbar(true);
        setSeverity("success");
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      setSnackbarMessage(`An error occurred during signup. Please try again.`);
      setShowSnackbar(true);
      setSeverity("error");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SubscriptionPackages
            onSelectPackage={(pkg) => {
              handleDataChange("subscriptionPackage", pkg);
              nextStep();
            }}
          />
        );
      case 2:
        return (
          <GenericFormComponent
            title="Name"
            value={signupData.name}
            onChange={(val) => {
              handleDataChange("name", val);
            }}
            onNext={nextStep}
            onPrevious={prevStep}
            placeholder="Enter name"
            type="text"
          />
        );
      case 3:
        return (
          <GenericFormComponent
            title="Surname"
            value={signupData.surname}
            onChange={(val) => {
              handleDataChange("surname", val);
            }}
            onNext={nextStep}
            onPrevious={prevStep}
            placeholder="Enter surname"
            type="text"
          />
        );
      case 4:
        return (
          <GenericFormComponent
            title="Company Name"
            value={signupData.companyName}
            onChange={(val) => {
              handleDataChange("companyName", val);
            }}
            onNext={nextStep}
            onPrevious={prevStep}
            placeholder="Enter company name"
            type="text"
          />
        );
      case 5:
        return (
          <GenericFormComponent
            title="Company E-mail"
            value={signupData.email}
            onChange={(val) => {
              handleDataChange("email", val);
            }}
            onNext={nextStep}
            onPrevious={prevStep}
            placeholder="Enter company email"
            type="email"
          />
        );
      case 6:
        return (
          <GenericFormComponent
            title="Password"
            value={signupData.password}
            onChange={(val) => {
              handleDataChange("password", val);
            }}
            onNext={nextStep}
            onPrevious={prevStep}
            placeholder="Enter password"
            type="password"
          />
        );
      case 7:
        return (
          <GenericFormComponent
            title="Sector Name"
            value={signupData.sectorName}
            onChange={(val) => {
              handleDataChange("sectorName", val);
            }}
            onNext={nextStep}
            onPrevious={prevStep}
            placeholder="Enter sector name"
            type="select"
            options={options}
          />
        );
      case 8:
        return (
          <ReviewInformation
            data={signupData}
            onEdit={() => setCurrentStep(1)} // This could be set to go back to any specific step
            onSubmit={handleSubmit}
            onPrevious={prevStep}
            options={options}
          />
        );
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="relative max-h-screen overflow-hidden bg-landingBackgroundColor">
      <Snackbar
        message={snackbarMessage}
        show={showSnackbar}
        setShow={setShowSnackbar}
        severity={severity}
      />
      {showSuccessModal && (
        <SuccessPage
          message="An activation link has been sent to your email account."
          title="Congratulations"
          onReturnHome={() => {
            navigate("/welcome");
          }}
          buttonName={"Go to Home Page"}
        />
      )}
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
      {renderStep()}
    </div>
  );
}
