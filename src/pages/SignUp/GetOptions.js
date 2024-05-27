import Request from "../../helpers/Request";

export const getCompanyTypes = async () => {
  const resp = await Request("get", "/api/fundamental/company-type");
  console.log(resp);
  const data = resp.data.data;
  const content = data.content;
  return content;
};
export const getSubscriptionPackages = async () => {
  const resp = await Request(
    "get",
    "/api/subscription/subscription-package/all",
    null,
    null
  );
  console.log(resp);
  const data = resp.data.data;
  return data;
};

export default async function GetOptions() {
  const [companyTypes, subscriptionPackages] = await Promise.all([
    getCompanyTypes(),
    getSubscriptionPackages(),
  ]);
  const options = { companyTypes, subscriptionPackages };
  return options;
}
