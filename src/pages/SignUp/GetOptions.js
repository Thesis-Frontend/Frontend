import Request from "../../helpers/Request";

export const getCompanyTypes = async () => {
  const resp = await Request("get", "/api/fundamental/company-type");
  console.log(resp);
  const data = resp.data;
  const content = data.content;
  //   let arr = [];
  //   for (let i = 0; i < content.length; i++) {
  //     let comp = {};
  //     comp["name"] = content[i].name;
  //     comp["id"] = content[i].id;
  //     arr.push(comp);
  //   }
  //   return arr;
  return content;
};

export default async function GetOptions() {
  const [companyTypes] = await Promise.all([getCompanyTypes()]);
  const options = { companyTypes };
  return options;
}
