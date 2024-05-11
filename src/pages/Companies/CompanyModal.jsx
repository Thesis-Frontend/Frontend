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
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">Yeni Şirket Oluştur</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Şirket Adı</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Şehir</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Şirket Tipi</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Vergi Dairesi</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={taxOffice}
              onChange={(e) => setTaxOffice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Vergi Kimlik No</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            İptal
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
