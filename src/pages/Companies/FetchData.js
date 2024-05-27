import Request from "../../helpers/Request";

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
      size: query.pageSize,
      sortBy: "id",
    };
    // if (query.orderBy !== undefined) {
    //   if (query.orderBy.field === "id") {
    //     params["sortBy"] = "id";
    //   } else if (query.orderBy.field === "userId") {
    //     params["sortBy"] = "user.id";
    //   } else if (query.orderBy.field === "fname") {
    //     params["sortBy"] = "user.fName";
    //   } else if (query.orderBy.lName === "lName") {
    //     params["sortBy"] = "user.lname";
    //   } else if (query.orderBy.field === "email") {
    //     params["sortBy"] = "email";
    //   } else if (query.orderBy.field === "createdAt") {
    //     params["sortBy"] = "createdAt";
    //   }
    // }
    // if (query.search !== "") {
    //   params.search = query.search;
    // }
    const resp = await Request("get", "/api/fundamental/company", null);
    if (resp.status !== 200) {
      setSeverity("error");
      setSnackbarMessage(resp?.data?.message);
      setSnackbar(true);
    } else {
      setSeverity("success");
      setSnackbarMessage(resp?.data?.message);
      setSnackbar(true);
      let otherData = resp.data.data;
      let data = otherData.content;
      let temp = [];
      for (let i = 0; i < data.length; i++) {
        const edit = {
          id: data[i].id,
          name: data[i].name,
          shortName: data[i].shortName,
          companyType: data[i].companyType,
          taxIdentificationNumber: data[i].taxIdentificationNumber,
          taxOffice: data[i].taxOffice,
          manager: data[i].manager,
        };
        temp.push(edit);
      }

      setNumOfEntries(otherData.totalElements);
      resolve({
        data: temp,
        page: otherData.pageable.pageNumber,
        totalCount: otherData.totalElements,
      });
    }
  });

  return data;
}
