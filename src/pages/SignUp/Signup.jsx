import React, { useState } from "react";
import SubscriptionPackages from "./SubscriptionPackages";
import GenericFormComponent from "../../components/GenericForm";
// import CompanyEmailForm from "./CompanyEmailForm";
// import DomainNameForm from "./DomainNameForm";
// import ReviewInformation from "./ReviewInformation";
// import SuccessOrRejectPage from "./SuccessOrRejectPage";

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState({
    subscriptionPackage: {},
    companyName: "",
    email: "",
    sectorName: "",
  });

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

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
            title="Company Name"
            value={signupData.companyName}
            onChange={(val)=>{handleDataChange("companyName",val)}}
            onNext={nextStep}
            onPrevious={prevStep}
            placeholder="Enter company name"
          />
        );
      case 3:
        return (
          <GenericFormComponent
            title="Company E-mail"
            value={signupData.email}
            onChange={(val)=>{handleDataChange("email",val)}}
            onNext={nextStep}
            onPrevious={prevStep}
            placeholder="Enter company name"
            type="email"
          />
        );
      case 4:
        return (
          <GenericFormComponent
            title="Sector Name"
            value={signupData.sectorName}
            onChange={(val)=>{handleDataChange("sectorName",val)}}
            onNext={nextStep}
            onPrevious={prevStep}
            placeholder="Enter company name"
            type="select"
          />
        );
      // case 5:
      //   return (
      //     <GenericFormComponent
      //       title="Company E-mail"
      //       value={signupData.companyName}
      //       onChange={handleDataChange}
      //       onNext={nextStep}
      //       onPrevious={prevStep}
      //       placeholder="Enter company name"
      //     />
      //   );

      default:
        return <div>Something went wrong</div>;
    }
  };

  return (
    <div>
      {/* <img
        src={rightImage1}
        alt="Right Image 1"
        className="absolute bottom-0 right right-image"
      /> */}
      {renderStep()}
    </div>
  );
}
