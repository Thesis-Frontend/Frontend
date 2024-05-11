import React, { useState, useEffect } from "react";
import Table from "../../components/Table"; // Adjust the path as necessary
import CompanyModal from "./CompanyModal"; // Adjust the path as necessary

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch companies data here. This is just a placeholder.
    setTimeout(() => {
      setCompanies([
        {
          id: 1,
          companyName: "Company A",
          city: "City A",
          companyType: "Type A",
          taxOffice: "Office A",
          taxNumber: "123456",
        },
        {
          id: 2,
          companyName: "Company B",
          city: "City B",
          companyType: "Type B",
          taxOffice: "Office B",
          taxNumber: "789012",
        },
        // Add more companies as needed
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    { id: "companyName", label: "Company Name", minWidth: 170 },
    { id: "city", label: "City", minWidth: 100 },
    { id: "companyType", label: "Company Type", minWidth: 100 },
    { id: "taxOffice", label: "Tax Office", minWidth: 100 },
    { id: "taxNumber", label: "Tax ID", minWidth: 100 },
  ];

  const handleCreate = (newCompany) => {
    setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
  };

  const handleUpdate = (updatedCompany) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      )
    );
  };

  const handleDelete = (id) => {
    setCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.id !== id)
    );
  };

  return (
    <div className="flex flex-col h-full">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table
          title={"Companies"}
          columns={columns}
          data={companies}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          ModalComponent={CompanyModal}
        />
      )}
    </div>
  );
};

export default Companies;
