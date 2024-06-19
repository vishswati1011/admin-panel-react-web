import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees, createGroup } from "../../redux/action/userAction";
import Group from "./group";
import styles from "./addGroupModal.module.css";
import { useAlert } from "react-alert";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../commonFile/loading";

function EditGroupModal() {
  const userData = useSelector((store) => store.userRoot);
  const { employees } = userData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [checkedValue, setCheckedValue] = useState([]);
  const [checkfield, setCheckfield] = useState("");
  const [loading, setLoading] = useState(true);
  const alert = useAlert();

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setCheckedValue((prevCheckedValue) => {
      if (e.target.checked) {
        return [...prevCheckedValue, value];
      } else {
        return prevCheckedValue.filter((val) => val !== value);
      }
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(getEmployees()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const validateGroupName = useCallback((groupName) => {
    const regex = /^[a-zA-Z ]*$/;
    return regex.test(groupName);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!groupName) {
        setCheckfield("Please enter Group Name");
        return;
      }
      const updatedCheckedValue = checkedValue.includes(
        employees[0]?.userId?._id,
      )
        ? checkedValue
        : [...checkedValue, employees[0]?.userId?._id];
      dispatch(
        createGroup({ users: updatedCheckedValue, groupName }, (data) =>
          alert.success(data),
        ),
      );
      navigate("/groups");
      setGroupName("");
      setCheckedValue([]);
    },
    [groupName, checkedValue, employees[0]?.userId?._id, dispatch, alert],
  );
  const renderEmployees = () => {
    if (employees.length === 0) {
      return <p>No Employee Found. Please add some.</p>;
    }

    return employees.map((emp, index) => (
      <Group
        style={{ marginTop: "20px" }}
        isAddGroup={true}
        key={emp?.userId?._id}
        index={index + 1}
        handleInputChange={handleInputChange}
        employee={emp}
        checkedValue={checkedValue}
        employees={employees} // Pass the employees data as a prop
      />
    ));
  };

  return (
    <div className={styles.add_group_div}>
      <form onSubmit={handleSubmit}>
        <div className={styles.edit_group_body}>
          <div className={styles.edit_group_title}>Add Group</div>
          <input
            className={styles.edit_group_input}
            placeholder="Enter Group Name"
            maxLength={30}
            required
            onKeyUp={(e) => validateGroupName(e.target.value)}
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            type="text"
          />

          {checkfield && <p style={{ color: "red" }}>{checkfield}</p>}
        </div>
        <table className={styles.group_table}>
          {/* Table Head */}
          <thead>
            <tr className={styles.group_table_head}>
              <th className="">Add</th>
              <th className={styles.group_owner_td}>User</th>
              <th className={styles.group_size_td}>Email</th>
              <th className={styles.group_date_td}>Role</th>
            </tr>
          </thead>
          {/* Table Body */}
          {loading ? (
            <Loading />
          ) : (
            <tbody className={styles.table_body}>{renderEmployees()}</tbody>
          )}
        </table>

        {!loading && (
          <div className={styles.add_and_back_button_div}>
            <Link to="/groups" className={styles.back_button}>
              <span>Back</span>
            </Link>
            <button type="submit" className={styles.edit_save_button}>
              Add Group
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default EditGroupModal;
