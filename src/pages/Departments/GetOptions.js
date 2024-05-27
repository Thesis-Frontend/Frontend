import Request from "../../helpers/Request";

export const getCompany = async () => {
  const resp = await Request(
    "get",
    "/api/fundamental/dropdown/companies/for-department"
  );
  const content = resp.data;
  return content;
};
export const getDepartmentTypes = async () => {
  const resp = await Request(
    "get",
    "/api/fundamental/dropdown/department-types/for-department"
  );
  const content = resp.data;

  return content;
};
export const getTowns = async () => {
  const resp = await Request(
    "get",
    "/api/fundamental/dropdown/towns/for-department"
  );
  const content = resp.data;

  return content;
};
export const getActivityTypes = async () => {
  const resp = await Request(
    "get",
    "/api/fundamental/dropdown/activity-types/for-department"
  );
  const content = resp.data;

  return content;
};
export const getManagers = async () => {
  const resp = await Request(
    "get",
    "/api/fundamental/dropdown/managers/for-department"
  );
  const content = resp.data;

  return content;
};
// export const getActivityTowns = async () => {
//   const resp = await Request(
//     "get",
//     "/api/fundamental/dropdown/activity-towns/for-department"
//   );
//   const content = resp.data;

//   return content;
// };
export const getParentDepartments = async () => {
  const resp = await Request(
    "get",
    "/api/fundamental/dropdown/departments/for-department"
  );
  const content = resp.data;

  return content;
};

export default async function GetOptions() {
  const [
    company,
    departmentTypes,
    towns,
    activityTypes,
    managers,
    // activityTowns,
    parentDepartments,
  ] = await Promise.all([
    getCompany(),
    getDepartmentTypes(),
    getTowns(),
    getActivityTypes(),
    getManagers(),
    // getActivityTowns(),
    getParentDepartments(),
  ]);
  const options = {
    company,
    departmentTypes,
    towns,
    activityTypes,
    managers,
    // activityTowns,
    parentDepartments,
  };
  return options;
}
