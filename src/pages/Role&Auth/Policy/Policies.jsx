import React, { useState, useEffect, useCallback } from "react";
import Table from "../../../components/Table";
import Snackbar from "../../../components/Snackbar";
import DeleteModal from "../../../components/Modal/DeleteModal";
import { FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FetchData from "./FetchData"; // Assuming this function exists and is correct
import PolicyModal from "./PolicyModal";
import Request from "../../../helpers/Request";

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  {
    id: "name",
    label: "Name",
    minWidth: 170,
    render: (rowData) => (rowData.name ? rowData.name : "-"),
  },
];

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    method: "",
    resource: "",
    join: "",
    conditions: [],
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const init = useCallback(async () => {
    const data = await FetchData();
    setPolicies(data);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const handleEdit = (id) => {
    navigate(`/policies/${id}`);
  };

  const handleCreate = () => {
    setModalData(null);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteCandidateId(id);
    setDeleteModalOpen(true);
  };

  const handleOnClose = () => {
    setFormData({
      name: "",
      method: "",
      resource: "",
      join: "",
      conditions: [],
    });
    setModalOpen(false);
  };

  const confirmDelete = async () => {
    // Your delete request logic here
    // const res = await Request("delete", `/api/policies/${deleteCandidateId}`);

    // Dummy response simulation
    const res = {
      status: 200,
      data: { message: "Policy deleted successfully" },
    };
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

  const handleSave = async (data) => {
    setLoading(true);
    console.log(data);
    const res = await Request(
      "post",
      "/api/auth/roles-and-policies/policy/create",
      data
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

    setLoading(false);
    setModalOpen(false);
  };

  const actions = [
    {
      icon: <FaLink />,
      color: "black",
      onClick: handleEdit,
    },
  ];

  return (
    <>
      <Snackbar
        message={snackbarMessage}
        show={snackbar}
        setShow={setSnackbar}
        severity={severity}
      />
      <Table
        title="Policies"
        columns={columns}
        fetchData={FetchData}
        handleCreate={handleCreate}
        handleDelete={handleDelete}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSeverity={setSeverity}
        actions={actions}
      />
      <PolicyModal
        isOpen={isModalOpen}
        onClose={handleOnClose}
        onSave={handleSave}
        data={modalData}
        setFormData={setFormData}
        formData={formData}
        loading={loading}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        onDelete={confirmDelete}
      />
    </>
  );
};

export default Policies;
