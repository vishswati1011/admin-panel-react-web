import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./searchbar.module.css";
import { searchQueryText } from "../../redux/action/userAction";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef(null);
  // Define the responsive styles
  const searchInputStyles = {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "0",
    border: "none",
    backgroundColor: "#e9ecef",
  };

  useEffect(() => {
    // Trigger search action whenever searchQuery changes
    dispatch(searchQueryText(searchQuery));
  }, [dispatch, searchQuery]);

  return (
    <div ref={searchRef}>
      <TextField
        InputProps={{
          style: searchInputStyles,
          startAdornment: (
            <IconButton>
              {/* Update the color prop of the SearchIcon component */}
              <SearchIcon />
            </IconButton>
          ),
        }}
        className={styles.search_bar}
        id="standard-bare"
        variant="outlined"
        defaultValue={searchQuery}
        placeholder="Search in Drive"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
