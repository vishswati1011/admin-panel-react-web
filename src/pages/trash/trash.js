import React, { useState, useCallback, useEffect } from "react";
import styles from "./trash.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getTrash,
  restoreWorkspace,
  deleteWorkspace,
} from "../../redux/action/userAction";
import Loading from "../../components/commonFile/loading";
import { formatDate } from "../../utils/dateFormate";
import { imageByAppId } from "../../utils/imageUtils";
import { sortData } from "../../utils/sortingUtils";
import SearchFunction from "../../components/commonFile/searchFunction";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import { Menu } from "@mui/material";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAlert } from "react-alert";
import { PiGridNineLight, PiListBulletsLight } from "react-icons/pi";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ModalStyle } from "../../utils/modalStyle";
import { splitUserName } from "../../utils/splitUserName";
import updateUserActivity from '../../utils/UserActivity';
const Trash = () => {
  const trashData = useSelector((store) => store.userRoot.trashes);
  const { searchQuery, trashesFilterData } = useSelector(
    (store) => store.userRoot,
  );

  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortValue, setSortValue] = useState("");
  const [layout, setLayout] = useState(false);
  const [hasMatchingResults, setHasMatchingResults] = useState(true);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [appId, setAppId] = useState();
  const [workspaceId, setWorkspaceId] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const alert = useAlert();
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    setAnchorEl(false);
    setOpen(true);
  };

  const handleModalClose = () => setOpen(false);

  useEffect(() => {
    setLoading(true);
    localStorage.setItem('log', new Date());
    setTimeout(() => {
			updateUserActivity("drive-trash");
		}, 5000);
    dispatch(getTrash(page)).then(() => {
      setLoading(false);
    });
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(trashesFilterData);
  }, [trashesFilterData]);

  useEffect(() => {
    setPage(1);
    dispatch({
      type: "RESET_STATE_TRASH",
      payload: [],
    });
    return () => {
      dispatch({
        type: "RESET_STATE_TRASH",
        payload: [],
      });
    };
  }, [dispatch]);

  useInfiniteScroll(loading, trashData, () => {
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

  const handleRestore = useCallback(
    (Id, appId) => {
      dispatch(
        restoreWorkspace(Id, appId, (data) => {
          alert.success(data);
        }),
      );
      setAnchorEl(null);
    },
    [dispatch, alert],
  );

  const handleDeletePermanently = useCallback(
    (Id, appId) => {
      dispatch(
        deleteWorkspace(Id, appId, (data) => {
          alert.success(data);
        }),
      );
      setAnchorEl(null);
      handleModalClose();
    },
    [dispatch, alert],
  );

  const handleOpen = useCallback((event, card) => {
    setAnchorEl(event.currentTarget);
    setWorkspaceId(card._id);
    setAppId(card.appId);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <section className={styles.trash_home}>
      <SearchFunction
        setHasMatchingResults={setHasMatchingResults}
        searchQuery={searchQuery}
        setFilteredData={setFilteredData}
        FilterData={trashesFilterData}
      />
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <p className={styles.delete_Workspace_modal_text}>
            Are you sure you want to delete this Workspace?
          </p>
          <div className={styles.delete_Workspace_modal_div}>
            <button
              className={styles.delete_Workspace_modal_button}
              onClick={handleModalClose}
            >
              Cancel
            </button>
            <button
              onClick={handleDeletePermanently.bind(this, workspaceId, appId)}
              className={styles.delete_Workspace_modal_button_right}
            >
              Delete
            </button>
          </div>
        </Box>
      </Modal>

      <div className={styles.trash_section_name}>
        <h2 className={styles.trash_name}>Trash</h2>
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
      <div className={styles.trash_section}>
        {layout === true ? (
          <table className={styles.trash_table}>
            <thead>
              <tr className={styles.trash_table_head}>
                <th className={styles.trash_file_td}>
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
                <th className={styles.trash_owner_td}>Owner</th>
                <th className={styles.trash_size_td}>
                  Trash Date&nbsp;
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
                {/* <th className={styles.trash_date_td}>Updated date</th> */}
                <th className=""> </th>
              </tr>
            </thead>
            <tbody>
              {hasMatchingResults ? (
                filteredData.length !== 0 ? (
                  filteredData?.map((data, index) => (
                    <tr
                      className={styles.trash_table_details}
                      key={data._id}
                      id={index}
                    >
                      <td className={styles.trash_file_td}>
                        <img
                          src={imageByAppId[data.appId]}
                          alt={`${data.appId}`}
                          className={styles.user_image_icons}
                        />
                        <span className={styles.workspace_name_text}>
                          &nbsp;&nbsp;{data?.name}
                        </span>
                      </td>
                      <td className={styles.trash_owner_td}>
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
                      <td className={styles.trash_size_td}>
                        <span className={styles.username}>
                          {formatDate(data.updateAt)}
                        </span>
                      </td>

                      <td
                        className={styles.trash_owner_menu}
                        id={index + "khju"}
                      >
                        <MoreVertIcon
                          className={styles.menu_icon}
                          onClick={(e) => handleOpen(e, data)}
                        />
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                            },
                          }}
                        >
                          <div className={styles.menu_options}>
                            <span
                              className={styles.api_button}
                              onClick={handleRestore.bind(
                                this,
                                workspaceId,
                                appId,
                              )}
                              id={index + "nbhbhvd"}
                            >
                              Restore
                            </span>
                            <span
                              className={styles.api_button}
                              onClick={handleModalOpen}
                              id={index + "hwjhvd"}
                            >
                              Delete Permanently
                            </span>
                          </div>
                        </Menu>
                      </td>
                    </tr>
                  ))
                ) : (
                  !loading && (
                    <p className={styles.data_empty_message}>
                      Great! There is nothing in Trash.
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
          <div className={styles.trash_card_container}>
            {hasMatchingResults ? (
              filteredData.length !== 0 ? (
                filteredData?.map((card, index) => (
                  <div className={styles.trash_card} key={card?._id} id={index}>
                    <div className={styles.trash_card_sub_container}>
                      <img
                        src={imageByAppId[card?.appId]}
                        alt={`${card?.appId}`}
                        className={styles.trash_card_image}
                      />
                      <p
                        className={styles.trash_card_text}
                        style={{ cursor: "pointer" }}
                      >
                        {card?.name?.substring(0, 15)}
                      </p>
                    </div>

                    <div
                      onClick={(e) => handleOpen(e, card)}
                      id={index + "jghg"}
                    >
                      <MoreVertIcon className={styles.menu_icon} />
                    </div>

                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                        },
                      }}
                    >
                      <div>
                        <div className={styles.menu_options}>
                          <span
                            className={styles.api_button}
                            onClick={handleRestore.bind(
                              this,
                              workspaceId,
                              appId,
                            )}
                            id={index + "khiug"}
                          >
                            Restore
                          </span>

                          <span
                            className={styles.api_button}
                            onClick={handleModalOpen}
                            id={index + "hwjhvd"}
                          >
                            Delete Permanently
                          </span>
                        </div>
                      </div>
                    </Menu>
                  </div>
                ))
              ) : (
                !loading && (
                  <p className={styles.data_empty_message}>
                    Great! There is nothing in Trash.
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

export default Trash;
