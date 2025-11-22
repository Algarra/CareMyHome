export const searchparamsToString = (searchParams: {
  [key: string]: string;
}) => {
  let searchParamsString = "";

  for (const key of Object.keys(searchParams)) {
    if (searchParamsString === "") searchParamsString += `?`;
    if (searchParamsString !== "?") searchParamsString += `&`;
    searchParamsString += `${key}=${searchParams[key]}`;
  }

  return searchParamsString;
};
