import React, { useState, useEffect, useCallback } from "react";
import Request from "../../../helpers/Request";
import GetOptions from "./GetOptions";

const AddPolicyModal = ({
  isOpen,
  onClose,
  role,
  setSnackbar,
  setSnackbarMessage,
  setSeverity,
}) => {
  const [availablePolicies, setAvailablePolicies] = useState([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState("");

  const init = useCallback(async () => {
    const opt = await GetOptions();
    setAvailablePolicies(opt.policies);
  }, [isOpen]);

  useEffect(() => {
    init();
  }, [init]);

  const handleAddPolicy = async () => {
    const res = await Request(
      "patch",
      "/api/auth/roles-and-policies/role/add-policy",
      null,
      {
        "role-id": role.id,
        "policy-id": selectedPolicyId,
      }
    );

    if (res.status === 200) {
      setSnackbarMessage(res.data.message);
      setSnackbar(true);
      setSeverity("success");
      // Update the role's policies array
      role.policies.push(
        availablePolicies.find((p) => p.id === selectedPolicyId)
      );
      onClose();
    } else {
      setSnackbarMessage(res.data.message);
      setSnackbar(true);
      setSeverity("error");
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-200 rounded shadow-lg p-8 w-1/4">
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Add Policy to {role?.name}</h2>
          <div>
            <label className="block text-gray-700 font-bold">
              Select Policy
            </label>
            <select
              value={selectedPolicyId}
              onChange={(e) => setSelectedPolicyId(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select a policy</option>
              {availablePolicies.map((policy) => (
                <option key={policy.id} value={policy.id}>
                  {policy.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-6 w-full">
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2 w-1/2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded w-1/2"
            onClick={handleAddPolicy}
          >
            Add Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPolicyModal;
