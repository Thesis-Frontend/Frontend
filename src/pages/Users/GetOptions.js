import Request from "../../helpers/Request";

export const getDepartmentTypes = async () => { // department olacak
  const resp = await Request("get", "/api/fundamental/department-type");
  const data = resp.data.data;
  const content = data.content;
  return content;
};
export const getActivityTypes = async () => { // company olacak
  const resp = await Request("get", "/api/fundamental/activity-type");
  const data = resp.data.data;
  const content = data.content;

  return content;
};
export const getTowns = async () => {
  const resp = await Request("get", "/api/fundamental/town");
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

export const getEducationStatus = async () => {
  const resp = await Request("get", "/api/fundamental/education-status");
  const data = resp.data.data;
  const content = data.content;
  return content;
};

const managers = [
  { id: 1, name: "Ben" },
  { id: 2, name: "Sen" }
];
const marital = [
  { id: 1, name: "Married" },
  { id: 2, name: "Single" },
];
const gender = [
  { id: 1, name: "Woman" },
  { id: 2, name: "Man" },
];

export default async function GetOptions() {
  const [departmentTypes, activityTypes, towns, educationStatus] =
    await Promise.all([
      getDepartmentTypes(),
      getActivityTypes(),
      getTowns(),
      getEducationStatus(),
    ]);
  const options = {
    departmentTypes,
    activityTypes,
    towns,
    managers,
    educationStatus,
    marital,
    gender
  };
  return options;
}
