export const getQueryString = (type?: number) => {
  if (type || type === 0) {
    const queryString: string = window.location.search;
    // const result = queryString.split("&")[type].split("=")[1];
    const result = queryString.split("&")[type];
    return result.split("=")[1];
  }
  const queryString: string = window.location.search;
  const result = queryString.split("=")[1];

  return result;
};
