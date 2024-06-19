import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateRemoveUserFromGroup } from "../../redux/action/userAction";
import style from "./editGroupModal.module.css";
import Group from "./group";
import { useAlert } from "react-alert";
import { useNavigate, useLocation, Link } from "react-router-dom";

const ViewGroup = () => {
  const location = useLocation();
  const stateData = location.state || {};
  const { employees, group, user } = stateData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkedValue, setCheckedValue] = useState([]);
  const userIds = group.users.map((user) => user?._id);
  const alert = useAlert();

  // Callback to handle the update of the group
  const handleUpdate = useCallback(
    (e) => {
      e.preventDefault();
      if (checkedValue.includes(employees[0]?.userId?._id)) {
        const filteredCheckedValue = checkedValue.filter(
          (value) => value !== employees[0]?.userId?._id,
        );
        setCheckedValue(filteredCheckedValue);
      }
      dispatch(
        updateRemoveUserFromGroup({ users: checkedValue }, group._id, (data) =>
          alert.success(data),
        ),
      );
      navigate("/groups");
      setCheckedValue([]);
    },
    [checkedValue, dispatch, group._id, alert, user[0]?.userId?._id],
  );

  // Callback to handle the change event of the checkbox
  const handleInputChange = useCallback(
    (e) => {
      if (e.target.checked === true) {
        setCheckedValue([...checkedValue, e.target.value]);
      }
    },
    [checkedValue],
  );

  return (
    <div>
      <div className={style.edit_group_title}>Group View</div>
      <form onSubmit={handleUpdate} className={style.edit_group_body}>
        <table className={style.editgroup_table}>
          {/* Table Head */}
          <thead>
            <tr className={style.edit_group_row}>
              <th className={style.editgroup_input_td}>Remove</th>
              <th className={style.editgroup_owner_td}>User</th>
              <th className={style.editgroup_file_td}>Email</th>
              <th className={style.editgroup_date_td}>Role</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className={style.table_body}>
            {employees?.length !== 0 ? (
              employees?.map((emp, index) =>
                group.users.includes(emp.userId._id) ||
                userIds.includes(emp.userId._id) ? (
                  <Group
                    key={emp.userId._id}
                    userIds={userIds}
                    index={index + 1}
                    handleInputChange={handleInputChange}
                    employee={emp}
                    defaultChecked={index === 0}
                  />
                ) : null,
              )
            ) : (
              <tr className={style.edit_section_message}>
                <td colSpan="6">No Employee Found. Please add some.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className={style.add_and_back_button_div}>
          <Link to="/groups" className={style.back_button}>
            <span>Back</span>
          </Link>
          <button type="submit" className={style.edit_save_button}>
            Remove
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewGroup;
