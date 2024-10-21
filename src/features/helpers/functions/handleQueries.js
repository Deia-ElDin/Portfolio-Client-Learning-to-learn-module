export const convertQueryToDisplayQuery = (query) => {
  return `display${query[0].toUpperCase()}${query.substring(1)}`;
};
