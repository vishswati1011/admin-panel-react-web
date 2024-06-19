import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { editEmployee } from "../../redux/action/userAction";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./addEmployee.module.css";
import { useAlert } from "react-alert";
import PropTypes from "prop-types"; // Import PropTypes
import { ModalStyle } from "../../utils/modalStyle";

function EditEmployeeModal({ employee, show, setShowEditModal, allRoles }) {
  const dispatch = useDispatch();
  const [editedName, setEditedName] = useState(employee?.userId?.username);
  const [editedRole, setEditedRole] = useState(employee?.roleId?._id || "");

  const alert = useAlert();

  // Function to handle form submission
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else {
        // Dispatch action to edit employee
        dispatch(
          editEmployee(
            { name: editedName, roleId: editedRole },
            employee?.userId?._id,
            (data) => {
              alert.success(data);
            },
          ),
        );
        setShowEditModal(false);
      }
    },
    [
      dispatch,
      editedName,
      editedRole,
      employee?.userId?._id,
      setShowEditModal,
      alert,
    ],
  );

  // Function to handle onHide event of the modal
  const onHideFunctions = useCallback(() => {
    setShowEditModal(false);
  }, [setShowEditModal]);

  return (
    <>
      <Modal
        open={show}
        onClose={onHideFunctions}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <h2>Edit User</h2>
          <form className={styles.form_head_section} onSubmit={handleSubmit}>
            {/* First name input */}
            <input
              type="text"
              required
              placeholder="First name"
              className={styles.add_employee_input}
              onChange={(e) => setEditedName(e.target.value)}
              value={editedName}
            />

            {/* Role selection dropdown */}
            <select
              required
              style={{ marginTop: "20px" }}
              placeholder="Role"
              id={employee?.roleId?.name}
              className={styles.add_employee_input}
              onChange={(e) => setEditedRole(e.target.value)}
              value={editedRole || employee?.roleId?.name} // Set the value to the selected role ID
            >
              {allRoles?.map((allrole, index) => (
                <option
                  key={index}
                  value={allrole?._id}
                  className={styles.add_employee_input}
                  id={index}
                >
                  {allrole?.name}
                </option>
              ))}
            </select>
            <div className={styles.button_container}>
              <button type="submit" className={styles.save_button}>
                Save
              </button>
              <button
                type="button"
                className={styles.cancel_button}
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
// Define PropTypes for the expected props
EditEmployeeModal.propTypes = {
  employee: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  setShowEditModal: PropTypes.func.isRequired,
  allRoles: PropTypes.array.isRequired,
};
export default EditEmployeeModal;
