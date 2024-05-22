import React, { useState, useEffect } from "react";

const CompanyModal = ({ isOpen, onClose, onSave, data }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    city: "",
    companyType: "",
    taxOffice: "",
    taxNumber: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        companyName: data.companyName || "",
        city: data.city || "",
        companyType: data.companyType || "",
        taxOffice: data.taxOffice || "",
        taxNumber: data.taxNumber || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const newCompany = {
      ...data,
      ...formData,
    };
    onSave(newCompany);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-200 rounded-xl shadow-lg p-8 w-1/4">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">Company Name</label>
            <input
              type="text"
              name="companyName"
              className="w-full border border-gray-300 p-2 rounded-xl"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">City</label>
            <input
              type="text"
              name="city"
              className="w-full border border-gray-300 p-2 rounded-xl"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Company Type</label>
            <input
              type="text"
              name="companyType"
              className="w-full border border-gray-300 p-2 rounded-xl"
              value={formData.companyType}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Tax Office</label>
            <input
              type="text"
              name="taxOffice"
              className="w-full border border-gray-300 p-2 rounded-xl"
              value={formData.taxOffice}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Tax ID</label>
            <input
              type="text"
              name="taxNumber"
              className="w-full border border-gray-300 p-2 rounded-xl"
              value={formData.taxNumber}
              onChange={handleChange}
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
