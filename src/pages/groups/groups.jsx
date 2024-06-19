import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getEmployees, getGroups } from "../../redux/action/userAction";
import GroupCollection from "../../components/groupComponent/groupCollection";
import styles from "../../components/groupComponent/groupCollection.module.css";
import Loading from "../../components/commonFile/loading";
import updateUserActivity from '../../utils/UserActivity';
const Groups = () => {
  const userData = useSelector((store) => store.userRoot);
  const { employees, groups, searchQuery } = userData;
  const dispatch = useDispatch();
  const [hasMatchingResults, setHasMatchingResults] = useState(true); // New state for search state
  const [filteredData, setFilteredData] = useState(groups);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    localStorage.setItem('log', new Date());
    setTimeout(() => {
			updateUserActivity("drive-group");
		}, 5000);
    dispatch(getEmployees());
    dispatch(getGroups()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);
  useEffect(() => {
    setFilteredData(groups);
  }, [groups]);
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);
  const handleSearch = useCallback(() => {
    if (searchQuery === "") {
      setFilteredData(groups);
      setHasMatchingResults(true);
    } else {
      const filteredResults = groups.filter((item) => {
        const lowerSearchQuery = searchQuery.toLowerCase();
        return (
          item?.groupName &&
          item?.groupName.toLowerCase().includes(lowerSearchQuery)
        );
      });
      setFilteredData(filteredResults);
      setHasMatchingResults(filteredResults.length > 0);
    }
  }, [groups, searchQuery]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={styles.groups}>
        <div className={styles.groups_header}>
          <p className={styles.groups_header_text}>Groups</p>
          <Link to="/add-group" className={styles.groups_add_group}>
            + Add Group
          </Link>
        </div>

        {loading ? (
          <div className={styles.main_div_of_card}>
            <Loading />
          </div>
        ) : (
          <div className={styles.groups_body}>
            {hasMatchingResults ? (
              groups?.length !== 0 ? (
                filteredData?.map((group, index) => (
                  <GroupCollection
                    group={group}
                    key={group?._id}
                    user={employees}
                    index={index}
                  />
                ))
              ) : (
                !loading && <p>No Groups to show, kindly add.</p>
              )
            ) : (
              <p className={styles.data_empty_message}>
                No matching groups found.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Groups;
