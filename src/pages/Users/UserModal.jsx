import React, { useState, useEffect } from "react";
import CustomDropdown from "../../components/CustomDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserModal = ({ isOpen, onClose, onSave, data, options }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    title: "",
    email: "",
    identityNumber: "",
    phoneNumber: "",
    department: null,
    manager: null,
    company: null,
    educationStatus: null,
    marital: null,
    gender: null,
    startDateOfWork: null,
    endDateOfWork: null,
    responsibleRegions: [],
  });

  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        name: data.name || "",
        surname: data.surname || "",
        title: data.title || "",
        email: data.email || "",
        identityNumber: data.identityNumber || "",
        phoneNumber: data.phoneNumber || "",
        department: data.department || null,
        manager: data.manager || null,
        company: data.company || null,
        educationStatus: data.educationStatus || null,
        marital: data.marital || null,
        gender: data.gender || null,
        startDateOfWork: data.startDateOfWork || null,
        endDateOfWork: data.endDateOfWork || null,
        responsibleRegions: data.responsibleRegions || [],
      });
    }
    if (isOpen && !data) {
      setFormData({
        name: "",
        surname: "",
        title: "",
        email: "",
        identityNumber: "",
        phoneNumber: "",
        department: null,
        manager: null,
        company: null,
        educationStatus: null,
        marital: null,
        gender: null,
        startDateOfWork: null,
        endDateOfWork: null,
        responsibleRegions: [],
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
      startDateOfWork: formData.startDateOfWork
        ? formData.startDateOfWork.toISOString()
        : null,
      endDateOfWork: formData.endDateOfWork
        ? formData.endDateOfWork.toISOString()
        : null,
    };
    console.log(newCompany);
    onSave(newCompany);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-200 rounded shadow-lg p-8 w-1/4 h-3/4 overflow-y-scroll">
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
            <label className="block text-gray-700 font-bold">Company</label>
            <CustomDropdown
              title={"department"}
              options={options.companies}
              selectedValue={
                formData.company ? formData.company?.id : formData.department
              }
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["company"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Department</label>
            <CustomDropdown
              title={"department"}
              options={options.departments}
              selectedValue={
                formData.department
                  ? formData.department?.id
                  : formData.department
              }
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["department"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Title</label>
            <CustomDropdown
              title={"title"}
              options={options.title}
              selectedValue={
                formData.title ? formData.title?.id : formData.department
              }
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["title"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Manager</label>
            <CustomDropdown
              title={"Manager"}
              options={options.managers}
              selectedValue={formData.manager}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["manager"]: value,
                }));
              }}
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
              Identity Number
            </label>
            <input
              type="text"
              name="identityNumber"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.identityNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Education status
            </label>
            <CustomDropdown
              title={"education status"}
              options={options.educationStatus}
              selectedValue={
                formData.activityType
                  ? formData.activityType?.id
                  : formData.activityType
              }
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["educationStatus"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Marital</label>
            <CustomDropdown
              title={"marital"}
              options={options.marital}
              selectedValue={
                formData.activityType
                  ? formData.activityType?.id
                  : formData.activityType
              }
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["marital"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Gender</label>
            <CustomDropdown
              title={"gender"}
              options={options.gender}
              selectedValue={formData.gender}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["gender"]: value,
                }));
              }}
            />
          </div>
          {/* TODO: burası düzeltilecek */}
          {/* <div>
              <label className="block text-gray-700 font-bold">Company</label>
              <CustomDropdown
                title={"Company"}
                options={options.departmentTypes}
                selectedValue={formData.departmentType?.id}
                onChange={(value) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    ["departmentType"]: value,
                  }));
                }}
              />
            </div> */}
          <div>
            <label className="block text-gray-700 font-bold">
              Start Date of Work
            </label>
            <DatePicker
              selected={formData.startDateOfWork}
              onChange={(date) =>
                setFormData((prevData) => ({
                  ...prevData,
                  ["startDateOfWork"]: date,
                }))
              }
              dateFormat="dd/MM/yyyy"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              End Date of Work
            </label>
            <DatePicker
              selected={formData.endDateOfWork}
              onChange={(date) =>
                setFormData((prevData) => ({
                  ...prevData,
                  ["endDateOfWork"]: date,
                }))
              }
              dateFormat="dd/MM/yyyy"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Responsible Regions
            </label>
            <CustomDropdown
              title={"responsible regions"}
              options={options.responsibleRegions}
              isMultiple
              // selectedValue={
              // }
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["responsibleRegions"]: value,
                }));
              }}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 w-full">
          <button
            className="bg-loginUnsuccess hover:bg-cancelhover text-white px-4 py-2 rounded mr-2 w-1/2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`${
              data?.id ? "bg-updateButton hover:bg-updatehover" : "bg-createButtons" 
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

export default UserModal;
