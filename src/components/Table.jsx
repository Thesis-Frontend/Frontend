import React, { useState, useEffect, useCallback } from "react";
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
import DeleteModal from "./Modal/DeleteModal";

const Table = ({
  title,
  columns,
  handleCreate,
  handleEdit,
  handleDelete,
  fetchData,
  rowStyle,
  actions,
}) => {
  const user = SessionHelper.getUser();
  const role = user?.role ? user.role : "admin";

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const rowsPerPage = 10; // Number of rows per page

  const init = useCallback(async () => {
    const query = {
      page: currentPage,
      pageSize: rowsPerPage,
      orderBy: { field: sortConfig.key },
      orderDirection: sortConfig.direction,
      search: searchQuery,
    };

    const data = await fetchData(
      query,
      setSnackbar,
      setSnackbarMessage,
      setSeverity,
      setTotalCount
    );
    setData(data.data);
  }, [currentPage, searchQuery, sortConfig, columns]);

  useEffect(() => {
    init();
  }, [init]);

  // useEffect( () => {
  //   const query = {
  //     page: currentPage,
  //     pageSize: rowsPerPage,
  //     orderBy: { field: sortConfig.key },
  //     orderDirection: sortConfig.direction,
  //     search: searchQuery,
  //   };

  //   async function fetchData(
  //     query,
  //     setSnackbar,
  //     setSnackbarMessage,
  //     setSeverity,
  //     setTotalCount
  //   ).then((fetchedData) => {
  //     setData(fetchedData.data);
  //     console.log(fetchData);
  //   });
  // }, [currentPage, searchQuery, sortConfig, fetchData]);

  const handleSort = (columnKey) => {
    let direction = "ASC";
    if (sortConfig.key === columnKey && sortConfig.direction === "ASC") {
      direction = "DESC";
    }
    setSortConfig({ key: columnKey, direction });
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col p-4 bg-gray-100 dark:bg-[#161A23] rounded-lg" style={{ height: "95vh" }}>
      <header className="flex justify-between items-center bg-white p-4 shadow-md dark:bg-[#2D2F39] rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-[#8A8C91] ">{title}</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 dark:bg-[#2D2F39] dark:text-[#8A8C91]"
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
        <div className="overflow-x-auto h-full dark:text-[#8A8C91] dark:bg-[#2D2F39] rounded-b-lg">
          <table className="min-w-full bg-white border dark:bg-[#2D2F39] ">
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
                <tr
                  key={rowIndex}
                  className="h-16"
                  style={rowStyle ? rowStyle(row) : {}}
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className="py-2 px-4 border-b text-center"
                    >
                      {column.render ? column.render(row) : row[column.id]}
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
                      {actions &&
                        actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => action.onClick(row.id)}
                            className={`text-${action.color}-500 ml-2`}
                          >
                            {action.icon}
                          </button>
                        ))}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-2 px-4 bg-white border-t dark:bg-[#2D2F39] dark:text-[#8A8C91]"
                >
                  <div className="flex justify-between items-center dark:bg-[#2D2F39]">
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
    </div>
  );
};

export default Table;
