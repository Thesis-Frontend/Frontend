import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import RolesModal from "./RolesModal";
import DeleteModal from "../../../components/Modal/DeleteModal";
import FetchData from "./FetchData"; // Assuming this function exists and is correct

const Roles = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [roles, setRoles] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const options = {
    policies: [
      { id: 1, name: "policy1" },
      { id: 2, name: "policy2" },
      { id: 3, name: "policy3" },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      const rolesData = await FetchData(
        { page: currentPage, rowsPerPage, searchQuery, sortConfig },
        "roles"
      );
      setRoles(rolesData.data);
      const policiesData = await FetchData({}, "policies"); // Assuming FetchData can be used for this purpose
      setPolicies(policiesData.data);
    };

    fetchData();
  }, [currentPage, rowsPerPage, searchQuery, sortConfig]);

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

  const confirmDelete = () => {
    setRoles((prevRoles) =>
      prevRoles.filter((role) => role.id !== deleteCandidateId)
    );
    setDeleteModalOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSave = (role) => {
    if (role.id) {
      setRoles((prevRoles) =>
        prevRoles.map((r) => (r.id === role.id ? role : r))
      );
    } else {
      setRoles((prevRoles) => [...prevRoles, role]);
    }
    setModalOpen(false);
  };

  const getPolicyNames = (policyIds) => {
    return (
      <div className="policy-list">
        {policyIds.map((policyId) => {
          const policy = options.policies.find((p) => p.id === policyId);
          return policy ? (
            <div key={policyId}>{policy.name}</div>
          ) : (
            <div>-</div>
          );
        })}
      </div>
    );
  };

  const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    { id: "roleName", label: "Name", minWidth: 170 },
    {
      id: "created_at",
      label: "Created At",
      minWidth: 100,
      render: (rowData) =>
        rowData.created_at === "" ? "-" : rowData.created_at,
    },
    {
      id: "deleted_at",
      label: "Deleted At",
      minWidth: 100,
      render: (rowData) =>
        rowData.deleted_at === "" ? "-" : rowData.deleted_at,
    },
    {
      id: "active",
      label: "Active",
      render: (rowData) => (rowData.active ? "True" : "False"),
    },
    {
      id: "policies",
      label: "Policies",
      render: (rowData) => getPolicyNames(rowData.policyIds || []),
    },
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
        rowStyle={(rowData) => ({
          backgroundColor: !rowData.active && "#804f4f",
        })}
      />
      <RolesModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        data={modalData}
        options={options}
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
