import React, { useState, useEffect } from "react";

const AccountInfoModal = ({ isOpen, onClose, onSave, data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    sectorName: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        name: data.name || "",
        email: data.email || "",
        companyName: data.companyName || "",
        sectorName: data.sectorName || "",
        password: "",
      });
    }
    if (isOpen && !data) {
      setFormData({
        name: "",
        email: "",
        companyName: "",
        sectorName: "",
        password: "",
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
    const updatedUser = {
      ...data,
      ...formData,
    };
    onSave(updatedUser);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-200 rounded shadow-lg p-8 w-1/3">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">Fullname</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Company Name</label>
            <input
              type="text"
              name="companyName"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Sector Name</label>
            <input
              type="text"
              name="sectorName"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.sectorName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="bg-loginUnsuccess hover:bg-[#CA7E7D] text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-loginSuccess hover:bg-[#98E292] text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoModal;
