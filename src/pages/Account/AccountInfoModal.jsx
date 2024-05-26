import React, { useState, useEffect } from "react";

const AccountInfoModal = ({ isOpen, onClose, onSave, data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    sectorName: "",
    password: "",
    package: "Silver",
  });
  const [hoveredPackage, setHoveredPackage] = useState(null);

  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        name: data.name || "",
        email: data.email || "",
        companyName: data.companyName || "",
        sectorName: data.sectorName || "",
        password: "",
        package: data.package || "Silver",
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

  const handlePackageChange = (selectedPackage) => {
    setFormData((prevData) => ({
      ...prevData,
      package: selectedPackage,
    }));
  };

  const handleMouseEnter = (pkg) => {
    setHoveredPackage(pkg);
  };

  const handleMouseLeave = () => {
    setHoveredPackage(null);
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
          <div>
            <label className="block text-gray-700 font-bold">Select Package</label>
            <div className="flex space-x-4 mt-2">
              {["Bronze", "Silver", "Gold"].map((pkg) => (
                <div
                  key={pkg}
                  className={`relative w-16 h-16 rounded-full flex justify-center items-center cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:shadow-lg ${
                    formData.package === pkg
                      ? "border-4 border-green-500"
                      : "border-4 border-transparent"
                  } ${hoveredPackage === pkg ? "scale-110" : ""}`}
                  style={{
                    backgroundColor:
                      pkg === "Bronze" ? "#CD7F32" : pkg === "Silver" ? "#C0C0C0" : "#FFD700",
                  }}
                  onClick={() => handlePackageChange(pkg)}
                  onMouseEnter={() => handleMouseEnter(pkg)}
                  onMouseLeave={handleMouseLeave}
                >
                  {formData.package === pkg && <span className="text-white font-bold">✓</span>}
                  {hoveredPackage === pkg && (
                    <div className="absolute top-full mt-2 w-48 p-4 bg-white rounded-lg shadow-xl text-gray-800 text-left z-10 transition-opacity duration-300 opacity-90">
                      {pkg === "Bronze" && (
                        <>
                          <p className="font-semibold">User quota: 1000</p>
                          <p>Data storage: 5GB</p>
                          <p>Basic customer support</p>
                          <p className="text-lg font-bold">$17</p>
                        </>
                      )}
                      {pkg === "Silver" && (
                        <>
                          <p className="font-semibold">User quota: 5000</p>
                          <p>Data storage: 15GB</p>
                          <p>Priority customer support</p>
                          <p className="text-lg font-bold">$34</p>
                        </>
                      )}
                      {pkg === "Gold" && (
                        <>
                          <p className="font-semibold">User quota: 10000</p>
                          <p>Data storage: 30GB</p>
                          <p>Premium customer support</p>
                          <p className="text-lg font-bold">$50</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
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
