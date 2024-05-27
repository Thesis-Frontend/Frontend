import React, { useState, useEffect, useCallback } from "react";
import Request from "../../../helpers/Request";
import Table from "../../../components/Table";
import Snackbar from "../../../components/Snackbar";
import DeleteModal from "../../../components/Modal/DeleteModal";
import TownsModal from "./TownsModal";

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "name", label: "Region Name", minWidth: 170 },
];

export default function Towns({
  rowData,
  setSnackbar,
  setSnackbarMessage,
  setSeverity,
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [data, setData] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const init = useCallback(async () => {
    const res = await Request("get", "/api/fundamental/town", null, {
      regionId: rowData.id,
    });
    setData(res.data.data.content);
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
      <Table
        title={"Towns"}
        columns={columns}
        dataParam={data}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isDetail={2}
      />
      <TownsModal
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
