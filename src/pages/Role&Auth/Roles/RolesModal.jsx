import React, { useState, useEffect } from "react";
import CustomDropdown from "../../../components/CustomDropdown";

const RolesModal = ({
  isOpen,
  onClose,
  onSave,
  data,
  options,
  formData,
  setFormData,
}) => {
  useEffect(() => {
    console.log(data);
    if (data) {
      setFormData({
        roleName: data.roleName || "",
        policyIds: data.policyIds || [],
      });
    }
  }, [data]);

  const handleChange = (name, value) => {
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const newRole = {
      ...data,
      ...formData,
    };
    onSave(newRole);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-200 rounded-xl shadow-lg p-8 w-1/4">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">Role Name</label>
            <input
              type="text"
              name="roleName"
              className="w-full border border-gray-300 p-2 rounded-xl"
              value={formData.roleName}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Policy</label>
            <div className="relative">
              <CustomDropdown
                title={"Policy"}
                options={options.policies}
                selectedValue={formData.policyIds.map((policy) =>
                  options.policies.find((policy) => policy.id === policy.id)
                )}
                onChange={(value) => handleChange("policyIds", value)}
                isMultiple={true}
              />
              
            </div>
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

export default RolesModal;
