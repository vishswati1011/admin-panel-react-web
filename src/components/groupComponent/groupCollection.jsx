import React, { useState, useCallback } from "react";

import { useSelector } from "react-redux";
import DeleteGroupModal from "./deleteGroupModal";
import styles from "./groupCollection.module.css";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

const GroupCollection = ({ group, user, index }) => {
  const [deleteGroupModal, setDeleteGroupModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const employees = useSelector((store) => store.userRoot.employees);

  // Callback to handle the click event of the menu button
  const handleClick = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl],
  );

  // Callback to close the menu
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  // Function to render the workflow name with ellipsis if it exceeds the maximum length
  const renderWorkflowName = useCallback((name) => {
    const maxLength = 25;
    if (name.includes(" ")) {
      return name;
    } else if (name.length > maxLength) {
      return name.slice(0, maxLength) + "...";
    } else {
      return name;
    }
  }, []);

  return (
    <>
      {/* Delete Group Modal */}
      <DeleteGroupModal
        groupId={group._id}
        user={user}
        setDeleteGroupModal={setDeleteGroupModal}
        deleteGroupModal={deleteGroupModal}
      />

      {/* Group Card */}
      <div className={styles.group_card} id={index}>
        <p className={styles.groups_card_text}>
          {renderWorkflowName(group?.groupName)}
        </p>

        {/* Menu Button */}
        <IconButton onClick={handleClick} id={index}>
          <svg
            width="3"
            height="12"
            viewBox="0 0 3 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id={index}
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill="#444444" />
            <circle cx="1.5" cy="6" r="1.5" fill="#444444" />
            <circle cx="1.5" cy="10.5" r="1.5" fill="#444444" />
          </svg>
        </IconButton>

        {/* Menu */}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link
            to="/edit-group"
            className={styles.edit_group}
            id={index + "jnj"}
            state={{ editableData: group, group: group, employees: employees }}
          >
            <MenuItem id={index + "jjnhb"}>Edit</MenuItem>
          </Link>
          <Link
            to="/view-group"
            id={index + "knjn"}
            className={styles.edit_group}
            state={{ group: group, user: user, employees: employees }}
          >
            <MenuItem id={index + "knjn"}>View</MenuItem>
          </Link>
          <MenuItem
            id={index + "jnjbj"}
            onClick={() => {
              setDeleteGroupModal(true);
              handleClose();
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};
// Define PropTypes for the expected props
GroupCollection.propTypes = {
  group: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  user: PropTypes.arrayOf(
    PropTypes.shape({
      roleId: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  ).isRequired,
};
export default GroupCollection;
