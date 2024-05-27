import Request from "../../../helpers/Request";

export const getCompanies = async () => {
  const resp = await Request("get", "/api/fundamental/company-type");
  const data = resp.data.data;
  const content = data.content;
  return content;
};

export default async function GetOptions() {
  const [companies] = await Promise.all([getCompanies()]);
  const options = { companies };
  return options;
}
