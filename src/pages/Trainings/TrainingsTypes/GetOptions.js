import Request from "../../../helpers/Request";

export const getCompanies = async () => {
  const resp = await Request("get", "/api/fundamental/company-type");
  console.log(resp);
  const data = resp.data.data;
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

const managers = [
  { id: 1, name: "Ben" },
  { id: 2, name: "Sen" },
];

export default async function GetOptions() {
  const [companies] = await Promise.all([getCompanies()]);
  const options = { companies, managers };
  return options;
}
