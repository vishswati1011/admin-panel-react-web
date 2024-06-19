import React, { useState, useCallback, useEffect } from "react";
import styles from "./sidebar.module.css"; // Import the CSS module
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import classNames from "classnames";
import { useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { CiHardDrive } from "react-icons/ci";
import { FiUser, FiUserCheck, FiUsers } from "react-icons/fi";
import { TbUserShare } from "react-icons/tb";
import { GoStar } from "react-icons/go";
import { PiTrashThin } from "react-icons/pi";
import { AiFillCaretRight } from "react-icons/ai";
import { task, cx, idea, whiteboards, form } from "../../utils/routes";
import Cookies from "js-cookie";

const SideBar = () => {
  const workspace = useSelector((store) => store.userRoot.workspaces);
  let currentPath = useLocation().pathname;
  const [activeItem, setActiveItem] = useState("My Drive"); // State variable to track active sidebar item
  const [activeAddNew, setActiveAddNew] = useState("");
  // function to handle active page
  const handleItemClick = useCallback((item) => {
    setActiveItem(item);
    // Store the active item in local storage
    localStorage.setItem("activeSidebarItem", item);
  }, []);

  useEffect(() => {
    const storedActiveItem = localStorage.getItem("activeSidebarItem");

    if (currentPath === "/") {
      setActiveItem("My Drive");
    } else if (storedActiveItem) {
      setActiveItem(storedActiveItem);
    }
  }, [currentPath]);
  // for open Add New popup
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
    setActiveAddNew("Add");
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setActiveAddNew("");
  }, []);
  const handleRoute = useCallback(
    (appId) => {
      const newTab = window.open("about:blank", "_blank");
      console.log("nnn", newTab.location);

      if (appId === 1) {
        newTab.location.href = `http://${task}/userboard?mode=create`;
        setAnchorEl(null);
        setActiveAddNew("");
      } else if (appId === 3) {
        Cookies.set("cx_workspace_open", true, {
          domain: ".appsdeployer.com",
          sameSite: "none",
          secure: true,
        });
        newTab.location.href = `http://${cx}`;
        setAnchorEl(null);
        setActiveAddNew("");
      } else if (appId === 4) {
        newTab.location.href = `http://${idea}/workspace?mode=create`;
        setAnchorEl(null);
        setActiveAddNew("");
      } else if (appId === 6) {
        newTab.location.href = `http://${whiteboards}`;
        setAnchorEl(null);
        setActiveAddNew("");
      } else if (appId === 5) {
        newTab.location.href = `http://${form}/createForm`;
        setAnchorEl(null);
        setActiveAddNew("");
      }
    },
    [workspace],
  );
  return (
    <div className={classNames(styles.side_nav)}>
      <div className={classNames(styles.sidebar)}>
        {/* Additional sidebar for option */}

        <div className={styles.side_contain}>
          <div className={styles.sidebar_tab2}>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className={classNames(styles.sidebar_add_tab, {
                [styles.active]: activeAddNew,
              })}
              sx={{
                borderRadius: "30px",
                marginRight: "55px",
                marginBottom: "5px",
              }}
            >
              <div className={styles.add_new_text}>
                {activeAddNew ? (
                  <>
                    <CloseIcon sx={{ fontSize: 40, color: "blue" }} />
                    <span className={styles.add_new}>Close</span>
                  </>
                ) : (
                  <>
                    <AddOutlinedIcon sx={{ fontSize: 40, color: "blue" }} />
                    <span>New</span>
                  </>
                )}
              </div>
            </Button>
            <Link to="/dashboard" className={styles.link_color}>
              <div
                title={"Dashboard"}
                className={classNames(styles.sidebar_tab, {
                  [styles.active]: activeItem === "Dashboard",
                })}
                onClick={handleItemClick.bind(this, "Dashboard")}
              >
                <div className={styles.side_icons}>
                  {activeItem === "Dashboard" ? (
                    <AiFillCaretRight style={{ color: "black" }} />
                  ) : (
                    ""
                  )}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18 15.75H19.5V19.5H18V15.75ZM15 12H16.5V19.5H15V12ZM8.25 19.5C7.2558 19.4988 6.30267 19.1033 5.59966 18.4003C4.89666 17.6973 4.50119 16.7442 4.5 15.75H6C6 16.195 6.13196 16.63 6.37919 17C6.62643 17.37 6.97783 17.6584 7.38896 17.8287C7.8001 17.999 8.2525 18.0436 8.68895 17.9568C9.12541 17.87 9.52632 17.6557 9.84099 17.341C10.1557 17.0263 10.37 16.6254 10.4568 16.189C10.5436 15.7525 10.499 15.3001 10.3287 14.889C10.1584 14.4778 9.87004 14.1264 9.50003 13.8792C9.13002 13.632 8.69501 13.5 8.25 13.5V12C9.24456 12 10.1984 12.3951 10.9017 13.0983C11.6049 13.8016 12 14.7554 12 15.75C12 16.7446 11.6049 17.6984 10.9017 18.4017C10.1984 19.1049 9.24456 19.5 8.25 19.5Z"
                      fill="#367FFF"
                    />
                    <path
                      d="M21 1.5H3C2.6023 1.5004 2.221 1.65856 1.93978 1.93978C1.65856 2.221 1.5004 2.6023 1.5 3V21C1.5004 21.3977 1.65856 21.779 1.93978 22.0602C2.221 22.3414 2.6023 22.4996 3 22.5H21C21.3976 22.4994 21.7788 22.3412 22.06 22.06C22.3412 21.7788 22.4994 21.3976 22.5 21V3C22.4996 2.6023 22.3414 2.221 22.0602 1.93978C21.779 1.65856 21.3977 1.5004 21 1.5ZM21 8.25H10.5V3H21V8.25ZM9 3V8.25H3V3H9ZM3 21V9.75H21L21.0015 21H3Z"
                      fill="#367FFF"
                    />
                  </svg>
                  <span>Dashboard</span>
                </div>
              </div>
            </Link>
            <Link to="/" className={styles.link_color}>
              <div
                title={"My Drive"}
                className={classNames(styles.sidebar_tab, {
                  [styles.active]: activeItem === "My Drive",
                })}
                onClick={handleItemClick.bind(this, "My Drive")}
              >
                <div className={styles.side_icons}>
                  {activeItem === "My Drive" ? (
                    <AiFillCaretRight style={{ color: "black" }} />
                  ) : (
                    ""
                  )}
                  <CiHardDrive />
                  <span>My Drive</span>
                </div>
              </div>
            </Link>

            <Link to="/share-with-me" className={styles.link_color}>
              <div
                title={"Share with Me"}
                className={classNames(styles.sidebar_tab, {
                  [styles.active]: activeItem === "Share with me",
                })}
                onClick={handleItemClick.bind(this, "Share with me")}
              >
                <div className={styles.side_icons}>
                  {activeItem === "Share with me" ? (
                    <AiFillCaretRight style={{ color: "black" }} />
                  ) : (
                    ""
                  )}
                  <TbUserShare />
                  <span>Share with me</span>
                </div>
              </div>
            </Link>
            <Link to="/starred" className={styles.link_color}>
              <div
                title={"Starred"}
                className={classNames(styles.sidebar_tab, {
                  [styles.active]: activeItem === "Starred",
                })}
                onClick={handleItemClick.bind(this, "Starred")}
              >
                <div className={styles.side_icons}>
                  {activeItem === "Starred" ? (
                    <AiFillCaretRight style={{ color: "black" }} />
                  ) : (
                    ""
                  )}
                  <GoStar />
                  <span>Starred</span>
                </div>
              </div>
            </Link>
            <Link to="/trash" className={styles.link_color}>
              <div
                title={"Trash"}
                className={classNames(styles.sidebar_tab, {
                  [styles.active]: activeItem === "Trash",
                })}
                onClick={handleItemClick.bind(this, "Trash")}
              >
                <div className={styles.side_icons}>
                  {activeItem === "Trash" ? (
                    <AiFillCaretRight style={{ color: "black" }} />
                  ) : (
                    ""
                  )}
                  <PiTrashThin />
                  <span>Trash</span>
                </div>
              </div>
            </Link>
            <Link to="/resources" className={styles.link_color}>
              <div
                title={"Resources"}
                className={classNames(styles.sidebar_tab, {
                  [styles.active]: activeItem === "Resources",
                })}
                onClick={handleItemClick.bind(this, "Resources")}
              >
                <div className={styles.side_icons}>
                  {activeItem === "Resources" ? (
                    <AiFillCaretRight style={{ color: "black" }} />
                  ) : (
                    ""
                  )}
                  <svg
                    height="1em"
                    width="1em"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.625 4.97917L11.25 6.29167L6 8.91667L0.75 6.29167L3.375 4.97917M8.625 7.89583L11.25 9.20833L6 11.8333L0.75 9.20833L3.375 7.89583M6 0.75L11.25 3.375L6 6L0.75 3.375L6 0.75Z"
                      stroke="#000"
                      fill="none"
                    ></path>
                  </svg>
                  <span>Resources</span>
                </div>
              </div>
            </Link>
            <p className={styles.sidebar_hr} />
            <Link to="/users" className={styles.link_color}>
              <div
                title={"Add User"}
                className={classNames(styles.sidebar_tab, {
                  [styles.active]: activeItem === "User",
                })}
                onClick={handleItemClick.bind(this, "User")}
              >
                <div className={styles.side_icons}>
                  {activeItem === "User" ? (
                    <AiFillCaretRight style={{ color: "black" }} />
                  ) : (
                    ""
                  )}
                  <FiUser />
                  <span>User</span>
                </div>
              </div>
            </Link>
            <Link to="/roles" className={styles.link_color}>
              <div
                title={"Add Role"}
                className={classNames(styles.sidebar_tab, {
                  [styles.active]: activeItem === "Role",
                })}
                onClick={handleItemClick.bind(this, "Role")}
              >
                <div className={styles.side_icons}>
                  {activeItem === "Role" ? (
                    <AiFillCaretRight style={{ color: "black" }} />
                  ) : (
                    ""
                  )}
                  <FiUserCheck />
                  <span>Role</span>
                </div>
              </div>
            </Link>
            <Link to="/groups" className={styles.link_color}>
              <div
                title={"Add Group"}
                className={classNames(styles.sidebar_tab, {
                  [styles.active]: activeItem === "Group",
                })}
                onClick={handleItemClick.bind(this, "Group")}
              >
                <div className={styles.side_icons}>
                  {activeItem === "Group" ? (
                    <AiFillCaretRight style={{ color: "black" }} />
                  ) : (
                    ""
                  )}
                  <FiUsers />
                  <span>Group</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* Add New Workspace */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          top: "-50px",
          left: "50px",
        }}
      >
        <div className={styles.add_new_popup_div} onClick={() => handleClose}>
          <div onClick={() => handleRoute(1)} className={styles.menu_item}>
            <img
              className={styles.switch_dots}
              src={process.env.PUBLIC_URL + "/Images/Navbarimg/Task.ico"}
              alt="icon"
            />
            <span className="text-black">Add Taskdeployer Workspace</span>
          </div>

          <div onClick={() => handleRoute(4)} className={styles.menu_item}>
            <img
              className={styles.switch_dots}
              src={
                process.env.PUBLIC_URL +
                "/Images/Navbarimg/Idea-deployer-favicon.ico"
              }
              alt="icon"
            />
            <span className="text-black">Add Ideadeployer Workspace</span>
          </div>

          <div onClick={() => handleRoute(3)} className={styles.menu_item}>
            <img
              className={styles.switch_dots}
              src={process.env.PUBLIC_URL + "/Images/Navbarimg/cx-f.ico"}
              alt="icon"
            />
            <span className="text-black">Add Cxdeployer Workspace</span>
          </div>

          <div onClick={() => handleRoute(5)} className={styles.menu_item}>
            <img
              className={styles.switch_dots}
              src={process.env.PUBLIC_URL + "/Images/Navbarimg/form-f.svg"}
              alt="icon"
            />
            <span className="text-black">Add Form</span>
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default SideBar;
