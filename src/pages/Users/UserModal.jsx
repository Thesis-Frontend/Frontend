import React, { useState, useEffect } from "react";
import CustomDropdown from "../../components/CustomDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserModal = ({
  isOpen,
  onClose,
  onSave,
  data,
  options,
  formData,
  setFormData,
  loading,
}) => {
  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        name: data.name || "",
        surname: data.surname || "",
        title: data.title || "",
        email: data.email || "",
        identityNumber: data.identityNumber || "",
        phoneNumber: data.phoneNumber || "",
        departmentId: data.department?.id || null,
        managerId: data.manager?.id || null,
        roleId: data.role?.id || null,
        educationStatusId: data.educationStatus?.id || null,
        marital: data.marital || null,
        gender: data.gender || null,
        startDateOfWork: new Date(data.startDateOfWork) || null,
        endDateOfWork: new Date(data.endDateOfWork) || null,
        responsibleRegionIds: data.responsibleRegions || [],
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
        departmentId: null,
        managerId: null,
        roleId:null,
        educationStatusId: null,
        marital: null,
        gender: null,
        startDateOfWork: null,
        endDateOfWork: null,
        responsibleRegionIds: [],
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
          {/* <div>
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
          </div> */}
          <div>
            <label className="block text-gray-700 font-bold">Department</label>
            <CustomDropdown
              title={"department"}
              options={options.departments}
              selectedValue={formData.departmentId}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["departmentId"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Title</label>
            <input
              type="text"
              name="title"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Role</label>
            <CustomDropdown
              title={"Role"}
              options={options.roles}
              selectedValue={formData.roleId}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["roleId"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Manager</label>
            <CustomDropdown
              title={"Manager"}
              options={options.managers}
              selectedValue={formData.managerId}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["managerId"]: value,
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
              selectedValue={formData.educationStatusId}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["educationStatusId"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Marital</label>
            <select
              onfocus="this.size=10;"
              onblur="this.size=0;"
              onchange="this.size=1; this.blur();"
              name="marital"
              className="custom-select w-full border border-gray-300 p-2 rounded text-lg"
              value={formData.marital}
              onChange={handleChange}
              style={{ boxShadow: "none" }} // Remove border when options are displayed
            >
              <option value="" className="p-4 text-lg">
                Select marital
              </option>
              <option value="true" className="p-4 text-lg">
                Married
              </option>
              <option value="false" className="p-4 text-lg">
                Single
              </option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Gender</label>
            <select
              onfocus="this.size=10;"
              onblur="this.size=0;"
              onchange="this.size=1; this.blur();"
              name="gender"
              className="custom-select w-full border border-gray-300 p-2 rounded text-lg"
              value={formData.gender}
              onChange={handleChange}
              style={{ boxShadow: "none" }} // Remove border when options are displayed
            >
              <option value="" className="p-4 text-lg">
                Select gender
              </option>
              <option value="true" className="p-4 text-lg">
                Woman
              </option>
              <option value="false" className="p-4 text-lg">
                Man
              </option>
            </select>
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
              selectedValue={formData?.responsibleRegionIds?.map((inst) =>
                options?.responsibleRegions?.find((opt) => opt.id === inst)
              )}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["responsibleRegionIds"]: value,
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
              data?.id
                ? "bg-updateButton hover:bg-updatehover"
                : "bg-createButtons"
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
