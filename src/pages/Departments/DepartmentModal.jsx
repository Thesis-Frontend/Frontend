import React, { useState, useEffect } from "react";
import CustomDropdown from "../../components/CustomDropdown";

const DepartmentModal = ({
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
        departmentTypeId: data.departmentType?.id || null,
        activityTypeId: data.activityType?.id || null,
        companyId: data.company?.id || null,
        townId: data.town?.id || null,
        socialSecurityNumber: data.socialSecurityNumber || "",
        managerId: data.manager?.id || null,
        activityTownIds: data.activityTowns?.map(region => region.id) || [],
        parentDepartmentIds: data.parentDepartments?.map(region => region.id) || [],
      });
    }
    if (isOpen && !data) {
      setFormData({
        name: "",
        departmentTypeId: null,
        activityTypeId: null,
        companyId: null,
        townId: null,
        socialSecurityNumber: "",
        managerId: null,
        activityTownIds: [],
        parentDepartmentIds: [],
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
    };
    onSave(newCompany);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-200 rounded shadow-lg p-8 w-1/4 h-3/4 overflow-y-scroll">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">
              Department Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData?.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Department Type
            </label>
            <CustomDropdown
              title={"department type"}
              options={options?.departmentTypes}
              selectedValue={formData?.departmentTypeId}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["departmentTypeId"]: value,
                }));
              }}
            />
          </div>
          {/* TODO: burası düzeltilecek */}
          <div>
            <label className="block text-gray-700 font-bold">Company</label>
            <CustomDropdown
              title={"company"}
              options={options?.company}
              selectedValue={formData?.companyId}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["companyId"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Social Security Number
            </label>
            <input
              type="text"
              name="socialSecurityNumber"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData?.socialSecurityNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Town</label>
            <CustomDropdown
              title={"town"}
              options={options?.towns}
              selectedValue={formData?.townId}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["townId"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Activity Type
            </label>
            <CustomDropdown
              title={"activity type"}
              options={options.activityTypes}
              selectedValue={formData?.activityTypeId}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["activityTypeId"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Activity Towns
            </label>
            <CustomDropdown
              title={"Activity Towns"}
              isMultiple={true}
              options={options.towns}
              selectedValue={formData?.activityTownIds?.map((inst) =>
                options?.towns?.find((opt) => opt.id === inst)
              )}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  activityTownIds: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Manager</label>
            <CustomDropdown
              title={"Manager"}
              options={options.managers}
              selectedValue={formData?.managerId}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ["managerId"]: value,
                }));
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Parent Departments
            </label>
            <CustomDropdown
              title={"Parent Departments"}
              isMultiple={true}
              options={options.parentDepartments}
              selectedValue={formData?.parentDepartmentIds?.map((inst) =>
                options?.parentDepartments?.find((opt) => opt.id === inst)
              )}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  parentDepartmentIds: value,
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
          {loading ? (
            <div className="w-1/2 flex justify-center">
              <div className="loader"></div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentModal;
