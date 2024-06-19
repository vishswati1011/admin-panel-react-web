import React, { useEffect, useState } from "react";
import DashboardComponent from "./dashboardComponent";
import { useDispatch, useSelector } from "react-redux";
import updateUserActivity from '../../utils/UserActivity';
import { getCountWorkspace } from "../../redux/action/userAction";
import styles from "./dashboard.module.css";
const Dashboard = () => {
  const data = useSelector((state) => state.userRoot.dashboardData);

  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem('log', new Date());
    setTimeout(() => {
			updateUserActivity("drive-dashboard");
		}, 5000);
    dispatch(getCountWorkspace());
  }, []);
  const [selectedOption, setSelectedOption] = useState("My Dashboard");
  const options = ["My Dashboard", "Overall Dataset"];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // You can perform additional actions here based on the selected option
  };
  const dateObject = new Date(data?.lastActivityTime);

  // Format options (you can customize this based on your requirements)
  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  // Format the date using toLocaleString
  const formattedDate = dateObject.toLocaleString("en-US", option);
  return (
    <>
      <div className={styles.dropdown_container}>
        <button className={styles.dropbtn}>
          {selectedOption || "Select Option"}
        </button>
        <div className={styles.dropdown_content}>
          {options.map((option, index) => (
            <div key={index} onClick={() => handleOptionSelect(option)}>
              {option}
            </div>
          ))}
        </div>
        <div className={styles.lastactivity_date}>{formattedDate}</div>
      </div>
      {selectedOption === "My Dashboard" ? (
        <DashboardComponent data={data} selectedOption={selectedOption} />
      ) : (
        <DashboardComponent data={data} selectedOption={selectedOption} />
      )}
    </>
  );
};

export default Dashboard;
