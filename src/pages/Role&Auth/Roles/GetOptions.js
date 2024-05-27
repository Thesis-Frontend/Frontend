import Request from "../../../helpers/Request";

export const getPolicies = async () => {
  const resp = await Request(
    "get",
    "/api/auth/roles-and-policies/policies/all"
  );
  const content = resp.data.data;
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
  const [policies] = await Promise.all([getPolicies()]);
  const options = {
    policies,
  };
  return options;
}
