// searchUtils.js

export const searchItems = (items, searchQuery, setHasMatchingResults) => {
  if (!searchQuery) {
    setHasMatchingResults(true);
    return items;
  }

  const lowerSearchQuery = searchQuery.toLowerCase();
  return items.filter((item) => {
    return (
      (item?.name && item.name.toLowerCase().includes(lowerSearchQuery)) ||
      (item?.username &&
        item.username.toLowerCase().includes(lowerSearchQuery)) ||
      (item?.createdAt &&
        item.createdAt.toLowerCase().includes(lowerSearchQuery)) ||
      (item?.updatedAt &&
        item.updatedAt.toLowerCase().includes(lowerSearchQuery))
    );
  });
};
