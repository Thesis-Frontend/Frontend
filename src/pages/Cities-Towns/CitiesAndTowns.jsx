import React, { useState, useEffect, useCallback } from "react";
import Table from "../../components/Table";
import Snackbar from "../../components/Snackbar";
import CitiesAndTownsModal from "./CitiesAndTownsModal";
import DeleteModal from "../../components/Modal/DeleteModal";
import FetchData from "./FetchData";
import Regions from "./Details/Regions";


const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "name", label: "City Name", minWidth: 170 },
];


export default function CitiesAndTowns() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

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
        title={"Cities"}
        columns={columns}
        fetchData={FetchData}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSeverity={setSeverity}
        detailsPanel={(rowData) => (
          <Regions
            rowData={rowData}
            setSnackbar={setSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSeverity={setSeverity}
          />
        )}
      />
      <CitiesAndTownsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        data={modalData}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        onDelete={confirmDelete}
      />
    </>
  );
}
