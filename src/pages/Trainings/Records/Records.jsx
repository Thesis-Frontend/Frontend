import React, { useState, useEffect, useCallback } from "react";
import Table from "../../../components/Table";
import Snackbar from "../../../components/Snackbar";
import DeleteModal from "../../../components/Modal/DeleteModal";
import RecordsModal from "./RecordsModal";
import GetOptions from "./GetOptions";
import FetchData from "./FetchData";
import moment from "moment";

const getNames = (list) => {
  return (
    <div className="policy-list">
      {list.map((item) => {
        return item ? <div key={item.id}>{item.name} {item.surname}</div> : <div>-</div>;
      })}
    </div>
  );
};

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "name", label: "Record Name", minWidth: 170 },
  {
    id: "department",
    label: "Department",
    minWidth: 170,
    render: (rowData) => (rowData.department ? rowData.department.name : "-"),
  },
  {
    id: "trainingTypeResponse",
    label: "Training Type",
    minWidth: 170,
    render: (rowData) =>
      rowData.trainingTypeResponse ? rowData.trainingTypeResponse.name : "-",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    render: (rowData) => (rowData.status ? rowData.status : "-"),
  },
  {
    id: "startTime",
    label: "Start Time",
    minWidth: 100,
    render: (rowData) =>
      rowData.startTime
        ? new moment(rowData.startTime).format("DD-MM-YYYY")
        : "-",
  },
  {
    id: "endTime",
    label: "End Time",
    minWidth: 100,
    render: (rowData) =>
      rowData.endTime ? new moment(rowData.endTime).format("DD-MM-YYYY") : "-",
  },
  {
    id: "isOnline",
    label: "Channel",
    minWidth: 170,
    render: (rowData) =>
      rowData.isOnline ? "True" : !rowData.isOnline ? "False" : "-",
  },
  {
    id: "meetingLink",
    label: "Status",
    minWidth: 170,
    render: (rowData) => (rowData.meetingLink ? rowData.meetingLink : "-"),
  },
  {
    id: "instructors",
    label: "Instructors",
    render: (rowData) =>
      rowData.instructors.length > 0
        ? getNames(rowData.instructors)
        : ["-"],
  },
  {
    id: "attendees",
    label: "Attendees",
    render: (rowData) =>
      rowData.instructors.length > 0
        ? getNames(rowData.instructors)
        : ["-"],
  },
];

export default function Records() {
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
        title={"Records"}
        columns={columns}
        fetchData={FetchData}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSeverity={setSeverity}
      />
      <RecordsModal
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
}
