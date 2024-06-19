import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { ModalStyle } from "../../utils/modalStyle";
import { deleteGroup } from "../../redux/action/userAction";
import style from "./deleteGroupModal.module.css";
import PropTypes from "prop-types";
const DeleteGroupModal = ({
  deleteGroupModal,
  setDeleteGroupModal,
  groupId,
}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  // Function to handle the delete action
  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(deleteGroup(groupId, (data) => alert.success(data))); // Dispatch deleteGroup action
      setDeleteGroupModal(false); // Close the modal
    },
    [dispatch, groupId, alert, setDeleteGroupModal],
  );
  // Function to close modal
  const handleCloseModal = useCallback(() => {
    setDeleteGroupModal(false);
  }, [setDeleteGroupModal]);

  return (
    <>
      {/* Delete Group Modal */}
      <Modal
        open={deleteGroupModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <p className={style["delete-group-modal-text"]}>
            Are you sure you want to delete this Group?
          </p>
          <div className={style["delete-group-modal-div"]}>
            <div
              className={style["delete-group-modal-button"]}
              onClick={handleCloseModal}
            >
              Cancel
            </div>
            <div
              onClick={handleDelete}
              className={style["delete-group-modal-button-right"]}
            >
              Delete
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
DeleteGroupModal.propTypes = {
  deleteGroupModal: PropTypes.node.isRequired,
  setDeleteGroupModal: PropTypes.node.isRequired,
  groupId: PropTypes.node.isRequired,
};
export default DeleteGroupModal;
