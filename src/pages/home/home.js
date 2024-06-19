import React, { useState, useEffect, useCallback } from "react";
import styles from "./home.module.css";
import ClassNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu } from "@mui/material";
import updateUserActivity from '../../utils/UserActivity';
import { useAlert } from "react-alert";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Loading from "../../components/commonFile/loading";
import { PiGridNineLight, PiListBulletsLight } from "react-icons/pi";
import {
  getAllWorkspace,
  updateStars,
  tempDeleteWorkspace,
} from "../../redux/action/userAction";
import Metatag from "../../components/commonFile/metatag";
import SearchFunction from "../../components/commonFile/searchFunction";
import { formatDate } from "../../utils/dateFormate";
import { imageByAppId } from "../../utils/imageUtils";
import { handleRoute } from "../../utils/getRoutes";
import { sortData } from "../../utils/sortingUtils";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import { splitUserName } from "../../utils/splitUserName";

const Workspace = () => {
  const workspace = useSelector((store) => store.userRoot.workspaces);
  const { searchQuery, workspacesFilterData } = useSelector(
    (store) => store.userRoot,
  );
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortValue, setSortValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [filteredData, setFilteredData] = useState(workspacesFilterData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [workspaceId, setWorkspaceId] = useState();
  const [workspaceAppId, setWorkspaceAppId] = useState();
  const [layout, setLayout] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [productappId, setProductappId] = useState(0);
  const [hasMatchingResults, setHasMatchingResults] = useState(true);
  const alert = useAlert();

  useEffect(() => {
    setLoading(true);
    dispatch(getAllWorkspace(page)).then(() => {
      setLoading(false);
    });
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(workspacesFilterData);
  }, [workspace, workspacesFilterData]);

  useEffect(() => {
    setPage(1);
    localStorage.setItem('log', new Date());
    setTimeout(() => {
			updateUserActivity("drive-home");
		}, 5000);
    handleFilter(0);
    dispatch({
      type: "RESET_STATE_WORKSPACE",
      payload: [],
    });
    return () => {
      dispatch({
        type: "RESET_STATE_WORKSPACE",
        payload: [],
      });
    };
  }, []);

  useInfiniteScroll(loading, workspace, () => {
    setPage((prev) => prev + 1);
    setLoading(true);
  });

  useEffect(() => {
    handleFilter(productappId);
  }, [productappId]);

  const handleFilter = useCallback(
    (product) => {
      setSelectedProduct(product);
      if (product === 0) {
        setFilteredData(workspacesFilterData);
      } else {
        const filtered = workspacesFilterData.filter(
          (card) => card.appId === product,
        );
        setFilteredData(filtered);
      }
    },
    [workspacesFilterData],
  );

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

  const addStar = useCallback(
    (appId, isStarred, id) => {
      dispatch(
        updateStars(appId, id, isStarred, (data) => {
          alert.success(data);
        }),
      );
    },
    [dispatch, alert],
  );
  const handleOpen = (event, appId, id) => {
    setAnchorEl(event.currentTarget);
    setWorkspaceAppId(appId);
    setWorkspaceId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //to handle layout data for grid and list
  const handleLayout = useCallback((value) => {
    setLayout(value);
  }, []);
  const handleDelete = useCallback(
    (appId, Id) => {
      dispatch(
        tempDeleteWorkspace(appId, Id, (data) => {
          alert.success(data);
        }),
      );

      setAnchorEl(null);
    },
    [dispatch, alert],
  );

  return (
    <>
      <Metatag
        title="Drive-Appsdeployer"
        description="Handle Your Work with ease"
        image="https://ibb.co/YtBfLMN"
      />
      <div className={styles.home_section}>
        <SearchFunction
          setHasMatchingResults={setHasMatchingResults}
          searchQuery={searchQuery}
          setFilteredData={setFilteredData}
          FilterData={workspacesFilterData}
        />
        <div className={styles.my_drive_header}>
          <h2 className={styles.main_my_drive}>My Drive</h2>

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
        <div className={styles.workspace}>
          <div className={styles.workspace_head}>
            <div className={styles.workspace_header}>
              <h2 className={styles.main_workspace}>Workspace</h2>
            </div>
            <div className={styles.sort_product_wise}>
              <div
                className={ClassNames(styles.files_sort, {
                  [styles.active]: selectedProduct === 0,
                })}
                onClick={setProductappId.bind(this, 0)}
              >
                All
              </div>
              <div
                className={ClassNames(styles.files_sort, {
                  [styles.active]: selectedProduct === 1,
                })}
                onClick={setProductappId.bind(this, 1)}
              >
                <img
                  src={process.env.PUBLIC_URL + "/Images/Navbarimg/Task.ico"}
                  alt="file"
                  className={styles.img_of_favicon}
                />
                &nbsp;Taskdeployer
              </div>

              <div
                className={ClassNames(styles.files_sort, {
                  [styles.active]: selectedProduct === 3,
                })}
                onClick={setProductappId.bind(this, 3)}
              >
                <img
                  src={process.env.PUBLIC_URL + "/Images/Navbarimg/cx-f.ico"}
                  alt="file"
                  className={styles.img_of_favicon}
                />
                &nbsp;Cxdeployer
              </div>
              <div
                className={ClassNames(styles.files_sort, {
                  [styles.active]: selectedProduct === 4,
                })}
                onClick={setProductappId.bind(this, 4)}
              >
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/Images/Navbarimg/Idea-deployer-favicon.ico"
                  }
                  alt="file"
                  className={styles.img_of_favicon}
                />
                &nbsp;Ideadeployer
              </div>
              <div
                className={ClassNames(styles.files_sort, {
                  [styles.active]: selectedProduct === 5,
                })}
                onClick={setProductappId.bind(this, 5)}
              >
                <img
                  src={process.env.PUBLIC_URL + "/Images/Navbarimg/form-f.svg"}
                  alt="file"
                  className={styles.img_of_favicon}
                />
                &nbsp;Forms
              </div>
            </div>
          </div>
          <div className={styles.workspace_card_container}>
            {layout === true ? (
              <table className={styles.workspace_table}>
                <thead>
                  <tr className={styles.workspace_table_head}>
                    <th className={styles.workspace_file_td}>
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
                    <th className={styles.workspace_owner_td}>Owner</th>
                    <th className={styles.workspace_size_td}>
                      Created Date &nbsp;
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
                    <th className={styles.workspace_date_td}>
                      Updated date &nbsp;
                      <ArrowUpwardOutlinedIcon
                        // titleAccess={sortOrder}
                        className={styles.menu_icon}
                        style={{
                          transform:
                            sortValue === "update" && sortOrder === "desc"
                              ? "rotate(180deg)"
                              : "none",
                        }}
                        onClick={handleSort.bind(this, "update")}
                      />
                    </th>
                    <th className={styles.blank_th}> </th>
                  </tr>
                </thead>
                <tbody>
                  {hasMatchingResults ? (
                    filteredData.length !== 0 ? (
                      filteredData?.map((data, index) => (
                        <tr
                          className={styles.workspace_table_details}
                          key={data?._id}
                          id={index}
                          // onClick={() => console.log("redirecting")}
                        >
                          <td
                            className={styles.workspace_file_td}
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
                          <td className={styles.workspace_owner_td}>
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
                          <td className={styles.workspace_size_td}>
                            <span className={styles.username}>
                              {formatDate(data?.createdAt)}
                            </span>
                          </td>
                          <td className={styles.workspace_date_td}>
                            <span className={styles.username}>
                              {formatDate(data?.updateAt)}
                            </span>
                          </td>
                          <td className={styles.workspace_owner_menu}>
                            <div className={styles.action_buttons}>
                              <div className={styles.star_icons_div}>
                                {data?.star === true ? (
                                  <div id={index + "jbjbj"}>
                                    <AiFillStar
                                      className={`${styles.star_icon} ${styles.starred}`}
                                      onClick={addStar.bind(
                                        this,
                                        data.appId,
                                        false,
                                        data._id,
                                      )}
                                    />
                                  </div>
                                ) : (
                                  <div id={index + "hbhh"}>
                                    <AiOutlineStar
                                      className={styles.star_icon}
                                      onClick={addStar.bind(
                                        this,
                                        data.appId,
                                        true,
                                        data._id,
                                      )}
                                    />
                                  </div>
                                )}
                              </div>
                              <div id={index + "jhjhbub"}>
                                <MoreVertIcon
                                  className={styles.menu_icon}
                                  onClick={(e) =>
                                    handleOpen(e, data.appId, data._id)
                                  }
                                />
                              </div>
                            </div>
                            <Menu
                              id="simple-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                              PaperProps={{
                                style: {
                                  boxShadow:
                                    "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                                },
                              }}
                            >
                              {/* <MenuItem>Edit</MenuItem> */}
                              <div
                                className={styles.api_button}
                                onClick={handleDelete.bind(
                                  this,
                                  workspaceAppId,
                                  workspaceId,
                                )}
                                id={index + "hbhv"}
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
                          As a new user you don’t have any workspace so please
                          create one!
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
            ) : hasMatchingResults ? (
              filteredData.length !== 0 ? (
                filteredData?.map((card, index) => (
                  <div
                    className={styles.workspace_card}
                    key={card._id}
                    id={index}
                  >
                    <div
                      className={styles.workspace_card_sub_container}
                      onClick={handleRoute.bind(this, card)}
                      title="Click here to see Workspace"
                    >
                      <img
                        src={imageByAppId[card.appId]}
                        alt={`${card.appId}`}
                        className={styles.workspace_card_image}
                      />
                      <p
                        className={styles.workspace_card_text}
                        style={{ cursor: "pointer" }}
                      >
                        {card?.name?.substring(0, 15)}
                      </p>
                    </div>

                    <div className={styles.action_buttons}>
                      <div className={styles.star_icons_div}>
                        {card?.star === true ? (
                          <>
                            <span className={styles.tooltip_text} id="statreds">
                              starred
                            </span>
                            <div id={index + "hbh"}>
                              <AiFillStar
                                className={`${styles.star_icon} ${styles.starred}`}
                                onClick={addStar.bind(
                                  this,
                                  card.appId,
                                  false,
                                  card._id,
                                )}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <span
                              className={styles.tooltip_text}
                              id="notstatreds"
                            >
                              Not starred
                            </span>
                            <div id={index + "hvhf"}>
                              <AiOutlineStar
                                className={styles.star_icon}
                                onClick={addStar.bind(
                                  this,
                                  card.appId,
                                  true,
                                  card._id,
                                )}
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        className="btn-outline"
                        onClick={(e) => handleOpen(e, card.appId, card._id)}
                        id={index + "gvgv"}
                      >
                        <MoreVertIcon className={styles.menu_icon} />
                      </div>
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
                      {/* <MenuItem>Edit</MenuItem> */}
                      <div
                        className={styles.api_button}
                        onClick={handleDelete.bind(
                          this,
                          workspaceAppId,
                          workspaceId,
                        )}
                        id={index + "bhb"}
                      >
                        Delete
                      </div>
                    </Menu>
                  </div>
                ))
              ) : (
                !loading && (
                  <p className={styles.data_empty_message}>
                    As a new user you don’t have any workspace so please create
                    one!
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
        </div>
      </div>
    </>
  );
};

export default Workspace;
