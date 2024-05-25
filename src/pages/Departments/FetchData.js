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
    // const params = {
    //   offset: query.page,
    //   "page-size": query.pageSize,
    //   "sort-by": "id",
    // };
    // if (query.orderBy !== undefined) {
    //   if (query.orderBy.field === "id") {
    //     params["sort-by"] = "id";
    //   } else if (query.orderBy.field === "userId") {
    //     params["sort-by"] = "user.id";
    //   } else if (query.orderBy.field === "fname") {
    //     params["sort-by"] = "user.fName";
    //   } else if (query.orderBy.lName === "lName") {
    //     params["sort-by"] = "user.lname";
    //   } else if (query.orderBy.field === "email") {
    //     params["sort-by"] = "email";
    //   } else if (query.orderBy.field === "createdAt") {
    //     params["sort-by"] = "createdAt";
    //   }
    // }
    // if (query.search !== "") {
    //   params.search = query.search;
    // }
    const resp = await Request("get", "/api/fundamental/department", null);
    console.log(resp);
    if (resp.status !== 200) {
      setSeverity("error");
      setSnackbarMessage(resp?.data?.message);
      setSnackbar(true);
    } else {
      let otherData = resp.data.data;
      let data = otherData.content;
      let temp = [];
      for (let i = 0; i < data.length; i++) {
        const edit = {
          id: data[i].id,
          name: data[i].name,
          departmentType: data[i].departmentType,
          company: data[i].company,
          socialSecurityNumber: data[i].socialSecurityNumber,
          town: data[i].town,
          manager: data[i].manager,
          activityType: data[i].activityType,
          activityTowns: data[i].activityTowns,
          parentDepartments: data[i].parentDepartments,
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
