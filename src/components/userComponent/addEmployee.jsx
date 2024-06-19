import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee, getRoles } from "../../redux/action/userAction";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import styles from "./addEmployee.module.css";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useAlert } from "react-alert";
import PropTypes from "prop-types"; // Import PropTypes
import { ModalStyle } from "../../utils/modalStyle";
import validator from "validator";
import Spinner from "react-bootstrap/Spinner";

const AddEmployee = ({ show, setShow }) => {
  // Retrieve data from Redux store
  const userData = useSelector((store) => store.userRoot);
  const dispatch = useDispatch();
  // State variables
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const alert = useAlert();

  const maxChar = 30;
  const handleInputChange = (e) => {
    const capitalizedValue = e.target.value
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    setName(capitalizedValue);
  };

  // Function to handle form submission
  const formHandler = useCallback(
    (e) => {
      e.preventDefault();

      // Validate form inputs
      if (!name) {
        alert.error("Please Enter Employee Name");
        return;
      }
      if (!email) {
        alert.error("Please Enter Employee Email");
        return;
      }
      if (!roleId) {
        alert.error("Please Select Employee Role");
        return;
      }
      if (!password) {
        alert.error("Please Enter Password");
        return;
      }
      if (password.length < 8) {
        alert.error("Your password must be at least 8 characters long!");
        return;
      }
      if (!validator.isEmail(email)) {
        alert.error("Please enter a valid email.");
        return;
      }
      setDisabled(true);
      setSpinner(true);
      // Dispatch action to add employee
      dispatch(
        addEmployee(
          {
            email,
            name,
            roleId,
            password,
          },
          (data, type) => {
            alert.show(data, { type: type });
          },
        ),
      )
        .then(() => {
          // Reset form fields and errors
          setSpinner(false);
          setShow(false);
          setEmail("");
          setName("");
          setRoleId("");
          setPassword("");
          setDisabled(false);
        })
        .catch((err) => {
          if (err) {
            setSpinner(false);
            setDisabled(true);
          }
        });
    },
    [email, name, roleId, password, setShow, dispatch, alert],
  );
  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);
  // Function to handle onHide event of the modal
  const onHideFunctions = useCallback(() => {
    // Reset form fields and errors
    setShow(false);
    setEmail("");
    setName("");
    setRoleId("");
    setPassword("");
  }, [setShow]);
  return (
    <>
      <Modal
        open={show}
        onClose={onHideFunctions}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <h2>Add User</h2>
          <form
            autoComplete="off"
            autoCorrect="off"
            onSubmit={formHandler}
            className={styles.form_head_section}
          >
            {/* Name input field */}
            <div className={styles.form_group}>
              <input
                placeholder="Name"
                maxLength={maxChar}
                onChange={handleInputChange}
                value={name}
                type="text"
                className={styles.add_employee_input}
                id="employeeFirstNameId"
                style={{
                  color: "black",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  textTransform: "capitalize",
                }}
              />
            </div>

            {/* Email input field */}
            <div className={styles.form_group}>
              <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                value={email}
                type="email"
                className={styles.add_employee_input}
                id="employeeEmailId"
                autoComplete="new-password"
                style={{
                  color: "black",
                  border: "1px solid gray",
                  borderRadius: "5px",
                }}
              />
            </div>

            {/* Role selection dropdown */}
            <div className={styles.form_group}>
              <select
                placeholder="Role"
                onChange={(e) => setRoleId(e.target.value)}
                id="#employeeRole"
                className={styles.add_employee_input}
                autoComplete="new-password"
                style={{
                  color: "black",
                  border: "1px solid gray",
                  borderRadius: "5px",
                }}
              >
                <option>Select Role</option>
                {userData?.roles?.map((role, index) => (
                  <option
                    value={role?._id}
                    key={index}
                    className={index + "hhb"}
                    id={index}
                  >
                    {role?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Password input field */}
            <div className={styles.form_group}>
              {password ? (
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
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                className={styles.add_employee_input}
                id="employeePasswordId"
                autoComplete="new-password"
                style={{
                  color: "black",
                  border: "1px solid gray",
                  borderRadius: "5px",
                }}
              />
            </div>

            <div className={styles.button_container}>
              <button
                type="submit"
                className={styles.save_button}
                disabled={disabled}
              >
                {spinner && <Spinner size="sm" />} Save
              </button>
              <button
                type="button"
                className={styles.cancel_button}
                onClick={onHideFunctions}
              >
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};
// Define PropTypes for the expected 'show' and 'setShow' props
AddEmployee.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};
export default AddEmployee;
