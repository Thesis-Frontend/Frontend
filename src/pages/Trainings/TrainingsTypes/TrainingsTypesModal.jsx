import React, { useState, useEffect } from "react";
import CustomDropdown from "../../../components/CustomDropdown";

const TrainingsTypesModal = ({ isOpen, onClose, onSave, data, options }) => {
  const [formData, setFormData] = useState({
    name: "",
    company: null,
  });

  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        name: data.name || "",
      });
    }
    if (isOpen && !data) {
      setFormData({
        name: "",
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
              Training Type Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {/* <div>
            <label className="block text-gray-700 font-bold">
              Company Name
            </label>
            <CustomDropdown
              title={"company name"}
              options={options.companies}
              selectedValue={formData.companies?.id}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["company"]: value,
                }));
              }}
            />
          </div> */}
        </div>
        <div className="flex justify-end mt-6 w-full">
          <button
            className="bg-loginUnsuccess hover:bg-cancelhover text-white px-4 py-2 rounded mr-2 w-1/2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`${
              data?.id ? "bg-updateButton hover:bg-updatehover" : "bg-createButtons"
            } text-white px-4 py-2 rounded w-1/2`}
            onClick={handleSave}
          >
            {data?.id ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingsTypesModal;
