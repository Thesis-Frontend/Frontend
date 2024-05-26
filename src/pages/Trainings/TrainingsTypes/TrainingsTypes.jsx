import React, { useState, useEffect, useCallback } from "react";
import Table from "../../../components/Table";
import TrainingsTypesModal from "./TrainingsTypesModal";
import FetchData from "./FetchData"; // Assuming this function exists and is correct
import DeleteModal from "../../../components/Modal/DeleteModal";
import GetOptions from "./GetOptions";
import Snackbar from "../../../components/Snackbar";

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "name", label: "Training Name", minWidth: 170 },
  {
    id: "company",
    label: "Company Name",
    minWidth: 170,
    render: (rowData) => (rowData.company ? rowData.company.name : "-"),
  },
];

const TrainingTypes = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [options, setOptions] = useState([]);

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

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

  const handleEdit = (company) => {
    setModalData(company);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteCandidateId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Delete logic (API call, then update local state or directly remove from state if not using a backend)
    setCompanies(
      companies.filter((company) => company.id !== deleteCandidateId)
    );
    setDeleteModalOpen(false);
  };

  const handleSave = (company) => {
    if (company.id) {
      // Update logic
    } else {
      // Create logic
    }
    setModalOpen(false);
  };

  return (
    <>
      <Snackbar
        message={snackbarMessage}
        show={snackbar}
        setShow={setSnackbar}
        severity={severity}
      />
      <Table
        title="Training Types"
        columns={columns}
        fetchData={FetchData}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSeverity={setSeverity}
      />
      <TrainingsTypesModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        data={modalData}
        options={options}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        onDelete={confirmDelete}
      />
    </>
  );
};

export default TrainingTypes;
