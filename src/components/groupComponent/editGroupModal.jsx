import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateGroup } from "../../redux/action/userAction";
import Group from "./group";
import { useCallback } from "react";
import styles from "./editGroupModal.module.css";
import { useAlert } from "react-alert";
import { useLocation, useNavigate, Link } from "react-router-dom";

const EditGroupModal = () => {
  const location = useLocation();
  const stateData = location.state || {};
  const { editableData, group, employees } = stateData;
  const [groupName, setGroupName] = useState(`${editableData?.groupName}`);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkedValue, setCheckedValue] = useState([group?.users[0]]);
  const alert = useAlert();

  // Function to handle checkbox change
  const handleInputChange = useCallback(
    (e) => {
      const tempCheck = checkedValue;
      let index;
      if (e.target.checked) {
        tempCheck.push(e.target.value);
      } else {
        index = tempCheck.indexOf(e.target.value);
        tempCheck.splice(index, 1);
      }
      setCheckedValue(tempCheck);
    },
    [setCheckedValue, checkedValue],
  );

  // Form submit handler
  const formHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        updateGroup(
          { groupName: groupName, users: checkedValue },
          editableData?._id,
          (data) => alert.success(data),
        ),
      );
      navigate("/groups");
      setCheckedValue([]);
    },
    [groupName, checkedValue, editableData?._id, alert, dispatch],
  );

  const max_char = 30;
  // Filter employees based on inclusion in group.users
  const filteredEmployees = employees.filter(
    (emp) => !group.users.includes(emp.userId._id),
  );

  return (
    <>
      <div className={styles.edit_group_title}>Edit Group</div>
      <form onSubmit={formHandler} className={styles.edit_group_body}>
        <input
          maxLength={max_char}
          type="text"
          placeholder="Group Name"
          className={styles.edit_group_input}
          onChange={(e) => setGroupName(e.target.value)}
          value={groupName}
        />

        <table className={styles.editgroup_table}>
          {/* Table Head */}
          <thead>
            <tr className={styles.edit_group_row}>
              <th className={styles.editgroup_input_td}>Add</th>
              <th className={styles.editgroup_owner_td}>User</th>
              <th className={styles.editgroup_owner_td}>Email</th>
              <th className={styles.editgroup_size_td}>Role</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className={styles.table_body}>
            {filteredEmployees?.length !== 0 ? (
              filteredEmployees?.map((emp, index) => {
                return (
                  <Group
                    isAddGroup={true}
                    key={emp.userId._id}
                    index={index + 1}
                    handleInputChange={handleInputChange}
                    employee={emp}
                  />
                );
              })
            ) : (
              <td className={styles.edit_section_message}>
                No Employee found. Please add some.
              </td>
            )}
          </tbody>
        </table>

        <div className={styles.add_and_back_button_div}>
          <Link to="/groups" className={styles.back_button}>
            <span>Back</span>
          </Link>
          <button type="submit" className={styles.edit_save_button}>
            Edit Group
          </button>
        </div>
      </form>
    </>
  );
};

export default EditGroupModal;
