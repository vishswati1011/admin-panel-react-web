import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import styles from "./passwordreset.module.css";
import { resetPassword } from "../../redux/action/userAction";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useAlert } from "react-alert";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import PropTypes from "prop-types"; // Import PropTypes
import { Box } from "@mui/material";
import { ModalStyle } from "../../utils/modalStyle";

const PasswordResetPopup = ({ show, setShow }) => {
  const dispatch = useDispatch();
  // State variables
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const maxChar = 30;
  const alert = useAlert();

  // Function to reset form errors
  const checkInput = useCallback(() => {
    setFormErrors({});
  }, []);

  // Function to handle form submission
  const formHandler = useCallback(
    (e) => {
      e.preventDefault();
      const errors = {};

      // Validate form inputs
      if (!oldPassword) {
        errors.oldPassword = "Please Enter Employee Old Password";
      }

      if (!newPassword) {
        errors.newPassword = "Please Enter Employee New Password";
      }

      if (!confirmPassword) {
        errors.confirmPassword = "Please Enter Confirm Password";
      } else if (newPassword !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      if (newPassword.length < 8) {
        alert.error("Your password must be at least 8 characters long!");
        return;
      }
      if (confirmPassword.length < 8) {
        alert.error("Your confirmPassword must be at least 8 characters long!");
        return;
      }
      if (Object.keys(errors).length > 0) {
        // Set form errors if any
        setFormErrors(errors);
        return;
      }

      // Dispatch action to reset password
      dispatch(
        resetPassword(
          {
            newPassword,
            oldPassword,
            confirmPassword,
          },
          (data, type) => alert.show(data, { type: type }),
        ),
      );

      // Reset form fields and errors
      setShow(false);
      setNewPassword("");
      setOldPassword("");
      setConfirmPassword("");
      setFormErrors({});
    },
    [newPassword, oldPassword, confirmPassword, alert, setShow, dispatch],
  );

  // Function to handle onHide event of the modal
  const onHideFunctions = useCallback(() => {
    // Reset form fields and errors
    setShow(false);
    setNewPassword("");
    setOldPassword("");
    setConfirmPassword("");
    setFormErrors({});
  }, [setShow]);

  // ... (Rest of the component)

  return (
    <>
      <Modal
        open={show}
        onClose={onHideFunctions}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <div className={styles.modal_headers}>
            <h2>Reset Password</h2>
            <ClearOutlinedIcon
              className={styles.cancel_icon}
              onClick={onHideFunctions}
            />
          </div>
          <form
            autoComplete="off"
            autoCorrect="off"
            onSubmit={formHandler}
            className={styles.form_head_section}
          >
            {/* oldPassword input field */}
            <div className={styles.form_group}>
              {oldPassword ? (
                <i
                  className={styles.password_visibility}
                  onClick={setShowPassword.bind(this, !showPassword)}
                >
                  {showPassword ? (
                    <MdOutlineVisibility />
                  ) : (
                    <MdOutlineVisibilityOff />
                  )}
                </i>
              ) : (
                ""
              )}
              <input
                placeholder="Old Password"
                maxLength={maxChar}
                onKeyDown={checkInput}
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
                type={showPassword ? "text" : "password"}
                className={styles.add_password_input}
                id="employeeFirstoldPasswordId"
                autoComplete="current-password"
                style={{ color: "black" }}
                required
              />
              {formErrors?.oldPassword && (
                <p className="text-danger">{formErrors?.oldPassword}</p>
              )}
            </div>

            {/* newPassword input field */}
            <div className={styles.form_group}>
              {newPassword ? (
                <i
                  className={styles.password_visibility}
                  onClick={setShowNewPassword.bind(this, !showNewPassword)}
                >
                  {showNewPassword ? (
                    <MdOutlineVisibility />
                  ) : (
                    <MdOutlineVisibilityOff />
                  )}
                </i>
              ) : (
                ""
              )}
              <input
                placeholder="New Password"
                onKeyDown={checkInput}
                onChange={(e) => setNewPassword(e.target.value.toLowerCase())}
                value={newPassword}
                type={showNewPassword ? "text" : "password"}
                className={styles.add_password_input}
                id="employeenewPasswordId"
                autoComplete="new-password"
                required
              />
              {formErrors?.newPassword && (
                <p className="text-danger">{formErrors?.newPassword}</p>
              )}
            </div>

            {/* Confirm Password input field */}
            <div className={styles.form_group}>
              {confirmPassword ? (
                <i
                  className={styles.password_visibility}
                  onClick={setShowConfirmPassword.bind(
                    this,
                    !showConfirmPassword,
                  )}
                >
                  {showConfirmPassword ? (
                    <MdOutlineVisibility />
                  ) : (
                    <MdOutlineVisibilityOff />
                  )}
                </i>
              ) : (
                ""
              )}
              <input
                placeholder="Confirm Password"
                onKeyDown={checkInput}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                className={styles.add_password_input}
                id="employeePasswordId"
                autoComplete="new-password"
                required
              />
              {formErrors?.confirmPassword && (
                <p className="text-danger">{formErrors?.confirmPassword}</p>
              )}
            </div>

            <div className={styles.button_container}>
              <button type="submit" className={styles.save_button}>
                Confirm
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};
// Add PropTypes validation
PasswordResetPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default PasswordResetPopup;
