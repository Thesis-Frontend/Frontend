import Request from "../../helpers/Request";

export const getDepartmentTypes = async () => {
  const resp = await Request("get", "/api/fundamental/department-type");
  console.log(resp);
  const data = resp.data.data;
  const content = data.content;
  return content;
};
export const getCompanies = async () => {
  // const resp = await Request("get", "/api/fundamental/companies");
  // console.log(resp);
  // const data = resp.data.data;
  // const content = data.content;
  // return content;
  return [];
};
export const getActivityTypes = async () => {
  const resp = await Request("get", "/api/fundamental/activity-type");
  console.log(resp);
  const data = resp.data.data;
  const content = data.content;

  return content;
};
export const getTowns = async () => {
  const resp = await Request("get", "/api/fundamental/town");
  console.log(resp);
  const data = resp.data.data;
  const content = data.content;

  let arr = [];
  for (let i = 0; i < content.length; i++) {
    let comp = {};
    comp["name"] = content[i].name;
    comp["id"] = content[i].id;
    arr.push(comp);
  }
  return arr;
};

const managers = [
  { id: 1, name: "Ben" },
  { id: 2, name: "Sen" },
];

export default async function GetOptions() {
  const [departmentTypes, activityTypes, towns, companies] = await Promise.all([
    getDepartmentTypes(),
    getActivityTypes(),
    getTowns(),
    getCompanies(),
  ]);
  const options = {
    departmentTypes,
    activityTypes,
    towns,
    managers,
    companies,
  };
  return options;
}
