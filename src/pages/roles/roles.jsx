import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import Modal from "@mui/material/Modal";
import updateUserActivity from '../../utils/UserActivity';
import { createRole, getRoles } from "../../redux/action/userAction";
import Role from "../../components/roleComponent/role";
import styles from "../../components/roleComponent/role.module.css";
import { useAlert } from "react-alert";
import Loading from "../../components/commonFile/loading";
import { Box } from "@mui/material";
import { ModalStyle } from "../../utils/modalStyle";
const Roles = () => {
  // Redux state and dispatch
  const userData = useSelector((store) => store.userRoot);
  const { user, roles, searchQuery } = userData;
  const dispatch = useDispatch();
  const alert = useAlert();

  // State variables
  const [role, setRole] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasMatchingResults, setHasMatchingResults] = useState(true); // New state for search state
  const [filteredData, setFilteredData] = useState(roles);
  const [checkfield, setCheckfield] = useState("");

  // Fetch roles on component mount
  useEffect(() => {
    setLoading(true);
    localStorage.setItem('log', new Date());
    setTimeout(() => {
			updateUserActivity("drive-roles");
		}, 5000);
    dispatch(getRoles()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);
  useEffect(() => {
    setFilteredData(roles);
  }, [roles]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);
  const handleSearch = useCallback(() => {
    if (searchQuery === "") {
      setFilteredData(roles);
      setHasMatchingResults(true);
    } else {
      const filteredResults = roles.filter((item) => {
        const lowerSearchQuery = searchQuery.toLowerCase();
        return (
          item?.name && item?.name.toLowerCase().includes(lowerSearchQuery)
        );
      });
      setFilteredData(filteredResults);
      setHasMatchingResults(filteredResults.length > 0);
    }
  }, [roles, searchQuery]);

  const checkinput = useCallback(() => {
    if (role) {
      setCheckfield("");
    }
  }, [role]);

  // Form submconsoleission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!role) {
        setCheckfield("Please Fill RoleName field");
        return;
      }

      dispatch(
        createRole(
          {
            organizationId:
              (user && user[0]?.organizationId?._id) ||
              user?.organizationId?._id,
            name: role,
          },
          (data, type) => alert.show(data, { type: type }),
        ),
      );
      setRole("");
      setShow(false);
    },
    [role, dispatch, alert],
  );

  return (
    <>
      {/* Add Role Modal */}
      <Modal
        open={show}
        onClose={() => setShow(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <h2>Add Role</h2>
          <Form onSubmit={handleSubmit} className={styles.form_role}>
            <input
              className={styles.add_role_input}
              placeholder="Enter Role Name"
              maxLength={30}
              onKeyDown={checkinput}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              type="text"
              style={{
                color: "black",
                border: "1px solid gray",
                borderRadius: "5px",
              }}
            />
            {checkfield && (
              <p className="text-danger">Please Enter Role Title</p>
            )}

            <div className={styles.button_container}>
              <button type="submit" className={styles.save_button}>
                Save
              </button>
              <button
                type="button"
                className={styles.cancel_button}
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Box>
      </Modal>

      {/* Roles Component */}
      <div className={styles.roles}>
        {/* Roles Header */}
        <div className={styles.roles_header}>
          <p className={styles.roles_header_text}>Roles</p>

          {/* Add Role Button */}
          <div onClick={setShow.bind(true)} className={styles.roles_add_role}>
            + Add Role
          </div>
        </div>

        {/* Roles Body */}
        <div className={styles.main_div_of_data}>
          {loading ? (
            <div className={styles.main_div_of_loader}>
              <Loading />
            </div>
          ) : (
            <div className={styles.roles_body}>
              {hasMatchingResults ? (
                roles.length !== 0 ? (
                  filteredData.map((rol, index) => (
                    <Role key={rol._id} role={rol} user={user} index={index} />
                  ))
                ) : (
                  !loading && <p>No roles found. Please add some.</p>
                )
              ) : (
                <p className={styles.data_empty_message}>
                  No matching roles found.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Roles;
