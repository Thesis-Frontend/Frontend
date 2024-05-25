import React, { useState, useEffect, useCallback } from "react";
import Table from "../../components/Table";
import UserModal from "./UserModal";
import FetchData from "./FetchData"; // Assuming this function exists and is correct
import DeleteModal from "../../components/Modal/DeleteModal";
import GetOptions from "./GetOptions";
import moment from "moment";

const Users = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
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

  const confirmDelete = () => {};

  const getNames = (list) => {
    return (
      <div className="policy-list">
        {list.map((item) => {
          return item ? <div key={item.id}>{item.name}</div> : <div>-</div>;
        })}
      </div>
    );
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
    { id: "name", label: "Name", minWidth: 170 },
    { id: "surname", label: "Surname", minWidth: 170 },
    {
      id: "department",
      label: "Department Name",
      minWidth: 100,
      render: (rowData) => rowData.department.name,
    },
    {
      id: "company",
      label: "Company Name",
      minWidth: 170,
      render: (rowData) => rowData.company.name,
    },

    {
      id: "title",
      label: "Title",
      minWidth: 100,
    },
    {
      id: "email",
      label: "Email",
      minWidth: 100,
    },
    {
      id: "manager",
      label: "Manager",
      minWidth: 100,
      render: (rowData) =>
        rowData.manager
          ? rowData.manager.name + " " + rowData.manager.surname
          : "-",
    },
    {
      id: "identityNumber",
      label: "Identity Number",
      minWidth: 100,
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
      minWidth: 100,
    },
    {
      id: "educationStatus",
      label: "Education Status",
      minWidth: 100,
      render: (rowData) => rowData.educationStatus.name,
    },
    {
      id: "marital",
      label: "Marital",
      minWidth: 100,
      render: (rowData) => (rowData.marital ? "Married" : "Single"),
    },
    {
      id: "gender",
      label: "Gender",
      minWidth: 100,
      render: (rowData) => (rowData.gender ? "Woman" : "Man"),
    },
    {
      id: "startDateOfWork",
      label: "Start Date of Work",
      minWidth: 100,
      render: (rowData) =>
        rowData.startDateOfWork
          ? new moment(rowData.startDateOfWork).format("DD-MM-YYYY")
          : "-",
    },
    {
      id: "endDateOfWork",
      label: "End Date of Work",
      minWidth: 100,
      render: (rowData) =>
        rowData.endDateOfWork
          ? new moment(rowData.endDateOfWork).format("DD-MM-YYYY")
          : "-",
    },
    {
      id: "responsibleRegions",
      label: "Responsible Regions",
      minWidth: 100,
      render: (rowData) =>
        rowData.responsibleRegions.length > 0
          ? getNames(rowData.responsibleRegions)
          : ["-"],
    },
  ];

  return (
    <div>
      <Table
        title="Users"
        columns={columns}
        fetchData={FetchData}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSeverity={setSeverity}
      />
      <UserModal
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
    </div>
  );
};

export default Users;
