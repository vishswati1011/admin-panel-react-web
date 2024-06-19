import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees } from "../../redux/action/userAction";
import updateUserActivity from '../../utils/UserActivity';
import AddEmployee from "../../components/userComponent/addEmployee";
import Employee from "../../components/userComponent/employee";
import styles from "../../components/userComponent/employee.module.css";
import { PiGridNineLight, PiListBulletsLight } from "react-icons/pi";
import EmployeeDataCard from "../../components/userComponent/employeeDataCard";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import { useCallback } from "react";
import Loading from "../../components/commonFile/loading";
const Employees = () => {
  const { employees, searchQuery } = useSelector((store) => store.userRoot);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortValue, setSortValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState(true);
  const [hasMatchingResults, setHasMatchingResults] = useState(true); // New state for search state
  const [filteredData, setFilteredData] = useState(employees);
  useEffect(() => {
    setLoading(true);
    // Dispatch action to fetch employees when component mounts or when dependencies change
    dispatch(getEmployees()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);
  useEffect(() => {
    setFilteredData(employees);
  }, [employees]);
  useEffect(() => {
    localStorage.setItem('log', new Date());
    setTimeout(() => {
			updateUserActivity("drive-employee");
		}, 5000);
  }, [])
  const handleLayout = useCallback((value) => {
    setLayout(value);
  }, []);
  // For Sorting Data in asc and desc order with date and alpha
  const handleSort = useCallback(
    (value) => {
      setSortValue(value);
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
      let sortedData = [];
      if (value === "name") {
        sortedData = [...employees].sort((a, b) => {
          const compareResult = a?.userId?.username.localeCompare(
            b?.userId?.username,
          );
          return newSortOrder === "asc" ? compareResult : -compareResult;
        });
      } else if (value === "date") {
        sortedData = [...employees].sort((a, b) => {
          const dateA = new Date(a?.userId?.createdAt);
          const dateB = new Date(b?.userId?.createdAt);

          // Compare the dates for sorting
          return newSortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
      }
      setFilteredData(sortedData);
    },
    [sortOrder, employees],
  );
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);
  const handleSearch = useCallback(() => {
    if (searchQuery === "") {
      setFilteredData(employees);
      setHasMatchingResults(true);
    } else {
      const filteredResults = employees.filter((item) => {
        const lowerSearchQuery = searchQuery.toLowerCase();
        return (
          (item?.userId?.username &&
            item?.userId?.username.toLowerCase().includes(lowerSearchQuery)) ||
          (item?.roleId?.name &&
            item?.roleId?.name.toLowerCase().includes(lowerSearchQuery)) ||
          (item?.userId?.email &&
            item?.userId?.email.toLowerCase().includes(lowerSearchQuery)) ||
          (item?.userId?.createdAt &&
            item?.userId?.createdAt.toLowerCase().includes(lowerSearchQuery))
        );
      });
      setFilteredData(filteredResults);
      setHasMatchingResults(filteredResults.length > 0);
    }
  }, [employees, searchQuery]);
  //Function to show modal
  const setShowState = useCallback(() => {
    setShow(true);
  }, [setShow]);

  return (
    <>
      <AddEmployee show={show} setShow={setShow} />
      <div className={styles.employees}>
        <div className={styles.employees_header}>
          <div className={styles.employees_header_left}>Users</div>
          <div className={styles.employees_header_right}>
            <div className={styles.layout_icons}>
              {layout ? (
                <>
                  <span className={styles.tooltip_text}>Grid</span>
                  <PiGridNineLight
                    size={20}
                    onClick={handleLayout.bind(this, false)}
                  />
                </>
              ) : (
                <>
                  <span className={styles.tooltip_text}>List</span>
                  <PiListBulletsLight
                    size={20}
                    onClick={handleLayout.bind(this, true)}
                  />
                </>
              )}
            </div>
            <div
              onClick={setShowState}
              className={styles.employees_add_employee}
            >
              + Add User
            </div>
          </div>
        </div>

        {layout === true ? (
          <div className={styles.employees_body}>
            <div className={styles.employees_table_header}>
              <p className={styles.employees_table_header_user}>
                User&nbsp;
                <ArrowUpwardOutlinedIcon
                  className={styles.menu_icon}
                  style={{
                    transform:
                      sortValue === "name" && sortOrder === "desc"
                        ? "rotate(180deg)"
                        : "none",
                  }}
                  onClick={handleSort.bind(this, "name")}
                />
              </p>
              <p className={styles.employees_table_header_email}>Email</p>
              <p className={styles.employees_table_header_role}>Role</p>
              <p className={styles.employees_table_header_joining}>
                Joining&nbsp;
                <ArrowUpwardOutlinedIcon
                  className={styles.menu_icon}
                  style={{
                    transform:
                      sortValue === "date" && sortOrder === "desc"
                        ? "rotate(180deg)"
                        : "none",
                  }}
                  onClick={handleSort.bind(this, "date")}
                />
              </p>
              <p>&nbsp;</p>
            </div>
            <div>
              {loading ? (
                <Loading />
              ) : (
                <div className={styles.table_div}>
                  {hasMatchingResults ? (
                    filteredData?.length !== 0 ? (
                      <>
                        {filteredData?.map((employee, index) => (
                          <Employee
                            employee={employee}
                            key={employee?.userId?._id}
                            index={index}
                          />
                        ))}
                      </>
                    ) : (
                      !loading && (
                        <div className={styles.employee_no_user}>
                          <p>No users to show! Please add some.</p>
                        </div>
                      )
                    )
                  ) : (
                    <p className={styles.data_empty_message}>
                      No matching user found.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.employees_body}>
            {hasMatchingResults ? (
              filteredData?.length !== 0 ? (
                <div className={styles.employee_card_container}>
                  {filteredData?.map((employee) => (
                    <EmployeeDataCard
                      employee={employee}
                      key={employee?.userId?._id}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.employee_no_user}>
                  <p>No users to show! Please add some.</p>
                </div>
              )
            ) : (
              <p className={styles.data_empty_message}>
                No matching user found.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Employees;
