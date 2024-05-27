import React, { useState, useEffect } from "react";
import CustomDropdown from "../../../components/CustomDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PDFUploaderViewer from "../../../components/PDFUploaderViewer"; // Import the PDF uploader/viewer component

const RecordsModal = ({
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
        departmentId: data.departmentId || null,
        typeId: data.typeId || null,
        status: data.status || null,
        plannedTime: data.plannedTime || "",

        isOnline: data.isOnline || null,
        meetingLink: data.meetingLink || "",
        instructors: data.instructors || [],
      });
    }
    if (isOpen && !data) {
      setFormData({
        name: "",
        departmentId: null,
        typeId: null,
        status: null,
        plannedTime: "",
        isOnline: null,
        meetingLink: "",
        instructors: [],
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
    const newRecord = {
      id: data?.id,
      ...formData,
    };
    onSave(newRecord);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 rounded-lg">
      <div className="bg-gray-200 rounded shadow-lg p-8 w-1/4 h-3/4 overflow-y-scroll">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">Record Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Department Name
            </label>
            <CustomDropdown
              title={"department name"}
              options={options.departments}
              disabled={data?.id}
              selectedValue={formData.departmentId}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  departmentId: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Training Type
            </label>
            <CustomDropdown
              title={"training type"}
              options={options.trainingTypes}
              selectedValue={formData.typeId}
              disabled={data?.id}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  typeId: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Planned Time
            </label>
            <DatePicker
              selected={formData.plannedTime}
              onChange={(date) =>
                setFormData((prevData) => ({
                  ...prevData,
                  plannedTime: date,
                }))
              }
              dateFormat="dd/MM/yyyy"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Is Online?</label>
            <select
              onfocus="this.size=10;"
              onblur="this.size=0;"
              onchange="this.size=1; this.blur();"
              name="isOnline"
              className="custom-select w-full border border-gray-300 p-2 rounded text-lg"
              value={formData.isOnline}
              onChange={handleChange}
              style={{ boxShadow: "none" }} // Remove border when options are displayed
            >
              <option value="" className="p-4 text-lg">
                Enter is online
              </option>
              <option value="true" className="p-4 text-lg">
                True
              </option>
              <option value="false" className="p-4 text-lg">
                False
              </option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold">
              Meeting Link
            </label>
            <input
              type="text"
              name="meetingLink"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.meetingLink}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Instructors</label>
            <CustomDropdown
              title={"instructors"}
              isMultiple={true}
              options={options.instructor}
              selectedValue={formData.instructors.map((inst) =>
                options.instructor.find((opt) => opt.id === inst)
              )}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  instructors: value,
                }));
              }}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 w-full">
          <button
            className="bg-signupButtonStrokeColor text-white px-4 py-2 rounded mr-2 w-1/2"
            onClick={onClose}
          >
            Cancel
          </button>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <button
              className={`${
                data?.id ? "bg-updateButton" : "bg-createButtons"
              } text-white px-4 py-2 rounded w-1/2`}
              onClick={handleSave}
            >
              {data?.id ? "Update" : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordsModal;
