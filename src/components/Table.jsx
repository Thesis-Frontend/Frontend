import React, { useState } from "react";
import { FaPlus, FaFileExport, FaFileImport } from "react-icons/fa";
import SessionHelper from "../helpers/SessionHelper";

const Table = ({
  title,
  columns,
  data,
  onCreate,
  onUpdate,
  onDelete,
  ModalComponent,
}) => {
  const user = SessionHelper.getUser();
  const role = user?.role ? user.role : "admin";

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreate = () => {
    setModalData({});
    setModalOpen(true);
  };

  const handleEdit = (row) => {
    setModalData(row);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      onDelete(id);
    }
  };

  const handleSave = (data) => {
    if (data.id) {
      onUpdate(data);
    } else {
      onCreate(data);
    }
    setModalOpen(false);
  };

  const filteredData = data.filter((row) =>
    columns.some((column) =>
      row[column.id].toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.id} className="py-2 px-4 border-b text-left">
                  {column.label}
                </th>
              ))}
              {role === "admin" && (
                <th className="py-2 px-4 border-b text-left">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.id} className="py-2 px-4 border-b">
                    {row[column.id]}
                  </td>
                ))}
                {role === "admin" && (
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEdit(row)}
                      className="text-blue-500 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        data={modalData}
      />
    </div>
  );
};

export default Table;
