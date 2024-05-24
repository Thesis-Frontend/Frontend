import Request from "../../helpers/Request";
import moment from "moment";

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
    const resp = await Request("get", "/api/fundamental/user", null);
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
          surname: data[i].surname,
          department: data[i].department,
          company: data[i].department?.company,
          title: data[i].title,
          email: data[i].email,
          manager: data[i].manager,
          identityNumber: data[i].identityNumber,
          phoneNumber: data[i].phoneNumber,
          educationStatus: data[i].educationStatus,
          marital: data[i].marital,
          gender: data[i].gender,
          startDateOfWork: data[i].startDateOfWork
            ? new moment(data[i].startDateOfWork).format("DD-MM-YYYY")
            : "-",
          endDateOfWork: data[i].endDateOfWork
            ? new moment(data[i].endDateOfWork).format("DD-MM-YYYY")
            : "-",
          responsibleRegions: data[i].responsibleRegions,
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
