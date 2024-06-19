import { useEffect } from "react";
import { useCallback } from "react";

const Search = ({
  FilterData,
  searchQuery,
  setFilteredData,
  setHasMatchingResults,
}) => {
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);
  const handleSearch = useCallback(() => {
    if (searchQuery === "") {
      setFilteredData(FilterData);
      setHasMatchingResults(true);
    } else {
      const filteredResults = FilterData.filter((item) => {
        const lowerSearchQuery = searchQuery.toLowerCase();
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
      setFilteredData(filteredResults);
      setHasMatchingResults(filteredResults.length > 0);
    }
  }, [FilterData, searchQuery, setFilteredData, setHasMatchingResults]);
  ``;

  return null; // This component doesn't need to render anything, just handles the search logic
};

export default Search;
