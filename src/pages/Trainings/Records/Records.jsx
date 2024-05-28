import React, { useState, useEffect, useCallback } from "react";
import Table from "../../../components/Table";
import Snackbar from "../../../components/Snackbar";
import DeleteModal from "../../../components/Modal/DeleteModal";
import RecordsModal from "./RecordsModal";
import GetOptions from "./GetOptions";
import FetchData from "./FetchData";
import moment from "moment";
import { FaDownload } from "react-icons/fa";
import Request from "../../../helpers/Request";
import CompleteModal from "./CompleteModal";

const getNames = (list) => {
  return (
    <div className="policy-list">
      {list.map((item) => {
        return item ? (
          <div key={item.id}>
            {item.name} {item.surname}
          </div>
        ) : (
          <div>-</div>
        );
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
    id: "plannedTime",
    label: "Planned Time",
    minWidth: 100,
    render: (rowData) =>
      rowData.plannedTime
        ? new moment(rowData.plannedTime).format("DD-MM-YYYY")
        : "-",
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
    label: "Is Online",
    minWidth: 170,
    render: (rowData) =>
      rowData.isOnline ? "True" : rowData.isOnline === false ? "False" : "-",
  },
  {
    id: "meetingLink",
    label: "Meeting Link",
    minWidth: 170,
    render: (rowData) =>
      rowData.meetingLink ? (
        <a
          href={rowData.meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {rowData.meetingLink}
        </a>
      ) : (
        "-"
      ),
  },
  {
    id: "meetingPlace",
    label: "Meeting Place",
    render: (rowData) =>
      rowData.meetingPlace ? rowData.meetingPlace : ["-"],
  },
  {
    id: "instructors",
    label: "Instructors",
    render: (rowData) =>
      rowData.instructors.length > 0 ? getNames(rowData.instructors) : ["-"],
  },
  {
    id: "attendees",
    label: "Attendees",
    render: (rowData) =>
      rowData.attendees.length > 0 ? getNames(rowData.attendees) : ["-"],
  },
  {
    id: "files",
    label: "Files",
    render: (rowData) =>
      rowData.files.length > 0
        ? rowData.files.map((file, index) => (
            <div key={index} className="flex items-center space-x-2 m-4">
              <span>{file.filename}</span>
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = `data:application/octet-stream;base64,${file.base64}`;
                  link.download = file.filename;
                  link.target = "_blank";
                  link.click();
                }}
                className="text-blue-500"
                title={`Download ${file.filename}`}
              >
                <FaDownload />
              </button>
            </div>
          ))
        : "-",
  },
];

export default function Records() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);

  const [options, setOptions] = useState([]);
  const [completeModal, setCompleteModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const [filesToSend, setFilesToSend] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    departmentId: null,
    typeId: null,
    status: null,
    isOnline: null,
    meetingLink: "",
    instructors: [],
    plannedTime: "",
    meetingPlace: "",
  });

  const [completeData, setCompleteData] = useState({
    startTime: "",
    endTime: "",
    attendees: [],
    files: [],
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

  const handleEdit = (data) => {
    setModalData(data);
    setModalOpen(true);
  };
  const handleComplete = (data) => {
    setModalData(data);
    setCompleteModal(true);
  };

  const handleDelete = (id) => {
    setDeleteCandidateId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const res = await Request("delete", `/api/training/record`, null, {
      recordId: deleteCandidateId,
    });

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

    setDeleteModalOpen(false);
  };

  const handleSave = async (data) => {
    setLoading(true);
    let id = data.id;
    let params = {
      departmentId: data.departmentId,
      typeId: data.typeId,
    };
    delete data.departmentId;
    delete data.typeId;

    if (data.id) {
      delete data.id;
      delete data.departmentId;
      delete data.typeId;
      const res = await Request("patch", "/api/training/record", data, {
        recordId: id,
      });
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
    } else {
      delete data.id;
      delete data.status;
      const res = await Request("post", "/api/training/record", data, params);
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
    }
    setLoading(false);
    setModalOpen(false);
  };

  const handleCompleteSave = async (data) => {
    setCompleteLoading(true);

    let body = {
      startTime: data.startTime,
      endTime: data.endTime,
      attendees: data.attendees,
    };

    let formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(body)], { type: "application/json" })
    );

    if (filesToSend && Array.isArray(filesToSend)) {
      for (let file of filesToSend) {
        formData.append("files", file);
      }
    }

    try {
      const res = await Request(
        "post",
        "/api/training/record/complete",
        formData,
        {
          recordId: data.id,
        }
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
    } catch (error) {
      console.error("Error completing the record:", error);
      setSnackbarMessage("An error occurred. Please try again.");
      setSnackbar(true);
      setSeverity("error");
    } finally {
      setCompleteLoading(false);
      setCompleteModal(false);
    }
  };

  const handleOnClose = () => {
    setFormData({
      name: "",
      departmentId: null,
      typeId: null,
      status: null,
      plannedTime: "",
      isOnline: null,
      meetingLink: "",
      instructors: [],
      meetingPlace: "",
    });

    setModalOpen(false);
  };

  const handleCompleteClose = () => {
    setCompleteData({
      startTime: "",
      endTime: "",
      attendees: [],
      files: [],
    });
    setCompleteModal(false);
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
        title={"Training Records"}
        columns={columns}
        fetchData={FetchData}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleComplete={handleComplete}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSeverity={setSeverity}
      />
      <RecordsModal
        isOpen={isModalOpen}
        onClose={handleOnClose}
        onSave={handleSave}
        data={modalData}
        options={options}
        setFormData={setFormData}
        formData={formData}
        loading={loading}
      />
      <CompleteModal
        isOpen={completeModal}
        onClose={handleCompleteClose}
        onSave={handleCompleteSave}
        data={modalData}
        options={options}
        setFormData={setCompleteData}
        formData={completeData}
        loading={completeLoading}
        filesToSend={filesToSend}
        setFilesToSend={setFilesToSend}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        onDelete={confirmDelete}
      />
    </>
  );
}
