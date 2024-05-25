import React, { useState, useEffect, useCallback } from "react";
import Table from "../../components/Table";
import DepartmentModal from "./DepartmentModal";
import FetchData from "./FetchData"; // Assuming this function exists and is correct
import DeleteModal from "../../components/Modal/DeleteModal";
import GetOptions from "./GetOptions";

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
    id: "activityTowns",
    label: "Activity Towns",
    render: (rowData) =>
      rowData.activityTowns.length > 0
        ? getNames(rowData.activityTowns)
        : ["-"],
  },
  {
    id: "parentDepartments",
    label: "Parent Departments",
    render: (rowData) =>
      rowData.parentDepartments.length > 0
        ? getNames(rowData.parentDepartments)
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

  return (
    <div>
      <Table
        title="Departments"
        columns={columns}
        fetchData={FetchData}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <DepartmentModal
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

export default Departments;
