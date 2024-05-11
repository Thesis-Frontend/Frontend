import React from "react";
import Table from "../../components/Table";
import CompanyModal from "./CompanyModal"; // Adjust the path as necessary
import FetchData from "./FetchData";

// const fetchCompanies = async (page, rowsPerPage, searchQuery, sortConfig) => {
//   // Replace this with your actual API call
//   const response = await fetch(
//     `/api/companies?page=${page}&limit=${rowsPerPage}&search=${searchQuery}&sort=${sortConfig.key}&order=${sortConfig.direction}`
//   );
//   const data = await response.json();
//   return data;
// };



const Companies = () => {
  const columns = [
    { id: "companyName", label: "Company Name", minWidth: 170 },
    { id: "city", label: "City", minWidth: 100 },
    { id: "companyType", label: "Company Type", minWidth: 100 },
    { id: "taxOffice", label: "Tax Office", minWidth: 100 },
    { id: "taxNumber", label: "Tax ID", minWidth: 100 },
  ];

  const handleCreate = (newCompany) => {
    // Handle create company logic
  };

  const handleUpdate = (updatedCompany) => {
    // Handle update company logic
  };

  const handleDelete = (id) => {
    // Handle delete company logic
  };

  return (
    <Table
      title="Companies"
      columns={columns}
      fetchData={FetchData}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      ModalComponent={CompanyModal}
    />
  );
};

export default Companies;
