// sortingUtils.js

export const sortData = (data, sortOrder, sortBy) => {
  return [...data].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "update") {
      return sortOrder === "asc"
        ? new Date(a.updateAt) - new Date(b.updateAt)
        : new Date(b.updateAt) - new Date(a.updateAt);
    }
    return 0;
  });
};
