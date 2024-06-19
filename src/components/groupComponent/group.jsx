import React from "react";
import styles from "./group.module.css";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const Group = (props) => {
  const { employees } = useSelector((store) => store.userRoot);
  const { employee, handleInputChange, index } = props;
  const isDisabled = employee?.userId?._id === employees[0]?.userId?._id;

  // Render the Group component
  return (
    <tr className={styles.share_table_details}>
      <td className={styles.user_action_input}>
        <input
          value={employee.userId._id}
          onChange={handleInputChange}
          disabled={isDisabled}
          type="checkbox"
          id={index + "hgvg"}
        />
      </td>
      <td className={styles.group_owner_td}>{employee.userId?.username}</td>
      <td className={styles.group_date_td}>{employee.userId?.email}</td>
      <td className={styles.group_size_td}>{employee.roleId?.name}</td>
    </tr>
  );
};

Group.propTypes = {
  employee: PropTypes.shape({
    userId: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string,
      email: PropTypes.string,
    }),
    roleId: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Group;
