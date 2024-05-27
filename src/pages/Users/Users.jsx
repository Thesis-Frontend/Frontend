import React, { useState, useEffect, useCallback } from "react";
import Table from "../../components/Table";
import UserModal from "./UserModal";
import FetchData from "./FetchData"; // Assuming this function exists and is correct
import DeleteModal from "../../components/Modal/DeleteModal";
import GetOptions from "./GetOptions";
import moment from "moment";
import Request from "../../helpers/Request";

const getNames = (list) => {
  return (
    <div className="policy-list">
      {list.map((item) => {
        return item ? <div key={item.id}>{item.name}</div> : <div>-</div>;
      })}
    </div>
  );
};

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  {
    id: "name",
    label: "Name",
    minWidth: 170,
    render: (rowData) => rowData.name || "-",
  },
  {
    id: "surname",
    label: "Surname",
    minWidth: 170,
    render: (rowData) => rowData.surname || "-",
  },
  {
    id: "company",
    label: "Company Name",
    minWidth: 170,
    render: (rowData) => rowData.company?.name || "-",
  },
  {
    id: "department",
    label: "Department Name",
    minWidth: 100,
    render: (rowData) => rowData.department?.name || "-",
  },
  {
    id: "title",
    label: "Title",
    minWidth: 100,
    render: (rowData) => rowData.title || "-",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    render: (rowData) => rowData.email || "-",
  },
  {
    id: "role",
    label: "Role",
    minWidth: 100,
    render: (rowData) => (rowData.role ? rowData.role.name : "-"),
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
    render: (rowData) => rowData.identityNumber || "-",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    minWidth: 100,
    render: (rowData) => rowData.phoneNumber || "-",
  },
  {
    id: "educationStatus",
    label: "Education Status",
    minWidth: 100,
    render: (rowData) => rowData.educationStatus?.name || "-",
  },
  {
    id: "marital",
    label: "Marital",
    minWidth: 100,
    render: (rowData) =>
      rowData.marital === true
        ? "Married"
        : rowData.marital === false
        ? "Single"
        : "-",
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 100,
    render: (rowData) => {
      if (rowData.gender == false) return "Man";
      if (rowData.gender) return "Woman";
      return "-";
    },
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
        : "-",
  },
];

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
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    title: "",
    email: "",
    identityNumber: "",
    phoneNumber: "",
    departmentId: null,
    managerId: null,
    educationStatusId: null,
    marital: null,
    gender: null,
    startDateOfWork: null,
    endDateOfWork: null,
    responsibleRegionIds: [],
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

  const confirmDelete = () => {};

  const handleSave = async (data) => {
    setLoading(true);
    const res = await Request("post", "/api/fundamental/user/create", data);
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
      surname: "",
      title: "",
      email: "",
      identityNumber: "",
      phoneNumber: "",
      departmentId: null,
      managerId: null,
      educationStatusId: null,
      marital: null,
      gender: null,
      startDateOfWork: null,
      endDateOfWork: null,
      responsibleRegionIds: [],
    });

    setModalOpen(false);
  };

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
        onClose={handleOnClose}
        onSave={handleSave}
        data={modalData}
        formData={formData}
        setFormData={setFormData}
        loading={loading}
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
