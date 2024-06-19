import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import Modal from "@mui/material/Modal";
import { editRole } from "../../redux/action/userAction";
import DeleteRoleModal from "./deleteRoleModal";
import styles from "./role.module.css"; // Import CSS module
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useCallback } from "react";
import { useAlert } from "react-alert";
import PropTypes from "prop-types"; // Import PropTypes
import { Box } from "@mui/material";
import { ModalStyle } from "../../utils/modalStyle";

const Role = (props) => {
  const userData = useSelector((store) => store.userRoot);
  const { user } = userData;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const alert = useAlert();

  // Function to redirect to edit role
  const RedirectToEdit = useCallback(() => {
    if (user?.role === "super-admin") {
      handleClose();
      setShow(true);
    }
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  // Function to handle click on menu icon
  const handleClick = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl],
  );

  // Function to close the menu
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const [deleteRoleModal, setDeleteRoleModal] = useState(false);
  const [roleName, setRoleName] = useState(`${props?.role?.name}`);

  // Function to check if the input field is empty
  const checkinput = useCallback(() => {
    if (roleName) {
      setCheckfield("");
    }
  }, [roleName]);

  const [disabled, setDisabled] = useState(false);
  const [checkfield, setCheckfield] = useState("");

  // Function to handle role update
  const handleUpdate = useCallback(
    (e) => {
      e.preventDefault();
      if (!roleName) {
        setCheckfield("Please Fill RoleName field", "error");
        return;
      }
      setDisabled(true);
      dispatch(
        editRole(
          {
            roleId: props?.role?._id,
            name: roleName,
          },
          (data, type) => alert.show(data, { type: type }),
        ),
      );
      setDisabled(false);
      setShow(false);
    },
    [roleName, dispatch, props?.role?._id, alert],
  );

  // Function to render the shortened role name
  const renderWorkflowName = useCallback((name) => {
    const maxLength = 24;
    if (name?.includes(" ")) {
      return name;
    } else if (name?.length > maxLength) {
      return name?.slice(0, maxLength) + "...";
    } else {
      return name;
    }
  }, []);
  // to open Edit modal
  const handleEdit = useCallback(() => {
    handleClose();
    setShow(true);
  }, [setShow, handleClose]);
  // to open delete modal
  const handleDelete = useCallback(() => {
    handleClose();
    setDeleteRoleModal(true);
  }, [setDeleteRoleModal, handleClose]);

  return (
    <>
      {/* Delete Role Modal */}
      <DeleteRoleModal
        roleId={props?.role?._id}
        deleteRoleModal={deleteRoleModal}
        user={user}
        setDeleteRoleModal={setDeleteRoleModal}
      />

      {/* Edit Role Modal */}
      <Modal
        open={show}
        onClose={setShow.bind(this, false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <h2>Edit Role</h2>
          <Form onSubmit={handleUpdate} className={styles.form_role}>
            {/* Role Name Input */}
            <input
              maxLength={25}
              onKeyDown={checkinput.bind()}
              style={{
                color: "black",
                border: "1px solid gray",
                borderRadius: "5px",
              }}
              className={styles.add_role_input}
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              type="text"
              placeholder="Role"
            />
            {checkfield && (
              <p className="text-danger">Please Enter Role Title</p>
            )}

            {/* Save Button */}
            <div className={styles.edit_modal_button_div}>
              <button
                type="submit"
                disabled={disabled}
                className={styles.save_button}
              >
                Save
              </button>
              <button
                type="submit"
                onClick={setShow.bind(this, false)}
                className={styles.cancel_button}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Box>
      </Modal>

      <div className={styles.role_card} id={props?.index}>
        {/* Role Name */}
        <p onClick={RedirectToEdit} className={styles.role_text}>
          {renderWorkflowName(props?.role?.name)}
        </p>

        {/* Menu Icon */}
        <IconButton onClick={handleClick} id={props?.role?._id}>
          <svg
            width="3"
            height="12"
            viewBox="0 0 3 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
          {/* Edit Option */}
          <MenuItem onClick={handleEdit} id={props?.index + "jjd"}>
            Edit
          </MenuItem>

          {/* Delete Option */}
          <MenuItem onClick={handleDelete} id={"22" + props?.index + "jb"}>
            Delete
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};
// Define PropTypes for the expected 'role' prop
Role.propTypes = {
  role: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
export default Role;
