import React, { useState } from "react";
import AccountInfoModal from "./AccountInfoModal";
import SessionHelper from "../../helpers/SessionHelper";

const AccountInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    SessionHelper.updateUser(updatedUser);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg dark:bg-[#161A23]">
      <header className="flex justify-between items-center bg-white dark:bg-[#2D2F39] p-4 mb-4 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-[#8A8C91]">
          Account Information
        </h1>
      </header>


      <div className="space-y-4 bg-white p-4 rounded-lg dark:bg-[#2D2F39] dark:text-white">
        <div>
          <label className="block text-gray-700 font-bold dark:text-[#8A8C91]">Fullname</label>
          <p>{user?.name}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-bold dark:text-[#8A8C91]">Email</label>
          <p>{user?.email}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-bold dark:text-[#8A8C91]">Company Name</label>
          <p>{user?.companyName}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-bold dark:text-[#8A8C91]">Sector Name</label>
          <p>{user?.sectorName}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-bold dark:text-[#8A8C91]">Password</label>
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
