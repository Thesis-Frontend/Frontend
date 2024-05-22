import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import CompanyModal from "./CompanyModal";
import FetchData from "./FetchData"; // Assuming this function exists and is correct
import DeleteModal from "../../components/Modal/DeleteModal";

const Companies = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    FetchData({ page: currentPage, rowsPerPage, searchQuery, sortConfig }, "companies")
      .then(data => {
        setCompanies(data); // Assuming data is directly usable or adjust based on API response structure
      });
  }, [currentPage, rowsPerPage, searchQuery, sortConfig]);

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
    setCompanies(companies.filter(company => company.id !== deleteCandidateId));
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

  const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    { id: "companyName", label: "Company Name", minWidth: 170 },
    { id: "city", label: "City", minWidth: 100 },
    { id: "companyType", label: "Company Type", minWidth: 100 },
    { id: "taxOffice", label: "Tax Office", minWidth: 100 },
    { id: "taxNumber", label: "Tax ID", minWidth: 100 },
  ];

  return (
    <div>
      <Table
        title="Companies"
        columns={columns}
        fetchData={FetchData}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <CompanyModal
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
    </div>
  );
};

export default Companies;
