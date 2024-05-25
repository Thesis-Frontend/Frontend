import React, { useState, useEffect } from "react";
import CustomDropdown from "../../components/CustomDropdown";

const DepartmentModal = ({ isOpen, onClose, onSave, data, options }) => {
  const [formData, setFormData] = useState({
    name: "",
    departmentType: null,
    activityType: null,
    company: null,
    socialSecurityNumber: "",
    town: null,
    manager: null,
  });

  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        name: data.name || "",
        departmentType: data.departmentType || null,
        activityType: data.activityType || null,
        company: data.company || null,
        town: data.town || null,
        socialSecurityNumber: data.socialSecurityNumber || "",
        manager: data.manager || null,
      });
    }
    if (isOpen && !data) {
      setFormData({
        name: "",
        departmentType: "",
        activityType: "",
        company: "",
        town: null,
        socialSecurityNumber: "",
        manager: null,
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
    console.log(newCompany);
    onSave(newCompany);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-200 rounded shadow-lg p-8 w-1/4">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">
              Department Name
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
              Department Type
            </label>
            <CustomDropdown
              title={"department type"}
              options={options.departmentTypes}
              selectedValue={formData.departmentType?.id}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["departmentType"]: value,
                }));
              }}
            />
          </div>
          {/* TODO: burası düzeltilecek */}
          <div>
            <label className="block text-gray-700 font-bold">Company</label>
            <CustomDropdown
              title={"company"}
              options={options.departmentTypes}
              selectedValue={formData.company?.id}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["company"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Social Security Number
            </label>
            <input
              type="text"
              name="socialSecurityNumber"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.socialSecurityNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Town</label>
            <CustomDropdown
              title={"town"}
              options={options.towns}
              selectedValue={formData.town?.id}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["town"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Activity Type
            </label>
            <CustomDropdown
              title={"activity type"}
              options={options.activityTypes}
              selectedValue={formData.activityType?.id}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["activityType"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Manager</label>
            <CustomDropdown
              title={"Manager"}
              options={options.managers}
              selectedValue={formData.manager?.id}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["manager"]: value,
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
          <button
            className={`${
              data?.id ? "bg-loginSuccess hover:bg-[#98E292]" : "bg-createButtons"
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

export default DepartmentModal;
