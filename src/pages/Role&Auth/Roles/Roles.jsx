import React, { useState, useEffect, useCallback } from "react";
import Table from "../../../components/Table";
import RolesModal from "./RolesModal";
import DeleteModal from "../../../components/Modal/DeleteModal";
import AddPolicyModal from "./AddPolicyModal"; // New import for adding policy modal
import FetchData from "./FetchData"; // Assuming this function exists and is correct
import GetOptions from "./GetOptions";
import Request from "../../../helpers/Request";
import { FaTrash, FaPlus } from "react-icons/fa";

const Roles = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddPolicyModalOpen, setAddPolicyModalOpen] = useState(false); // State for add policy modal
  const [modalData, setModalData] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [roles, setRoles] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const [options, setOptions] = useState([]);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
  });

  const init = useCallback(async () => {
    const opt = await GetOptions();
    setOptions(opt);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const handleCreate = () => {
    setModalData(null);
    setModalOpen(true);
  };

  const handleEdit = (role) => {
    setModalData(role);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteCandidateId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const res = await Request("delete", `/api/training/record`, null, {
      recordId: deleteCandidateId,
    });

    if (res.status === 200) {
      setSnackbarMessage(res.data.message);
      setSnackbar(true);
      setSeverity("success");
      window.location.reload();
    } else {
      setSnackbarMessage(res.data.message);
      setSnackbar(true);
      setSeverity("error");
    }

    setDeleteModalOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSave = async (role) => {
    if (role.id) {
      setRoles((prevRoles) =>
        prevRoles.map((r) => (r.id === role.id ? role : r))
      );
    } else {
      const res = await Request(
        "post",
        "/api/auth/roles-and-policies/role/create",
        null,
        { name: formData.name }
      );
      if (res.status === 200) {
        setSnackbarMessage(res.data.message);
        setSnackbar(true);
        setSeverity("success");
        window.location.reload();
      } else {
        setSnackbarMessage(res.data.message);
        setSnackbar(true);
        setSeverity("error");
      }
    }
    setModalOpen(false);
  };

  const handleAddPolicy = (role) => {
    setModalData(role);
    setAddPolicyModalOpen(true);
  };

  const handleDeletePolicy = async (role, policyId) => {
    const res = await Request(
      "patch",
      `/api/auth/roles-and-policies/role/remove-policy/`,
      null,
      {
        "policy-id": policyId,
        "role-id": role.id,
      }
    );
    if (res.status === 200) {
      setSnackbarMessage(res.data.message);
      setSnackbar(true);
      setSeverity("success");
      // Remove the deleted policy from the role's policies array
      setRoles((prevRoles) =>
        prevRoles.map((r) =>
          r.id === role.id
            ? { ...r, policies: r.policies.filter((p) => p.id !== policyId) }
            : r
        )
      );
    } else {
      setSnackbarMessage(res.data.message);
      setSnackbar(true);
      setSeverity("error");
    }
  };
  const renderDetailsPanel = (row) => {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 min-w-full flex justify-center h-auto">
        <div className="p-4 bg-white dark:bg-gray-800 w-full md:w-2/3 lg:w-1/2 rounded-md shadow-md">
          <h3 className="text-lg font-bold mb-4">Policies for {row.name}</h3>
          <div className="overflow-y-auto h-48">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                    Policy Name
                  </th>
                  <th className="px-4 py-2 text-right text-gray-600 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {row.policies.map((policy) => (
                  <tr
                    key={policy.id}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-4 py-2">
                      {policy.name ? policy.name : "-"}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => handleDeletePolicy(row, policy.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => handleAddPolicy(row)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
            >
              <FaPlus />
              <span>Add Policy</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    { id: "name", label: "Name", minWidth: 170 },
  ];

  return (
    <div>
      <Table
        title="Roles"
        columns={columns}
        fetchData={FetchData}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSeverity={setSeverity}
        detailsPanel={(rowData) => renderDetailsPanel(rowData)}
      />
      <RolesModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        data={modalData}
        options={options}
        setFormData={setFormData}
        formData={formData}
        loading={loading}
      />
      <AddPolicyModal
        isOpen={isAddPolicyModalOpen}
        onClose={() => setAddPolicyModalOpen(false)}
        role={modalData}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSeverity={setSeverity}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        onDelete={confirmDelete}
      />
      <style jsx>{`
        .policy-list {
          max-height: 100px; /* Adjust as needed */
          overflow-y: auto;
          padding: 5px;
          border-radius: 5px;
          color: #666; /* A lighter color */
        }
        .policy-list div {
          margin: 7px 0;
        }
      `}</style>
    </div>
  );
};

export default Roles;
