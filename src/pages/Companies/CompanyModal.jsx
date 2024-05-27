import React, { useState, useEffect } from "react";
import CustomDropdown from "../../components/CustomDropdown";

const CompanyModal = ({
  isOpen,
  onClose,
  onSave,
  data,
  options,
  formData,
  setFormData,
  loading,
}) => {
  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        name: data.name || "",
        shortName: data.shortName || "",
        companyTypeId: data.companyType?.id || null,
        taxOffice: data.taxOffice || "",
        taxIdentificationNumber: data.taxIdentificationNumber || "",
        managerId: data.manager?.id || null,
      });
    }
    if (isOpen && !data) {
      setFormData({
        name: "",
        shortName: "",
        companyTypeId: null,
        taxOffice: "",
        taxIdentificationNumber: "",
        managerId: null,
      });
    }
  }, [data, isOpen]);

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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 rounded-lg">
      <div className="bg-gray-200 rounded shadow-lg p-8 w-1/4">
        <div className="space-y-4 ">
          <div>
            <label className="block text-gray-700 font-bold ">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Company Short Name
            </label>
            <input
              type="text"
              name="shortName"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.shortName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Company Type
            </label>
            <CustomDropdown
              title={"Company Type"}
              options={options.companyTypes}
              selectedValue={formData.companyTypeId}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["companyTypeId"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Tax Office</label>
            <input
              type="text"
              name="taxOffice"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.taxOffice}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Tax ID</label>
            <input
              type="text"
              name="taxIdentificationNumber"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.taxIdentificationNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Manager</label>
            <CustomDropdown
              title={"manager"}
              options={options.managers}
              selectedValue={formData.managerId?.id}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["managerId"]: value,
                }));
              }}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 w-full">
          <button
            className="bg-loginUnsuccess hover:bg-[#CA7E7D] text-white px-4 py-2 rounded mr-2 w-1/2"
            onClick={onClose}
          >
            Cancel
          </button>
          {loading ? (
            <div className="w-1/2 flex justify-center">
              <div className="loader"></div>
            </div>
          ) : (
            <button
              className={`${
                data?.id ? "bg-updateButton" : "bg-createButtons"
              } text-white px-4 py-2 rounded w-1/2`}
              onClick={handleSave}
            >
              {data?.id ? "Update" : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
