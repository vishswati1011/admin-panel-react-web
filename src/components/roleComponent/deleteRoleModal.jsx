import React from "react";
import { useDispatch } from "react-redux";
import style from "./deleteRoleModal.module.css"; // Import CSS module
import Modal from "@mui/material/Modal";
import { deleteRole } from "../../redux/action/userAction";
import { useCallback } from "react";
import { useAlert } from "react-alert";
import PropTypes from "prop-types"; // Import PropTypes
import { Box } from "@mui/material";
import { ModalStyle } from "../../utils/modalStyle";
const DeleteRoleModal = ({ deleteRoleModal, setDeleteRoleModal, roleId }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  // Function to handle the role deletion
  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(deleteRole(roleId, (data) => alert.success(data)));
      setTimeout(() => {
        setDeleteRoleModal(false);
      }, 1000);
    },
    [dispatch, roleId, alert, setDeleteRoleModal],
  );

  // Function to close the modal
  const handleCloseModal = useCallback(() => {
    setDeleteRoleModal(false);
  }, [setDeleteRoleModal]);

  return (
    <>
      {/* Delete role Modal */}
      <Modal
        open={deleteRoleModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          {/* Text for the confirmation message */}
          <p className={style["delete-role-modal-text"]}>
            Are you sure you want to delete this role?
          </p>
          <div className={style["delete-role-modal-div"]}>
            {/* Cancel button */}
            <div
              className={style["delete-role-modal-button"]}
              onClick={handleCloseModal}
            >
              Cancel
            </div>
            {/* Delete button */}
            <div
              onClick={handleDelete}
              className={style["delete-role-modal-button-right"]}
            >
              Delete
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
// Define PropTypes for the expected props
DeleteRoleModal.propTypes = {
  deleteRoleModal: PropTypes.bool.isRequired,
  setDeleteRoleModal: PropTypes.func.isRequired,
  roleId: PropTypes.string.isRequired,
};
export default DeleteRoleModal;
