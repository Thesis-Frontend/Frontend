import Request from "../../../helpers/Request";

const mockPolicies = [
  {
    id: 1,
    name: "policy 1",
    created_at: "22.05.2024",
    deleted_at: "",
    active: true,
    // policyIds: [{ id: 1, name: "policy1" }],
  },
  {
    id: 2,
    name: "policy 2",
    created_at: "22.05.2024",
    deleted_at: "",
    active: true,
  },
  {
    id: 3,
    name: "policy 3",
    created_at: "22.05.2024",
    deleted_at: "",
    active: false,
  },
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

    // const resp = await Request("get", "/api/roles", null, params);
    // if (resp.status !== 200) {
    //   setSeverity("error");
    //   setSnackbarMessage(language.etc.fetchingError + resp?.data?.message);
    //   setSnackbar(true);
    // } 
    else {
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
        data: mockPolicies,
        // page: data.pageable.pageNumber,
        // totalCount: data.totalElements,
      });
    }
  });

  return data;
}
