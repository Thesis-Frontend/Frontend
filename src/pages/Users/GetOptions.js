import Request from "../../helpers/Request";

export const getDepartments = async () => {
  const resp = await Request(
    "get",
    "/api/fundamental/dropdown/departments/for-user"
  );
  const content = resp.data;
  return content;
};
export const getManagers = async () => {
  const resp = await Request(
    "get",
    "/api/fundamental/dropdown/managers/for-user"
  );
  const content = resp.data;
  return content;
};
export const getEducationStatus = async () => {
  const resp = await Request(
    "get",
    "/api/fundamental/dropdown/education-statuses/for-user"
  );
  const content = resp.data;
  return content;
};
export const getResponsibleRegions = async () => {
  const resp = await Request(
    "get",
    "/api/fundamental/dropdown/regions/for-user"
  );
  const content = resp.data;
  return content;
};
export const getRoles = async () => {
  const resp = await Request("get", "/api/auth/roles-and-policies/roles/all");
  const data = resp.data;
  const content = data.data;
  let arr = [];
  for (let i = 0; i < content.length; i++) {
    let comp = {};
    comp["name"] = content[i].name;
    comp["id"] = content[i].id;
    arr.push(comp);
  }
  return arr;
};

export default async function GetOptions() {
  const [departments, managers, educationStatus, responsibleRegions, roles] =
    await Promise.all([
      getDepartments(),
      getManagers(),
      getEducationStatus(),
      getResponsibleRegions(),
      getRoles(),
    ]);
  const options = {
    departments,
    managers,
    educationStatus,
    responsibleRegions,
    roles,
  };
  return options;
}
