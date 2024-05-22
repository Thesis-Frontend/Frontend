import React, { useState, useEffect } from "react";
import CustomDropdown from "../../../components/CustomDropdown";

const PolicyModal = ({ isOpen, onClose, onSave, data }) => {
  const [formData, setFormData] = useState({
    name: "",
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

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const newPolicy = {
      ...data,
      ...formData,
    };
    onSave(newPolicy);
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-200 rounded-xl shadow-lg p-8 w-1/4">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">Policy Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 p-2 rounded-xl"
              value={formData.name}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 w-full">
          <button
            className="bg-signupButtonStrokeColor text-white px-4 py-2 rounded-xl mr-2 w-1/2"
            onClick={handleCancel}
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

export default PolicyModal;