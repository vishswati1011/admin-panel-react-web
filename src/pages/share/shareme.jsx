import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "./shareme.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  makeWorkspaceCopy,
  shareWithMe,
  tempDeleteWorkspace,
} from "../../redux/action/userAction";
import { formatDate } from "../../utils/dateFormate";
import { imageByAppId } from "../../utils/imageUtils";
import { sortData } from "../../utils/sortingUtils";
import { handleRoute } from "../../utils/getRoutes";
import SearchFunction from "../../components/commonFile/searchFunction";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import Loading from "../../components/commonFile/loading";
import { Menu, IconButton } from "@mui/material";
import { PiGridNineLight, PiListBulletsLight } from "react-icons/pi";
import { useAlert } from "react-alert";
import { splitUserName } from "../../utils/splitUserName";
import updateUserActivity from '../../utils/UserActivity';
const Shareme = () => {
  const sharedData = useSelector((store) => store.userRoot.shares);
  const { searchQuery, sharesFilterData } = useSelector(
    (store) => store.userRoot,
  );
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortValue, setSortValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [appId, setAppId] = useState();
  const [hasMatchingResults, setHasMatchingResults] = useState(true); // New state for search state
  const [workspaceId, setWorkspaceId] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [layout, setLayout] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [filteredData, setFilteredData] = useState(sharesFilterData);
  useEffect(() => {
    setLoading(true);
    localStorage.setItem('log', new Date());
    setTimeout(() => {
			updateUserActivity("drive-shareme");
		}, 5000);
    dispatch(shareWithMe(page)).then(() => {
      setLoading(false);
    }); // Fetch more data for the current page
  }, [dispatch, page]);
  useEffect(() => {
    setFilteredData(sharesFilterData);
  }, [sharesFilterData]);
  useEffect(() => {
    setPage(1);
    dispatch({
      type: "RESET_STATE_SHARE_WITH_ME",
      payload: [],
    });
    return () => {
      dispatch({
        type: "RESET_STATE_SHARE_WITH_ME",
        payload: [],
      });
    };
  }, []);

  useInfiniteScroll(loading, sharedData, () => {
    setPage((prev) => prev + 1);
    setLoading(true);
  });

  // to Route a workspace using ID

  // For Sorting Data in asc and desc order
  const handleSort = useCallback(
    (value) => {
      setSortValue(value);
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
      const sortedData = sortData(filteredData, newSortOrder, value);
      setFilteredData(sortedData);
    },
    [sortOrder, filteredData],
  );
  const handleMakeCopy = useCallback(
    (Id, appId) => {
      dispatch(
        makeWorkspaceCopy({ workspaceId: Id, appId: appId }, (data) => {
          alert.success(data);
        }),
      );
      setAnchorEl(null);
    },
    [dispatch, alert],
  );
  const handleDelete = useCallback(
    (Id, appId) => {
      dispatch(
        tempDeleteWorkspace(appId, Id, (data) => {
          alert.success(data);
        }),
      );
      setAnchorEl(null);
    },
    [dispatch, alert, page],
  );
  //to handle layout data for grid and list
  const handleLayout = useCallback((value) => {
    setLayout(value);
  }, []);

  const handleOpen = useCallback((event, card) => {
    setAnchorEl(event.currentTarget);
    setWorkspaceId(card._id);
    setAppId(card.appId);
  }, []);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <SearchFunction
        setHasMatchingResults={setHasMatchingResults}
        searchQuery={searchQuery}
        setFilteredData={setFilteredData}
        FilterData={sharesFilterData}
      />
      <div className={styles.my_drive_header}>
        <h2 className={styles.main_my_drive}>Shared With Me</h2>
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
      </div>

      <section className={styles.share_home}>
        <div className={styles.share_section}>
          {layout === true ? (
            <table className={styles.share_table}>
              <thead>
                <tr className={styles.share_table_head}>
                  <th className={styles.share_file_td}>
                    Workspace &nbsp;
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
                  </th>
                  <th className={styles.share_owner_td}>Owner</th>
                  <th className={styles.share_size_td}>
                    Created Date&nbsp;
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
                  </th>
                  {/* <th className={styles.share_date_td}>Updated date</th> */}
                  <th className=""> </th>
                </tr>
              </thead>
              <tbody>
                {hasMatchingResults ? (
                  filteredData?.length !== 0 ? (
                    filteredData?.map((data, index) => (
                      <tr
                        className={styles.share_table_details}
                        key={data?._id}
                        id={index}
                      >
                        <td
                          className={styles.share_file_td}
                          onClick={handleRoute.bind(this, data)}
                          title="Click here to see Workspace"
                        >
                          <img
                            src={imageByAppId[data?.appId]}
                            alt={`${data?.appId}`}
                            className={styles.user_image_icons}
                          />
                          <span className={styles.workspace_name_text}>
                            &nbsp;&nbsp;{data?.name}
                          </span>
                        </td>
                        <td className={styles.share_owner_td}>
                          {data?.image ? (
                            <img
                              src={data?.image}
                              alt="Profile"
                              className={styles.user_image_icons}
                            />
                          ) : (
                            <p
                              className={styles.user_image_icons}
                              style={{ color: "#ced4da", fontWeight: "700" }}
                            >
                              {splitUserName(data?.username)}
                            </p>
                          )}
                          <span
                            className={styles.username}
                            title={data?.username}
                          >
                            {data?.username}
                          </span>
                        </td>
                        <td className={styles.share_date_td}>
                          <span className={styles.username}>
                            {formatDate(data.createdAt)}
                          </span>
                        </td>

                        <td
                          className={styles.share_owner_menu}
                          id={index + "hbhv"}
                        >
                          <MoreVertIcon
                            className={styles.menu_icon}
                            onClick={(e) => handleOpen(e, data)}
                          />
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <div
                              className={styles.api_button}
                              onClick={handleMakeCopy.bind(
                                this,
                                workspaceId,
                                appId,
                              )}
                              id={index + "hguc"}
                            >
                              Make a Copy
                            </div>
                            <div
                              className={styles.api_button}
                              onClick={handleDelete.bind(
                                this,
                                workspaceId,
                                appId,
                              )}
                              id={index + "-" + "workspaceId"}
                            >
                              Delete
                            </div>
                          </Menu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    !loading && (
                      <p className={styles.data_empty_message}>
                        There is nothing in Shere With Me
                      </p>
                    )
                  )
                ) : (
                  <p className={styles.data_empty_message}>
                    No matching workspaces found.
                  </p>
                )}
              </tbody>
            </table>
          ) : (
            <div className={styles.share_card_container}>
              {hasMatchingResults ? (
                filteredData.length !== 0 ? (
                  filteredData?.map((card, index) => (
                    <div
                      className={styles.share_card}
                      key={card?._id}
                      id={index}
                    >
                      <div
                        className={styles.share_card_sub_container}
                        onClick={handleRoute.bind(this, card)}
                        title="Click here to see Workspace"
                      >
                        <img
                          src={imageByAppId[card.appId]}
                          alt={`${card.appId}`}
                          className={styles.share_card_image}
                        />
                        <p
                          className={styles.share_card_text}
                          style={{ cursor: "pointer" }}
                        >
                          {card.name?.substring(0, 15)}
                        </p>
                      </div>

                      <IconButton
                        className="btn-outline"
                        onClick={(e) => handleOpen(e, card)}
                        id={index + "jbh"}
                      >
                        <svg
                          width="3"
                          height="12"
                          viewBox="0 0 3 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="1.5" cy="1.5" r="1.5" fill="#444444" />
                          <circle cx="1.5" cy="6" r="1.5" fill="#444444" />
                          <circle cx="1.5" cy="10.5" r="1.5" fill="#444444" />
                        </svg>
                      </IconButton>

                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <div
                          className={styles.api_button}
                          onClick={handleMakeCopy.bind(
                            this,
                            workspaceId,
                            appId,
                          )}
                          id={index + "jbhb"}
                        >
                          Make a Copy
                        </div>
                        <div
                          className={styles.api_button}
                          onClick={handleDelete.bind(this, workspaceId, appId)}
                          id={index + "-" + "ppId"}
                        >
                          Delete
                        </div>
                      </Menu>
                    </div>
                  ))
                ) : (
                  !loading && (
                    <p className={styles.data_empty_message}>
                      There is nothing in Share With Me.
                    </p>
                  )
                )
              ) : (
                <p className={styles.data_empty_message}>
                  No matching workspaces found.
                </p>
              )}

              {loading && <Loading />}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Shareme;
