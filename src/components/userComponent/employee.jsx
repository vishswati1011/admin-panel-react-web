import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import { deleteEmployee } from "../../redux/action/userAction";
import PropTypes from "prop-types"; // Import PropTypes
import styles from "./employee.module.css";
import EditEmployeeModal from "./editEmployeeModal";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import { useAlert } from "react-alert";
import { Box } from "@mui/material";
import { ModalStyle } from "../../utils/modalStyle";
import { formatDate } from "../../utils/dateFormate";
import { splitUserName } from "../../utils/splitUserName";

function Employee({ employee, key, index }) {
  const userData = useSelector((store) => store.userRoot);
  const { roles, employees } = userData;
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const alert = useAlert();

  const history = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClosed = () => setOpen(false);
  // Function to handle delete user
  const handleDeleteUser = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        deleteEmployee(
          employee?.userId?._id,
          (data) => alert.success(data),
          history,
        ),
      );
    },
    [dispatch, employee?.userId?._id, alert, history],
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const opens = Boolean(anchorEl);

  // Function to handle click event for menu button
  const handleClick = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl],
  );

  // Function to handle close event for menu
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  // Function to handle click event for alert menu (for super-admin role)
  const handleClickAlert = useCallback(() => {
    alert.info("You can not Edit/Delete this");
  }, [alert]);

  // Function to handle delete action
  const handleDelete = useCallback(() => {
    handleClose();
    handleOpen();
  }, [handleOpen, handleClose]);

  // Function to handle edit action
  const handleEdit = useCallback(() => {
    handleClose();
    setShowEditModal(true);
  }, [setShowEditModal, handleClose]);

  return (
    <>
      {/* Edit employee modal */}
      <EditEmployeeModal
        allRoles={roles}
        employee={employee}
        show={showEditModal}
        setShowEditModal={setShowEditModal}
      />

      {/* Delete confirmation modal */}
      <Modal
        open={open}
        onClose={handleClosed}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <p className={styles.confirmation_message}>
            Are you sure you want to delete this Employee?
          </p>
          <div className={styles.delete_employee_modal}>
            <button
              onClick={handleClosed}
              type="submit"
              className={styles.cancel_button}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteUser}
              type="submit"
              className={styles.delete_button}
            >
              Delete
            </button>
          </div>
        </Box>
      </Modal>

      {/* Employee row */}
      <table className={styles.employee_row_table} key={key} tabIndex={index}>
        <tr className={styles.employee_row} key={key}>
          <td className={styles.user_name_with_icon}>
            {employee?.userId?.image ? (
              <img
                src={employee?.userId?.image}
                alt="Profile"
                className={styles.user_image_icons}
              />
            ) : (
              <p className={styles.user_image_icons}>
                {splitUserName(employee?.userId?.username)}
              </p>
            )}

            <p
              className={styles.employee_row_user_name}
              title={employee?.userId?.username}
            >
              {employee?.userId?.username}
            </p>
          </td>

          <td className={styles.employee_row_email}>
            {employee?.userId?.email}
          </td>

          <td className={styles.employee_row_user_role}>
            {employee?.roleId?.name}
          </td>

          <td className={styles.employee_row_date}>
            {formatDate(employee?.userId?.createdAt)}
          </td>

          {/* Menu button for edit and delete actions */}
          {employee?.userId?._id !== employees[0]?.userId?._id ? (
            <div
              id={index + "hvgf"}
              aria-controls={opens ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={opens ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon
                className={styles.menu_icon}
                classes={employee?.userId?._id}
              />
            </div>
          ) : (
            <div
              id={index + "kbjhb"}
              aria-controls={opens ? "super-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={opens ? "true" : undefined}
              onClick={handleClickAlert}
            >
              <MoreVertIcon
                className={styles.menu_icon}
                classes={employee?.userId?._id}
              />
            </div>
          )}

          {/* Menu for edit and delete actions */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={opens}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleEdit} id={index + "jhvhg"}>
              <EditIcon className={employee?.userId?._id} />
            </MenuItem>
            <MenuItem onClick={handleDelete} id={index + "dhhvd"}>
              <DeleteIcon
                sx={{ color: red[500] }}
                className={employee?.userId?._id}
              />
            </MenuItem>
          </Menu>
        </tr>
      </table>
    </>
  );
}
// Add PropTypes validation
Employee.propTypes = {
  employee: PropTypes.shape({
    userId: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired, // Adjust the PropTypes validation as needed
    }),
    roleId: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Employee;
