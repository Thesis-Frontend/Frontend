import React, { useState, useEffect } from "react";
import CustomDropdown from "../../../components/CustomDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEye, FaTrash, FaUpload } from "react-icons/fa";

export default function CompleteModal({
  isOpen,
  onClose,
  onSave,
  data,
  options,
  formData,
  setFormData,
  loading,
  filesToSend,
  setFilesToSend,
}) {
  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        startTime: data.startTime ? new Date(data.startTime) : "",
        endTime: data.endTime ? new Date(data.endTime) : "",
        attendees: data.attendees || [],
        files: data.files || [],
      });
    }
    if (isOpen && !data) {
      setFormData({
        startTime: "",
        endTime: "",
        attendees: [],
        files: [],
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      filename: file.name,
      base64: URL.createObjectURL(file),
    }));
    setFilesToSend((prev) => [...prev, ...e.target.files]);
    setFormData((prevData) => ({
      ...prevData,
      files: [...prevData.files, ...files],
    }));
  };

  const handleFileDelete = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      files: prevData.files.filter((_, i) => i !== index),
    }));
    setFilesToSend((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const newRecord = {
      id: data?.id,
      ...formData,
      startTime: formData.startTime ? formData.startTime.toISOString() : null,
      endTime: formData.endTime ? formData.endTime.toISOString() : null,
    };
    onSave(newRecord);
  };

  const fileInputRef = React.createRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 rounded-lg">
      <div className="bg-gray-200 rounded shadow-lg p-8 w-1/4 overflow-y-scroll">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">Start Time</label>
            <DatePicker
              selected={formData.startTime}
              onChange={(date) =>
                setFormData((prevData) => ({
                  ...prevData,
                  startTime: date,
                }))
              }
              dateFormat="dd/MM/yyyy"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">End Time</label>
            <DatePicker
              selected={formData.endTime}
              onChange={(date) =>
                setFormData((prevData) => ({
                  ...prevData,
                  endTime: date,
                }))
              }
              dateFormat="dd/MM/yyyy"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Attendees</label>
            <CustomDropdown
              title={"attendees"}
              isMultiple={true}
              options={options.attendees}
              selectedValue={formData.attendees.map((inst) =>
                options.attendees.find((opt) => opt.id === inst)
              )}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  attendees: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Upload Files
            </label>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={handleButtonClick}
              className="w-full border border-gray-300 p-2 rounded bg-white flex items-center justify-center space-x-2 hover:bg-gray-100"
            >
              <FaUpload className="text-gray-500" />
              <span className="text-gray-700">Choose Files</span>
            </button>
            <ul className="mt-4">
              {formData.files.map((file, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{file.filename}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => window.open(file.base64, "_blank")}
                      className="text-blue-500"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleFileDelete(index)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-end mt-6 w-full">
          <button
            className="bg-loginUnsuccess hover:bg-cancelhover text-white px-4 py-2 rounded mr-2 w-1/2"
            onClick={onClose}
          >
            Cancel
          </button>
          {loading ? (
            <div className="w-1/2 flex justify-center">
              <div className="loader"></div>
            </div>
          ) : (
            <button
              className={`${
                data?.id ? "bg-updateButton hover:bg-updatehover" : "bg-createButtons"
              } text-white px-4 py-2 rounded w-1/2`}
              onClick={handleSave}
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
