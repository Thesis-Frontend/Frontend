import React from "react";
import Modal from "react-modal";

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const DeleteModal = ({ isOpen, onRequestClose, onDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation"
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this record?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onRequestClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-md"
          >
            No
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
