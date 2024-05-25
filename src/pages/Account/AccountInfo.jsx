import React, { useState } from "react";
import AccountInfoModal from "./AccountInfoModal";
import SessionHelper from "../../helpers/SessionHelper";

const AccountInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const user = SessionHelper.getUser();
  const user = {
    name: "Sude Nur",
    email: "Sudenur@gmail.com",
    companyName: "SCT",
    sectorName: "Energy",
    password: "12345678",
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSave = (updatedUser) => {
    // Güncellenmiş kullanıcı bilgilerini kaydet
    SessionHelper.updateUser(updatedUser);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Account Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold">Fullname</label>
          <p>{user?.name}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Email</label>
          <p>{user?.email}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Company Name</label>
          <p>{user?.companyName}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Sector Name</label>
          <p>{user?.sectorName}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Password</label>
          <p>*******</p>
        </div>
        <button
          onClick={handleEditClick}
          className="bg-loginSuccess hover:bg-[#98E292] text-white px-4 py-2 rounded"
        >
          Edit
        </button>
      </div>
      {isModalOpen && (
        <AccountInfoModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleModalSave}
          data={user}
        />
      )}
    </div>
  );
};

export default AccountInfo;
