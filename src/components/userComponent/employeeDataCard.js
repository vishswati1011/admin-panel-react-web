import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import { deleteEmployee } from "../../redux/action/userAction";
import styles from "./employee.module.css";
import EditEmployeeModal from "./editEmployeeModal";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateFormate";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import { useAlert } from "react-alert";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { ModalStyle } from "../../utils/modalStyle";
import { splitUserName } from "../../utils/splitUserName";

const Employee = ({ employee, key }) => {
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
  }, []);

  // Function to handle click event for alert menu (for super-admin role)
  const handleClickAlert = useCallback(() => {
    alert.info("You can not Edit/Delete this");
  }, [alert]);

  // Function to handle delete action
  const handleDelete = useCallback(() => {
    handleClose();
    setOpen(true);
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
          <p>Are you sure you want to delete this Employee?</p>
          <div className={styles.delete_employee_modal}>
            <button
              type="submit"
              className={styles.cancel_button}
              id="cancelbutton"
              onClick={handleClosed}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteUser}
              type="submit"
              className={styles.delete_button}
              id="confirm"
            >
              Delete
            </button>
          </div>
        </Box>
      </Modal>

      {/* Employee row */}
      <div
        className={styles.employee_card}
        key={key}
        id={employee?.userId?._id}
      >
        <div className={styles.employee_name_role}>
          <div className={styles.user_name_image_div}>
            {employee?.userId?.image ? (
              <img
                src={employee?.userId?.image}
                alt="Profile"
                className={styles.user_card_image_icons}
              />
            ) : (
              <p className={styles.user_card_image_icons}>
                {splitUserName(employee?.userId?.username)}
              </p>
            )}
            <p className={styles.employee_card_user_name}>
              {employee?.userId?.username}
            </p>
          </div>

          <p className={styles.employee_card_user_role}>
            {employee?.roleId?.name}
          </p>
        </div>
        <div className={styles.employee_email}>
          <p>Email:&nbsp;</p>
          <p className={styles.employee_card_email}>
            {employee?.userId?.email}
          </p>
        </div>

        <div className={styles.employee_joining}>
          <p className={styles.employee_card_date}>
            Joining Date:&nbsp;
            {formatDate(employee?.userId?.createdAt)}
          </p>

          {/* Menu button for edit and delete actions */}
          {employee?.userId?._id !== employees[0]?.userId?._id ? (
            <div
              id={employee?.userId?._id}
              aria-controls={opens ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={opens ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon
                className={styles.menu_icon}
                id={employee?.userId?._id}
              />
            </div>
          ) : (
            <div
              id={employee?.userId?._id}
              aria-controls={opens ? "super-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={opens ? "true" : undefined}
              onClick={handleClickAlert}
            >
              <MoreVertIcon
                className={styles.menu_icon}
                id={employee?.userId?._id}
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
            <MenuItem onClick={handleEdit} id={employee?.userId?._id}>
              <EditIcon />
            </MenuItem>
            <MenuItem
              onClick={handleDelete}
              id={employee?.userId?._id + "jhvv"}
            >
              <DeleteIcon sx={{ color: red[500] }} />
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};

Employee.propTypes = {
  employee: PropTypes.node.isRequired,
};
export default Employee;
