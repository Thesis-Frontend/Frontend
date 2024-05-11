import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaFileExport,
  FaFileImport,
  FaEdit,
  FaTrash,
  FaAngleLeft,
  FaAngleRight,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import SessionHelper from "../helpers/SessionHelper";
import DeleteModal from "./Modal/DeleteModal"; // Adjust the path as necessary

const Table = ({
  title,
  columns,
  onCreate,
  onUpdate,
  onDelete,
  ModalComponent,
  fetchData,
}) => {
  const user = SessionHelper.getUser();
  const role = user?.role ? user.role : "admin";

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState(null);

  const rowsPerPage = 10; // Number of rows per page

  useEffect(() => {
    const query = {
      page: currentPage,
      pageSize: rowsPerPage,
      orderBy: { field: sortConfig.key },
      orderDirection: sortConfig.direction,
      search: searchQuery,
    };

    fetchData(query, setSnackbar, setSnackbarMessage, setSeverity, setTotalCount, "companies", {}).then(
      (fetchedData) => {
        setData(fetchedData.data);
      }
    );
  }, [currentPage, searchQuery, sortConfig]);

  const handleCreate = () => {
    setModalData({});
    setModalOpen(true);
  };

  const handleEdit = (row) => {
    setModalData(row);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteRowId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    onDelete(deleteRowId);
    setDeleteModalOpen(false);
    setDeleteRowId(null);
  };

  const handleSave = (data) => {
    if (data.id) {
      onUpdate(data);
    } else {
      onCreate(data);
    }
    setModalOpen(false);
  };

  const handleSort = (columnKey) => {
    let direction = "ASC";
    if (sortConfig.key === columnKey && sortConfig.direction === "ASC") {
      direction = "DESC";
    }
    setSortConfig({ key: columnKey, direction });
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col h-full p-4 bg-gray-100">
      <header className="flex justify-between items-center bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <FaFileExport />
            <span>Export PDF</span>
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <FaFileImport />
            <span>Export Excel</span>
          </button>
          {role === "admin" && (
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
              onClick={handleCreate}
            >
              <FaPlus />
              <span>Create</span>
            </button>
          )}
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="overflow-x-auto h-full">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className="py-2 px-4 border-b text-center cursor-pointer h-16"
                    onClick={() => handleSort(column.id)}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>{column.label}</span>
                      {sortConfig.key === column.id ? (
                        sortConfig.direction === "ASC" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </div>
                  </th>
                ))}
                {role === "admin" && (
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="h-16">
                  {columns.map((column) => (
                    <td key={column.id} className="py-2 px-4 border-b text-center">
                      {row[column.id]}
                    </td>
                  ))}
                  {role === "admin" && (
                    <td className="py-2 px-4 border-b border-l text-left">
                      <button
                        onClick={() => handleEdit(row)}
                        className="text-blue-500 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={columns.length + 1} className="py-2 px-4 bg-white border-t">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="bg-gray-300 text-black px-4 py-2 rounded-md flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaAngleLeft />
                      <span>Previous</span>
                    </button>
                    <span className="text-gray-600">Page {currentPage}</span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={data.length <= rowsPerPage}
                      className="bg-gray-300 text-black px-4 py-2 rounded-md flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Next</span>
                      <FaAngleRight />
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        data={modalData}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default Table;
