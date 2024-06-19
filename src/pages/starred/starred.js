import React, { useState, useCallback, useEffect } from "react";
import styles from "./starred.module.css";
import { useSelector, useDispatch } from "react-redux";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getAllStars, updateStars } from "../../redux/action/userAction";
import { Menu } from "@mui/material";
import updateUserActivity from '../../utils/UserActivity';
import { useAlert } from "react-alert";
import { handleRoute } from "../../utils/getRoutes";
import { formatDate } from "../../utils/dateFormate";
import { imageByAppId } from "../../utils/imageUtils";
import { sortData } from "../../utils/sortingUtils";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import SearchFunction from "../../components/commonFile/searchFunction";
import Loading from "../../components/commonFile/loading";
import { PiGridNineLight, PiListBulletsLight } from "react-icons/pi";
import { splitUserName } from "../../utils/splitUserName";

const Starred = () => {
  const starData = useSelector((store) => store.userRoot.stars);
  const { searchQuery, starsFilterData } = useSelector(
    (store) => store.userRoot,
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const [hasMatchingResults, setHasMatchingResults] = useState(true); // New state for
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortValue, setSortValue] = useState("");
  const [layout, setLayout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [workspaceId, setWorkspaceId] = useState();
  const [workspaceAppId, setWorkspaceAppId] = useState();
  const [filteredData, setFilteredData] = useState(starsFilterData);

  useEffect(() => {
    setLoading(true);
    localStorage.setItem('log', new Date());
    setTimeout(() => {
			updateUserActivity("drive-starred");
		}, 5000);
    dispatch(getAllStars(page)).then(() => {
      setLoading(false);
    });
  }, [dispatch, page]);
  useEffect(() => {
    setFilteredData(starsFilterData);
  }, [starsFilterData]);
  useEffect(() => {
    setPage(1);
    dispatch({
      type: "RESET_STATE",
      payload: [],
    }); // Reset the filtered data array

    return () => {
      dispatch({
        type: "RESET_STATE",
        payload: [],
      }); // Reset the filtered data array
    };
  }, [dispatch]);

  useInfiniteScroll(loading, starData, () => {
    setPage((prev) => prev + 1);
    setLoading(true);
  });
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

  const handleLayout = useCallback((value) => {
    setLayout(value);
  }, []);

  const handleOpen = (event, appId, id) => {
    setAnchorEl(event.currentTarget);
    setWorkspaceAppId(appId);
    setWorkspaceId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeStar = useCallback(
    (appId, Id) => {
      dispatch(
        updateStars(appId, Id, false, (data) => {
          alert.success(data);
        }),
      );
      setAnchorEl(null);
    },
    [dispatch, alert],
  );

  return (
    <section className={styles.starred_home}>
      <SearchFunction
        setHasMatchingResults={setHasMatchingResults}
        searchQuery={searchQuery}
        setFilteredData={setFilteredData}
        FilterData={starsFilterData}
      />
      <div className={styles.starred_section_name}>
        <h2 className={styles.starred_name}>Star</h2>
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
      <div className={styles.starred_section}>
        {layout === true ? (
          <table className={styles.starred_table}>
            <thead>
              <tr className={styles.starred_table_head}>
                <th className={styles.starred_file_td}>
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
                <th className={styles.starred_owner_td}>Owner</th>
                <th className={styles.starred_size_td}>
                  Starred Date &nbsp;
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
                {/* <th className={styles.starred_date_td}>Updated date</th> */}
                <th className=""> </th>
              </tr>
            </thead>
            <tbody>
              {hasMatchingResults ? (
                filteredData.length !== 0 ? (
                  filteredData?.map((data, index) => (
                    <tr
                      className={styles.starred_table_details}
                      key={data?._id}
                      id={index}
                    >
                      <td
                        className={styles.starred_file_td}
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
                      <td className={styles.starred_owner_td}>
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
                      <td className={styles.starred_size_td}>
                        <span className={styles.username}>
                          {formatDate(data?.updateAt)}
                        </span>
                      </td>

                      <td
                        className={styles.starred_owner_menu}
                        id={index + "jhvg"}
                      >
                        <MoreVertIcon
                          className={styles.menu_icon}
                          onClick={(e) => handleOpen(e, data?.appId, data?._id)}
                        />
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                            },
                          }}
                        >
                          <div
                            className={styles.api_button}
                            onClick={removeStar.bind(
                              this,
                              workspaceAppId,
                              workspaceId,
                            )}
                            id={index + "workspaceId"}
                          >
                            Remove Star
                          </div>
                        </Menu>
                      </td>
                    </tr>
                  ))
                ) : (
                  !loading && (
                    <p className={styles.data_empty_message} colSpan="5">
                      There is nothing in Star, please select your star from My
                      Drive
                    </p>
                  )
                )
              ) : (
                <p className={styles.data_empty_message}>
                  No matching workspaces found.
                </p>
              )}
              {loading && <Loading />}
            </tbody>
          </table>
        ) : (
          <div className={styles.starred_card_container}>
            {hasMatchingResults ? (
              filteredData?.length !== 0 ? (
                filteredData?.map((card, index) => (
                  <div
                    className={styles.starred_card}
                    key={card?._id}
                    id={index}
                  >
                    <div
                      className={styles.starred_card_sub_container}
                      onClick={handleRoute.bind(this, card)}
                      title="Click here to see Workspace"
                    >
                      <img
                        src={imageByAppId[card?.appId]}
                        alt={`${card?.appId}`}
                        className={styles.starred_card_image}
                      />
                      <p
                        className={styles.starred_card_text}
                        style={{ cursor: "pointer" }}
                      >
                        {card?.name?.substring(0, 15)}
                      </p>
                    </div>

                    <div
                      className="btn-outline"
                      id={index + "jugccy"}
                      onClick={(e) => handleOpen(e, card?.appId, card?._id)}
                    >
                      <MoreVertIcon className={styles.menu_icon} />
                    </div>

                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                        },
                      }}
                    >
                      <div
                        className={styles.api_button}
                        onClick={removeStar.bind(
                          this,
                          workspaceAppId,
                          workspaceId,
                        )}
                        id={index + "hjvuv"}
                      >
                        Remove Star
                      </div>
                    </Menu>
                  </div>
                ))
              ) : (
                !loading && (
                  <p className={styles.data_empty_message}>
                    There is nothing Starred. Please select your star item from
                    My Drive!
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
  );
};

export default Starred;
