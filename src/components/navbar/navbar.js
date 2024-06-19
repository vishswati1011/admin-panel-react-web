import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "../search/searchbar";
import { useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { CiHardDrive } from "react-icons/ci";
import { FiUser, FiUserCheck, FiUsers } from "react-icons/fi";
import { GoStar } from "react-icons/go";
import { CgMenuGridO } from "react-icons/cg";
import { PiTrashThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout, getProfile } from "../../redux/action/userAction";
//for grid icon
import { useCookies } from "react-cookie";
import { Menu } from "@mui/material";
import Cookies from "js-cookie";
import classNames from "classnames";
import { userLoginHelper } from "../../redux/action/userAction";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import PasswordResetPopup from "../../pages/reset/passwordReset";
import { useAlert } from "react-alert";
import { COOKIES_TOKEN } from "../../redux/helper/urlHelper";
import { splitUserName } from "../../utils/splitUserName";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const alert = useAlert();
  const setShowState = useCallback(() => {
    setShow(true);
    setAnchorEl(null);
  }, [setShow]);
  const user = useSelector((store) => store.userRoot.user);
  //Function to decode token
  useEffect(() => {
    const token = COOKIES_TOKEN;
    dispatch(userLoginHelper(token));
    dispatch(getProfile());
  }, []);
  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [open, setOpen] = useState(false);

  const clearCookieFromAllDomains = useCallback(() => {
    const domain = window.location.hostname;
    const path = "/"; // Adjust the path based on your cookie configuration

    // Clear the cookie for the current domain
    Cookies.remove("account_token", { domain, path });

    // Cookies.remove("dev_account_token",
    // { domain, path },
    // );

    // Clear the cookie for each subdomain
    const subdomains = getSubdomains(domain);
    subdomains.forEach((subdomain) => {
      Cookies.remove("account_token", { domain: subdomain, path });
      Cookies.remove("dev_account_token", { domain: subdomain, path });
    });
    window.location.reload();
  }, []);

  // Helper function to get subdomains of a domain
  const getSubdomains = useCallback((domain) => {
    const domainParts = domain.split(".");
    const subdomains = [];

    for (let i = domainParts.length - 2; i >= 0; i--) {
      subdomains.push(domainParts.slice(i).join("."));
    }

    return subdomains;
  }, []);

  const toggleDrawer = useCallback(
    (open) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    },
    [],
  );
  // for grid icon
  const [selectedDomain, setSelectedDomain] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["selectedDomain"]);
  console.log(selectedDomain);
  useEffect(() => {
    // Retrieve the stored domain from the cookie
    const storedDomain = cookies.selectedDomain;
    if (storedDomain) {
      setSelectedDomain(storedDomain);
    }
  }, [cookies]);

  const handleDomainChange = useCallback(
    (newDomain) => {
      // Set the selected domain in the cookie
      setCookie("selectedDomain", newDomain, { path: "/" });
      //   // Update the selected domain state
      setSelectedDomain(newDomain);

      try {
        // Open a new tab with a blank page
        const newTab = window.open("about:blank", "_blank");

        // Set the location of the new tab to the selected domain
        newTab.location.href = `https://${newDomain}`;
      } catch (error) {
        console.error("Error navigating to the selected domain:", error);
      }
    },
    [setCookie],
  );
  // for logout
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(
      userLogout(navigate, clearCookieFromAllDomains, removeCookie, (data) =>
        alert.success(data),
      ),
    );
    setAnchorEl(null);
  }, []);

  const list = (
    <Box
      className={styles.drawer_nav}
      sx={{ width: 230 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className={styles.mobile_view_logo}>
        <img
          src={process.env.PUBLIC_URL + "/Images/Navbarimg/Drive_logo.png"}
          alt="grid"
          className={styles.mobile_logo_image}
        />
        <IoCloseSharp size={23} onClick={toggleDrawer(false)} />
      </div>

      <div className={styles.mobile_sidebar}>
        <List>
          <div className={styles.mobile_sidebar_tab2}>
            <Link to="/" className={styles.link_css}>
              <div className={styles.mobile_sidebar_tab_activity}>
                <div className={styles.side_icons}>
                  <CiHardDrive />
                  <span>My Drive</span>
                </div>
              </div>
            </Link>

            <Link to="/share-with-me" className={styles.link_css}>
              <div className={styles.mobile_sidebar_tab_activity}>
                <div className={styles.side_icons}>
                  <FiUsers />
                  <span>Share with me </span>
                </div>
              </div>
            </Link>
            <Link to="/starred" className={styles.link_css}>
              <div className={styles.mobile_sidebar_tab_activity}>
                <div className={styles.side_icons}>
                  <GoStar />
                  <span>Starred</span>
                </div>
              </div>
            </Link>
            <Link to="/trash" className={styles.link_css}>
              <div className={styles.mobile_sidebar_tab_activity}>
                <div className={styles.side_icons}>
                  <PiTrashThin />
                  <span>Trash</span>
                </div>
              </div>
            </Link>
            <Link to="/resources" className={styles.link_css}>
              <div className={styles.mobile_sidebar_tab_activity}>
                <div className={styles.side_icons}>
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
            <p className={styles.mobile_sidebar_hr}></p>
            <Link to="/users" className={styles.link_css}>
              <div className={styles.mobile_sidebar_tab_activity}>
                <div className={styles.side_icons}>
                  <FiUser />
                  <span>User</span>
                </div>
              </div>
            </Link>
            <Link to="/roles" className={styles.link_css}>
              <div className={styles.mobile_sidebar_tab_activity}>
                <div className={styles.side_icons}>
                  <FiUserCheck />
                  <span>Role</span>
                </div>
              </div>
            </Link>
            <Link to="/groups" className={styles.link_css}>
              <div className={styles.mobile_sidebar_tab_activity}>
                <div className={styles.side_icons}>
                  <FiUsers />
                  <span>Group</span>
                </div>
              </div>
            </Link>
          </div>
        </List>
      </div>
    </Box>
  );

  return (
    <>
      <PasswordResetPopup show={show} setShow={setShow} />
      <div>
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          {list}
        </Drawer>
      </div>

      <div className={styles.drive_navbar}>
        <div className={styles.drive_section}>
          <div className={styles.section_of_img}>
            <div className={styles.hum_berger}>
              <AiOutlineMenu size={25} onClick={toggleDrawer(true)} />
            </div>

            <Link to="/" className={styles.link_css}>
              <div className={styles.center_image}>
                <img
                  src={
                    process.env.PUBLIC_URL + "/Images/Navbarimg/Drive_logo.png"
                  }
                  alt="grid"
                  className={styles.logo_image}
                />
              </div>
            </Link>
            <div className={styles.search_bar_comp}>
              <SearchBar />
            </div>
          </div>
          <div className={styles.user_details}>
            <div className="dropdown">
              <button
                className={classNames(
                  styles.hidden_arrow,
                  "d-flex",
                  "dropdown-toggle",
                )}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <CgMenuGridO size={28} />
              </button>
              <ul className={classNames(styles.switch_to, "dropdown-menu")}>
                <h6 className={styles.switch__text01}>Switch to</h6>

                <div className=" ">
                  <Link
                    className={styles.link_css}
                    onClick={handleDomainChange.bind(
                      this,
                      "task.appsdeployer.com/userboard",
                    )}
                  >
                    <div
                      className={classNames(
                        styles.dropdown_item,
                        "dropdown-item",
                      )}
                    >
                      <span className={classNames("text-muted", "text-sm")}>
                        <img
                          className={styles.switch_dots}
                          src={
                            process.env.PUBLIC_URL +
                            "/Images/Navbarimg/Task.ico"
                          }
                          alt="icon"
                        />
                      </span>
                      Taskdeployer
                    </div>
                  </Link>
                </div>

                <div className={classNames("dropdown-divider")}></div>
                <div className=" ">
                  <Link
                    className={styles.link_css}
                    onClick={handleDomainChange.bind(
                      this,
                      "idea.appsdeployer.com",
                    )}
                  >
                    <div
                      className={classNames(
                        styles.dropdown_item,
                        "dropdown-item",
                      )}
                    >
                      <span className={classNames("text-muted", "text-sm")}>
                        <img
                          className={styles.switch_dots}
                          src={
                            process.env.PUBLIC_URL +
                            "/Images/Navbarimg/Idea-deployer-favicon.ico"
                          }
                          alt="icon"
                        />
                      </span>
                      Ideadeployer
                    </div>
                  </Link>
                </div>
                <div className={classNames("dropdown-divider")}></div>
                <div className=" ">
                  <Link
                    className={styles.link_css}
                    onClick={handleDomainChange.bind(
                      this,
                      "cx.appsdeployer.com",
                    )}
                  >
                    <div
                      className={classNames(
                        styles.dropdown_item,
                        "dropdown-item",
                      )}
                    >
                      <span className={classNames("text-muted", "text-sm")}>
                        <img
                          className={styles.switch_dots}
                          src={
                            process.env.PUBLIC_URL +
                            "/Images/Navbarimg/cx-f.ico"
                          }
                          alt="icon"
                        />
                      </span>
                      Cxdeployer
                    </div>
                  </Link>
                </div>
                <div className={classNames("dropdown-divider")}></div>
                <div className=" ">
                  <Link
                    className={styles.link_css}
                    onClick={handleDomainChange.bind(
                      this,
                      "forms.appsdeployer.com",
                    )}
                  >
                    <div
                      className={classNames(
                        styles.dropdown_item,
                        "dropdown-item",
                      )}
                    >
                      <span className={classNames("text-muted", "text-sm")}>
                        <img
                          className={styles.switch_dots}
                          src={
                            process.env.PUBLIC_URL +
                            "/Images/Navbarimg/form-f.svg"
                          }
                          alt="icon"
                        />
                      </span>
                      Forms
                    </div>
                  </Link>
                </div>

                <div className={classNames("dropdown-divider")}></div>
                <div className=" ">
                  <Link
                    to="https://whiteboard.appsdeployer.com/"
                    target="_blank"
                    className={styles.link_css}
                  >
                    <div
                      className={classNames(
                        styles.dropdown_item,
                        "dropdown-item",
                      )}
                    >
                      <span className={classNames("text-muted", "text-sm")}>
                        <img
                          className={styles.switch_dots}
                          src={
                            process.env.PUBLIC_URL +
                            "/Images/Navbarimg/Whiteboard-f.png"
                          }
                          alt="icon"
                        />
                      </span>
                      Whiteboard
                    </div>
                  </Link>
                </div>

                <div className={classNames("dropdown-divider")}></div>
                <div className=" ">
                  <Link
                    to="https://www.appsdeployer.com/riskdeployer"
                    target="_blank"
                    className={styles.link_css}
                  >
                    <div
                      className={classNames(
                        styles.dropdown_item,
                        "dropdown-item",
                      )}
                    >
                      <span className={classNames("text-muted", "text-sm")}>
                        <img
                          className={styles.switch_dots}
                          src={
                            process.env.PUBLIC_URL +
                            "/Images/Navbarimg/Risk.png"
                          }
                          alt="icon"
                        />
                      </span>
                      Riskdeployer(Coming Soon)
                    </div>
                  </Link>
                </div>
              </ul>
            </div>
            <div className={styles.profile_div}>
              {user && user[0]?.userId.image ? (
                <img
                  src={user && user[0]?.userId.image}
                  alt="Profile"
                  className={styles.user_image_icons}
                  onClick={handleClick}
                />
              ) : (
                <p className={styles.user_image_icons} onClick={handleClick}>
                  {splitUserName(user && user[0]?.userId.username)}
                </p>
              )}
            </div>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                boxShadow:
                  " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              }}
            >
              <div>
                <div className={styles.profile_popup_div}>
                  <div className={styles.user_details_popup}>
                    <Link
                      to="/profile"
                      onClick={handleClose}
                      className={styles.link_css}
                    >
                      <span className={styles.user_logout} id="Profile">
                        &nbsp; My Profile
                      </span>
                    </Link>
                    <span
                      className={styles.user_logout}
                      onClick={setShowState}
                      id="Reset Password"
                    >
                      &nbsp; Reset Password
                    </span>
                    <span
                      className={styles.user_logout}
                      onClick={handleLogout}
                      id="Logout"
                    >
                      &nbsp; Logout
                    </span>
                  </div>
                </div>
              </div>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
