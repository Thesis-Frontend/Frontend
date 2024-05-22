import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FetchData from "./FetchData"; // Assuming this function exists and is correct

const Policies = () => {
  const [roles, setRoles] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const navigate = useNavigate();

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

  const handleEdit = (id) => {
    navigate(`/policies/${id}`);
  };

  const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    { id: "name", label: "Name", minWidth: 170 },
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
  ];

  const actions = [
    {
      icon: <FaLink />,
      color: "black",
      onClick: handleEdit,
    },
  ];

  return (
    <div>
      <Table
        title="Policies"
        columns={columns}
        fetchData={FetchData}
        rowStyle={(rowData) => ({
          backgroundColor: !rowData.active && "#804f4f",
        })}
        actions={actions}
      />
    </div>
  );
};

export default Policies;
