import React, { useState, useEffect } from "react";
import { FaTrash, FaEye } from "react-icons/fa";
import Modal from "react-modal";

const PDFUploaderViewer = ({ base64Files, onUpload, onDelete, fileName }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(fileName); // Added for file name
  const [base64FileUrl, setBase64FileUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalFileUrl, setModalFileUrl] = useState("");
  const [modalFileName, setModalFileName] = useState(""); // Added for modal file name

  useEffect(() => {
    if (base64Files.length > 0) {
      const base64 = base64Files[0];
      const byteCharacters = atob(base64.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length)
        .fill()
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setBase64FileUrl(url);
    }
  }, [base64Files]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedFileName(file.name); // Set file name
      const reader = new FileReader();
      reader.onload = function (event) {
        const fileContent = event.target.result;
        setUploadedFile(fileContent);
        onUpload(fileContent);
        setUploadedFileName(file.name); // Set a default name for pre-loaded file
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleDelete = () => {
    setUploadedFile(null);
    setBase64FileUrl(""); // Reset Blob URL
    setUploadedFileName(""); // Reset file name
    onDelete();
  };

  const handleView = (fileUrl, fileName) => {
    setModalFileUrl(fileUrl);
    setModalFileName(fileName); // Set modal file name
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalFileUrl("");
    setModalFileName(""); // Reset modal file name
  };

  return (
    <div className="pdf-uploader-viewer">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="pdf-input"
      />
      <div className="uploaded-files">
        {(uploadedFile || base64FileUrl) && (
          <div className="file-item">
            <span>{uploadedFileName}</span>
            <div className="file-actions">
              <button
                onClick={() => handleView(base64FileUrl, uploadedFileName)}
                className="view-button"
              >
                <FaEye />
              </button>
              <button onClick={handleDelete} className="delete-button">
                <FaTrash />
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="PDF Viewer"
        ariaHideApp={false}
        style={{ overlay: { zIndex: 1050 } }}
      >
        <h2>{modalFileName}</h2>
        <button onClick={closeModal}>Close</button>
        {modalFileUrl && (
          <div className="pdf-modal" style={{ height: "100vh" }}>
            <iframe
              src={modalFileUrl}
              style={{ width: "100%", height: "100%" }}
              frameBorder="0"
            ></iframe>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PDFUploaderViewer;
