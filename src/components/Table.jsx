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
  FaChevronRight,
  FaChevronDown,
  FaCheck,
} from "react-icons/fa";
import SessionHelper from "../helpers/SessionHelper";
import Snackbar from "./Snackbar";

const Table = ({
  title,
  columns,
  handleCreate,
  handleEdit,
  handleDelete,
  handleComplete, // Add the handleComplete prop
  fetchData,
  rowStyle,
  actions,
  detailsPanel,
  dataParam,
  setSnackbar,
  setSeverity,
  setSnackbarMessage,
  isDetail,
}) => {
  const user = SessionHelper.getUser();
  const uiSections = user.uiSections;

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [expandedRows, setExpandedRows] = useState({});

  const rowsPerPage = 10; // Number of rows per page

  const init = useCallback(async () => {
    if (dataParam) {
      setData(dataParam);
      setTotalCount(dataParam.length);
    } else if (fetchData) {
      const query = {
        page: currentPage,
        pageSize: rowsPerPage,
        orderBy: { field: sortConfig.key },
        orderDirection: sortConfig.direction,
        search: searchQuery,
      };

      const response = await fetchData(
        query,
        setSnackbar,
        setSnackbarMessage,
        setSeverity,
        setTotalCount
      );
      setData(response.data);
    }
  }, [currentPage, searchQuery, sortConfig, columns, dataParam, fetchData]);

  useEffect(() => {
    init();
  }, [init]);

  const handleSort = (columnKey) => {
    let direction = "ASC";
    if (sortConfig.key === columnKey && sortConfig.direction === "ASC") {
      direction = "DESC";
    }
    setSortConfig({ key: columnKey, direction });
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const toggleRow = (rowIndex) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [rowIndex]: !prevExpandedRows[rowIndex],
    }));
  };

  const getAllowedOperations = (title, uiSections) => {
    const section = uiSections.find(
      (sec) =>
        sec.section === title ||
        (sec.subsections && sec.subsections.find((sub) => sub.name === title))
    );
    if (section) {
      if (section.section === title && section.operations) {
        return section.operations;
      } else if (section.subsections) {
        const subsection = section.subsections.find(
          (sub) => sub.name === title
        );
        return subsection ? subsection.operations : [];
      }
    }
    return [];
  };

  const allowedOperations = getAllowedOperations(title, uiSections);
  const canCreate = allowedOperations.includes("C");
  const canUpdate = allowedOperations.includes("U");
  const canDelete = allowedOperations.includes("D");

  return (
    <>
      <div
        className="flex flex-col p-4 bg-gray-100 dark:bg-[#161A23] rounded-lg"
        style={{ height: "95vh" }}
      >
        <header
          className={`${
            isDetail == 1
              ? "bg-slate-300"
              : isDetail == 2
              ? "bg-slate-400"
              : null
          } flex justify-between items-center bg-white p-4 shadow-md dark:bg-[#2D2F39] rounded-lg`}
        >
          <h1 className="text-2xl font-bold text-gray-800 dark:text-[#8A8C91]">
            {title}
          </h1>
          <div className="flex items-center space-x-4">
            {!isDetail && (
              <>
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
              </>
            )}
            {canCreate && (
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
        <main className="flex-1 overflow-auto p-4">
          <div className="overflow-x-auto h-full dark:text-[#8A8C91] dark:bg-[#2D2F39] rounded-lg">
            <table className="min-w-full bg-white border dark:border-gray-700 dark:bg-[#2D2F39]">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left min-w-32">
                    Actions
                  </th>

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
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => {
                  const isTodo = row.status === "TODO";
                  const isDone = row.status === "DONE";
                  return (
                    <React.Fragment key={rowIndex}>
                      <tr
                        className={`h-16 ${
                          expandedRows[rowIndex]
                            ? "bg-gray-200 dark:bg-gray-800"
                            : ""
                        }`}
                        style={rowStyle ? rowStyle(row) : {}}
                      >
                        <td className="py-2 px-4 border-b border-l text-left w-32">
                          {detailsPanel && (
                            <button
                              onClick={() => toggleRow(rowIndex)}
                              className="text-green-500 mr-2"
                            >
                              {expandedRows[rowIndex] ? (
                                <FaChevronDown />
                              ) : (
                                <FaChevronRight />
                              )}
                            </button>
                          )}
                          {canUpdate && (
                            <button
                              onClick={() => handleEdit(row)}
                              className={`text-blue-500 mr-2 ${
                                isDone ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                              disabled={isDone}
                            >
                              <FaEdit />
                            </button>
                          )}
                          {canDelete && (
                            <button
                              onClick={() => handleDelete(row.id)}
                              className={`text-red-500 mr-2 ${
                                isDone ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                            >
                              <FaTrash />
                            </button>
                          )}
                          {handleComplete && (
                            <button
                              onClick={() => handleComplete(row)}
                              className={`text-green-500 ${
                                isDone ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                              disabled={isDone}
                            >
                              <FaCheck />
                            </button>
                          )}
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

                        {columns.map((column) => (
                          <td
                            key={column.id}
                            className="py-2 px-4 border-b text-center"
                          >
                            {column.render
                              ? column.render(row)
                              : row[column.id]}
                          </td>
                        ))}
                      </tr>
                      {detailsPanel && expandedRows[rowIndex] && (
                        <tr>
                          <td
                            colSpan={columns.length}
                            className="bg-gray-200 dark:bg-gray-800"
                          >
                            {detailsPanel(row)}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={columns.length}
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
                        disabled={data.length < rowsPerPage}
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
    </>
  );
};

export default Table;
