import Request from "../../helpers/Request";

export const getCompanyTypes = async () => {
  const resp = await Request("get", "/api/fundamental/dropdown/company-types/for-company");
  const content = resp.data;
  console.log(content);
  // let arr = [];
  // for (let i = 0; i < content.length; i++) {
  //   let comp = {};
  //   comp["name"] = content[i].name;
  //   comp["id"] = content[i].id;
  //   arr.push(comp);
  // }
  // return arr;
  return content;
};
export const getManagers = async () => {
  const resp = await Request("get", "/api/fundamental/dropdown/managers/for-company");
  const content = resp.data;
  console.log(content);
  // let arr = [];
  // for (let i = 0; i < content.length; i++) {
  //   let comp = {};
  //   comp["name"] = content[i].name;
  //   comp["id"] = content[i].id;
  //   arr.push(comp);
  // }
  // return arr;
  return content;
};


export default async function GetOptions() {
  const [companyTypes, managers] = await Promise.all([getCompanyTypes(), getManagers()]);
  const options = { companyTypes, managers };
  return options;
}
