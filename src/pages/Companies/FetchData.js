import Request from "../../helpers/Request";

const mockCompanies = [
    { id: 1, companyName: "Company A", city: "City A", companyType: "Type A", taxOffice: "Office A", taxNumber: "123456" },
    { id: 2, companyName: "Company B", city: "City B", companyType: "Type B", taxOffice: "Office B", taxNumber: "789012" },
    { id: 3, companyName: "Company B", city: "City B", companyType: "Type B", taxOffice: "Office B", taxNumber: "789012" },
    { id: 4, companyName: "Company B", city: "City B", companyType: "Type B", taxOffice: "Office B", taxNumber: "789012" },
    { id: 5, companyName: "Company B", city: "City B", companyType: "Type B", taxOffice: "Office B", taxNumber: "789012" },
    { id: 6, companyName: "Company B", city: "City B", companyType: "Type B", taxOffice: "Office B", taxNumber: "789012" },
    { id: 7, companyName: "Company B", city: "City B", companyType: "Type B", taxOffice: "Office B", taxNumber: "789012" },
    { id: 8, companyName: "Company B", city: "City B", companyType: "Type B", taxOffice: "Office B", taxNumber: "789012" },
    { id: 9, companyName: "Company B", city: "City B", companyType: "Type B", taxOffice: "Office B", taxNumber: "789012" },
    { id: 10, companyName: "Company B", city: "City B", companyType: "Type B", taxOffice: "Office B", taxNumber: "789012" },
  ];

export default function FetchData(
  query,
  setSnackbar,
  setSnackbarMessage,
  setSeverity,
  setNumOfEntries,
  type,
  filterProps
) {
  const data = new Promise(async (resolve, reject) => {
    const params = {
      offset: query.page,
      "page-size": query.pageSize,
      "sort-by": "id",
    };
    if (query.orderBy !== undefined) {
      if (query.orderBy.field === "id") {
        params["sort-by"] = "id";
      } else if (query.orderBy.field === "userId") {
        params["sort-by"] = "user.id";
      } else if (query.orderBy.field === "fname") {
        params["sort-by"] = "user.fName";
      } else if (query.orderBy.field === "lName") {
        params["sort-by"] = "user.lname";
      } else if (query.orderBy.field === "email") {
        params["sort-by"] = "email";
      } else if (query.orderBy.field === "createdAt") {
        params["sort-by"] = "createdAt";
      }
    }
    if (query.search !== "") {
      params.search = query.search;
    }
  

    const resp = await Request(
      "get",
      "/api/companies",
      null,
      params
    );
    console.log(resp);
    if (resp.status !== 200) {
      setSeverity("error");
      setSnackbarMessage(language.etc.fetchingError + resp?.data?.message);
      setSnackbar(true);
    } else {
    //   let otherData = resp.data;
    //   let data = otherData.content;
    //   const userContent = data.content;
    //   let temp = [];
    //   for (let i = 0; i < userContent.length; i++) {
    //     const edit = {         
    //     };
    //     temp.push(mockCompanies);
    //   }

    //   setNumOfEntries(otherData.totalElements);
      resolve({
        // data: temp,
        data: mockCompanies,
        // page: data.pageable.pageNumber,
        // totalCount: data.totalElements,
      });
    }
  });

  return data;
}