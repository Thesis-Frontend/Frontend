import React, { useState, useEffect, useCallback } from "react";
import Table from "../../components/Table";
import DepartmentModal from "./DepartmentModal";
import FetchData from "./FetchData"; // Assuming this function exists and is correct
import DeleteModal from "../../components/Modal/DeleteModal";
import GetOptions from "./GetOptions";
import Snackbar from "../../components/Snackbar";
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
  { id: "name", label: "Department Name", minWidth: 170 },
  {
    id: "departmentType",
    label: "Department Type",
    minWidth: 100,
    render: (rowData) => rowData.departmentType.name,
  },
  {
    id: "company",
    label: "Company Name",
    minWidth: 170,
    render: (rowData) => rowData.company.name,
  },

  {
    id: "socialSecurityNumber",
    label: "Tax ID",
    minWidth: 100,
  },
  {
    id: "activityType",
    label: "Activity Type",
    minWidth: 100,
    render: (rowData) => rowData.name,
  },
  {
    id: "town",
    label: "Town",
    minWidth: 100,
    render: (rowData) => rowData.town.name,
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
    id: "activityTownIds",
    label: "Activity Towns",
    render: (rowData) =>
      rowData.activityTownId?.length > 0
        ? getNames(rowData.activityTownId)
        : ["-"],
  },
  {
    id: "parentDepartmentIds",
    label: "Parent Departments",
    render: (rowData) =>
      rowData.parentDepartmentIds?.length > 0
        ? getNames(rowData.parentDepartmentIds)
        : ["-"],
  },
];

const Departments = () => {
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
    departmentTypeId: null,
    activityTypeId: null,
    companyId: null,
    townId: null,
    socialSecurityNumber: "",
    managerId: null,
    activityTownIds: [],
    parentDepartmentIds: [],
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
    const res = await Request(
      "post",
      "/api/fundamental/department/create",
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

  const handleOnClose = () => {
    setFormData({
      name: "",
      departmentTypeId: null,
      activityTypeId: null,
      companyId: null,
      townId: null,
      socialSecurityNumber: "",
      managerId: null,
      activityTownIds: [],
      parentDepartmentIds: [],
    });

    setModalOpen(false);
  };
  return (
    <div>
      <Table
        title="Departments"
        columns={columns}
        fetchData={FetchData}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSeverity={setSeverity}
      />
      <DepartmentModal
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
    </div>
  );
};

export default Departments;
