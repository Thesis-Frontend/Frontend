import React, { useState, useEffect } from "react";

const CompanyModal = ({ isOpen, onClose, onSave, data }) => {
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [taxOffice, setTaxOffice] = useState("");
  const [taxNumber, setTaxNumber] = useState("");

  useEffect(() => {
    if (data) {
      setCompanyName(data.companyName || "");
      setCity(data.city || "");
      setCompanyType(data.companyType || "");
      setTaxOffice(data.taxOffice || "");
      setTaxNumber(data.taxNumber || "");
    }
  }, [data]);

  const handleSave = () => {
    const newCompany = {
      ...data,
      companyName,
      city,
      companyType,
      taxOffice,
      taxNumber,
    };
    onSave(newCompany);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-200 rounded-xl shadow-lg p-8 w-1/4">
        {/* <h2 className="text-xl font-bold mb-4">
          {data?.id ? "Update Company" : "Create a new company"}
        </h2> */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">Company Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-xl"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">City</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-xl"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Company Type</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-xl"
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Tax Office</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-xl"
              value={taxOffice}
              onChange={(e) => setTaxOffice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Tax ID</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-xl"
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 w-full">
          <button
            className="bg-signupButtonStrokeColor text-white px-4 py-2 rounded-xl mr-2 w-1/2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`${
              data?.id ? "bg-updateButton" : "bg-createButtons"
            } text-white px-4 py-2 rounded-xl w-1/2`}
            onClick={handleSave}
          >
            {data?.id ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
