import React, { useState, useEffect } from "react";

const AccountInfoModal = ({ isOpen, onClose, onSave, data }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    companyName: "",
    sectorName: "",
    password: "",
    package: "Silver",
    duration: "1 year",
  });
  const [hoveredPackage, setHoveredPackage] = useState(null);

  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        name: data.name || "",
        surname: data.surname || "",
        email: data.email || "",
        companyName: data.companyName || "",
        sectorName: data.sector || "",
        password: "",
        package: data.package || "Silver",
        duration: data.duration || "1 year",
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

  const handleDurationChange = (duration) => {
    setFormData((prevData) => ({
      ...prevData,
      duration: duration,
    }));
  };

  const getPackageDetails = (pkg, duration) => {
    const details = {
      Bronze: {
        "1 year": {
          quota: "1000",
          storage: "5GB",
          support: "Basic customer support",
          price: "$10",
        },
        "2 year": {
          quota: "1000",
          storage: "5GB",
          support: "Basic customer support",
          price: "$17",
        },
      },
      Silver: {
        "1 year": {
          quota: "5000",
          storage: "15GB",
          support: "Priority customer support",
          price: "$20",
        },
        "2 year": {
          quota: "5000",
          storage: "15GB",
          support: "Priority customer support",
          price: "$34",
        },
      },
      Gold: {
        "1 year": {
          quota: "10000",
          storage: "30GB",
          support: "Premium customer support",
          price: "$30",
        },
        "2 year": {
          quota: "10000",
          storage: "30GB",
          support: "Premium customer support",
          price: "$50",
        },
      },
    };
    return details[pkg][duration];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-200 rounded shadow-lg p-8 w-1/3">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Surname</label>
            <input
              type="text"
              name="surname"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.surname}
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
            <label className="block text-gray-700 font-bold">
              Company Name
            </label>
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
            <label className="block text-gray-700 font-bold">
              Select Package
            </label>
            <div className="flex space-x-4 mt-2">
              {["Bronze", "Silver", "Gold"].map((pkg) => (
                <div
                  key={pkg}
                  className={`relative w-16 h-16 rounded-full flex justify-center items-center cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:shadow-lg ${
                    formData.package === pkg
                      ? "border-4 border-green-500"
                      : "border-4 border-transparent"
                  }`}
                  style={{
                    backgroundColor:
                      pkg === "Bronze"
                        ? "#CD7F32"
                        : pkg === "Silver"
                        ? "#C0C0C0"
                        : "#FFD700",
                  }}
                  onClick={() => handlePackageChange(pkg)}
                  onMouseEnter={() => handleMouseEnter(pkg)}
                  onMouseLeave={handleMouseLeave}
                >
                  {formData.package === pkg && (
                    <span className="text-white font-bold">✓</span>
                  )}
                  {hoveredPackage === pkg && (
                    <div
                      className="absolute bottom-full mb-4 w-48 p-4 bg-white rounded-lg shadow-xl text-gray-800 text-left z-10 transition-opacity duration-300 opacity-90"
                      onMouseEnter={() => handleMouseEnter(pkg)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {pkg && (
                        <>
                          <p className="font-semibold">
                            User quota:{" "}
                            {getPackageDetails(pkg, formData.duration).quota}
                          </p>
                          <p>
                            Data storage:{" "}
                            {getPackageDetails(pkg, formData.duration).storage}
                          </p>
                          <p>
                            {getPackageDetails(pkg, formData.duration).support}
                          </p>
                          <p className="text-lg font-bold">
                            {getPackageDetails(pkg, formData.duration).price}
                          </p>
                        </>
                      )}
                      <div className="flex justify-center space-x-2 mt-4">
                        <div
                          className={`w-6 h-6 rounded-full cursor-pointer flex items-center justify-center ${
                            formData.duration === "1 year"
                              ? "bg-green-500 text-white"
                              : "bg-gray-300"
                          }`}
                          onClick={() => handleDurationChange("1 year")}
                        >
                          1
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full cursor-pointer flex items-center justify-center ${
                            formData.duration === "2 year"
                              ? "bg-green-500 text-white"
                              : "bg-gray-300"
                          }`}
                          onClick={() => handleDurationChange("2 year")}
                        >
                          2
                        </div>
                      </div>
                      <div className="flex justify-center space-x-2">
                        <span className="text-sm">1 year</span>
                        <span className="text-sm">2 year</span>
                      </div>
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
