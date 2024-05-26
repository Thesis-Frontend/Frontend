import Request from "../../../helpers/Request";

export const getDepartments = async () => {
  const resp = await Request(
    "get",
    "/api/fundamental/dropdown/department/for-training-record"
  );
  const content = resp.data;
  let arr = [];
  for (let i = 0; i < content.length; i++) {
    let comp = {};
    comp["name"] = content[i].name;
    comp["id"] = content[i].id;
    arr.push(comp);
  }
  return arr;
};
export const getInstructors = async () => {
  const resp = await Request(
    "get",
    "/api/fundamental/dropdown/instructor/for-training-record"
  );
  const content = resp.data;
  let arr = [];
  for (let i = 0; i < content.length; i++) {
    let comp = {};
    comp["name"] = content[i].name + " " + content[i].surname;
    comp["id"] = content[i].id;
    arr.push(comp);
  }
  return arr;
};
export const getAttendees = async () => {
  const resp = await Request(
    "get",
    "/api/fundamental/dropdown/attendees/for-training-record"
  );
  const content = resp.data;
  let arr = [];
  for (let i = 0; i < content.length; i++) {
    let comp = {};
    comp["name"] = content[i].name;
    comp["id"] = content[i].id;
    arr.push(comp);
  }
  return arr;
};
export const getTrainingTypes = async () => {
  const resp = await Request(
    "get",
    "/api/training/dropdown/training-types/for-training-record"
  );
  const content = resp.data;
  let arr = [];
  for (let i = 0; i < content.length; i++) {
    let comp = {};
    comp["name"] = content[i].name;
    comp["id"] = content[i].id;
    arr.push(comp);
  }
  return arr;
};

const isOnline = [
  { id: 1, name: "True", val: true },
  { id: 2, name: "False", val: false },
];

export default async function GetOptions() {
  const [departments, instructor, attendees, trainingTypes] = await Promise.all(
    [getDepartments(), getInstructors(), getAttendees(), getTrainingTypes()]
  );
  const options = { departments, instructor, attendees, trainingTypes, isOnline };
  return options;
}
