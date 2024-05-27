import React, { useState, useEffect, useCallback } from "react";
import Table from "../../components/Table";
import CompanyModal from "./CompanyModal";
import FetchData from "./FetchData"; // Assuming this function exists and is correct
import DeleteModal from "../../components/Modal/DeleteModal";
import GetOptions from "./GetOptions";
import Request from "../../helpers/Request";
import Snackbar from "../../components/Snackbar";

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "name", label: "Company Name", minWidth: 170 },
  { id: "shortName", label: "Company Short Name", minWidth: 170 },
  {
    id: "companyType",
    label: "Company Type",
    minWidth: 100,
    render: (rowData) => rowData.companyType.name,
  },
  {
    id: "taxIdentificationNumber",
    label: "Tax ID",
    minWidth: 100,
  },
  { id: "taxOffice", label: "Tax Office", minWidth: 100 },
  {
    id: "manager",
    label: "Manager",
    minWidth: 100,
    render: (rowData) =>
      rowData.manager
        ? rowData.manager.name + " " + rowData.manager.surname
        : "-",
  },
];

const Companies = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [companies, setCompanies] = useState([]);

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    companyTypeId: null,
    taxOffice: "",
    taxIdentificationNumber: "",
    managerId: null,
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
  
    setDeleteModalOpen(false);
  };

  const handleSave = async (company) => {
    setLoading(true);
    const res = await Request(
      "post",
      "/api/fundamental/company/create",
      company
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

  const handleOnClose = () => {
    setFormData({
      name: "",
      shortName: "",
      companyTypeId: null,
      taxOffice: "",
      taxIdentificationNumber: "",
      managerId: null,
    });

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
        title="Companies"
        columns={columns}
        fetchData={FetchData}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSeverity={setSeverity}
      />
      <CompanyModal
        isOpen={isModalOpen}
        onClose={handleOnClose}
        onSave={handleSave}
        data={modalData}
        options={options}
        formData={formData}
        setFormData={setFormData}
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

export default Companies;
