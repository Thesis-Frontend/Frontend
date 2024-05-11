import React, { useState } from "react";
import SubscriptionPackages from "./SubscriptionPackages";
import GenericFormComponent from "../../components/GenericForm";
import ReviewInformation from "./ReviewInformation";
import SuccessPage from "../../components/SuccessModal";
import NotFound from "../../components/NotFound";
import pic1 from "../../assets/Giriş1-removebg-preview.png";
import pic2 from "../../assets/Giriş2-removebg-preview.png";
import pic3 from "../../assets/Giriş3-removebg-preview.png";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState({
    subscriptionPackage: {},
    name: "",
    surname: "",
    companyName: "",
    email: "",
    sectorName: "",
  });

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const navigate = useNavigate();

  const handleDataChange = (field, value) => {
    setSignupData({ ...signupData, [field]: value });
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
            placeholder="Enter company name"
            type="email"
          />
        );
      case 6:
        return (
          <GenericFormComponent
            title="Sector Name"
            value={signupData.sectorName}
            onChange={(val) => {
              handleDataChange("sectorName", val);
            }}
            onNext={nextStep}
            onPrevious={prevStep}
            placeholder="Enter company name"
            type="select"
            options={["EDC", "WATER", "ENERGY"]}
          />
        );
      // Part of the Signup component

      case 7:
        return (
          <ReviewInformation
            data={signupData}
            onEdit={() => setCurrentStep(1)} // This could be set to go back to any specific step
            onSubmit={() => {
              console.log("Submit all data here", signupData);
              nextStep(); // Assuming nextStep leads to the success or confirmation page
            }}
            onPrevious={prevStep}
          />
        );

      case 8:
        return (
          <SuccessPage
            message="Ödeminiz başarıyla gerçekleşmiştir. Mailinize gelen kullanıcı adı ve şifre ile sisteme giriş yapabilirsiniz."
            onReturnHome={() => {
              navigate("/");
            }}
            title={"Teşekkürler!"}
            buttonName={"Ana sayfaya dön"}
          />
        );

      default:
        return <NotFound />;
    }
  };

  return (
    <div className="relative max-h-screen overflow-hidden bg-landingBackgroundColor">
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
