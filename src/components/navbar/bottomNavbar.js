import React, { useState, useCallback, useEffect, useRef } from "react";
import styles from "./bottomNavbar.module.css";
import { Link } from "react-router-dom";
import { RiUser3Line } from "react-icons/ri";
import { VscHome } from "react-icons/vsc";
import { VscDiffAdded } from "react-icons/vsc";
import { task, cx, idea, whiteboards, form } from "../../utils/routes";
import Cookies from "js-cookie";

const BottomNavbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null); // Ref to the popup element

  // Function to open the popup
  const togglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  // Close the popup when clicking outside of it
  const handleOutsideClick = useCallback((event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closePopup();
    }
  }, []);

  useEffect(() => {
    // Add click event listener to the document
    document.addEventListener("click", handleOutsideClick);

    return () => {
      // Remove the click event listener when component unmounts
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  const handleRoute = useCallback((appId) => {
    const newTab = window.open("about:blank", "_blank");
    if (appId === 1) {
      newTab.location.href = `${task}userboard?mode=create`;
      closePopup();
    } else if (appId === 3) {
      Cookies.set("cx_workspace_open", true, {
        domain: ".appsdeployer.com",
        sameSite: "none",
        secure: true,
      });
      newTab.location.href = `${cx}`;
      closePopup();
    } else if (appId === 4) {
      newTab.location.href = `${idea}workspace?mode=create`;
      closePopup();
    } else if (appId === 6) {
      newTab.location.href = `${whiteboards}`;
      closePopup();
    } else if (appId === 5) {
      newTab.location.href = `${form}createForm`;
      closePopup();
    }
  }, []);

  return (
    <>
      <div className={styles.bottom_navbar}>
        <div className={styles.bottom_navbar_div}>
          <Link to="/" className={styles.link_css}>
            <div className={styles.bottom_icon_item}>
              <VscHome size={20} />
              <p className={styles.icon_name}>Home</p>
            </div>
          </Link>
          <div onClick={togglePopup} ref={popupRef}>
            {/* Attach the ref here */}
            <div className={styles.bottom_icon_item}>
              <VscDiffAdded size={20} />
              <p className={styles.icon_name}>Add new</p>
            </div>
          </div>
          <Link to="/profile" className={styles.link_css}>
            <div className={styles.bottom_icon_item}>
              <RiUser3Line size={20} />
              <p className={styles.icon_name}>Profile</p>
            </div>
          </Link>
        </div>
      </div>
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.icon_container}>
            {/* Popup content */}
            <div className={styles.icon_item} onClick={() => handleRoute(1)}>
              <img
                className={styles.icon_size}
                src={process.env.PUBLIC_URL + "/Images/Navbarimg/Task.ico"}
                alt="icon"
              />
              <p>Add Task workspace</p>
            </div>
            <div className={styles.icon_item} onClick={() => handleRoute(4)}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/Images/Navbarimg/Idea-deployer-favicon.ico"
                }
                alt="grid"
                className={styles.icon_size}
              />
              <p>Add Idea workspace</p>
            </div>
            <div className={styles.icon_item} onClick={() => handleRoute(3)}>
              <img
                src={process.env.PUBLIC_URL + "/Images/Navbarimg/cx-f.ico"}
                alt="grid"
                className={styles.icon_size}
              />
              <p> Add Cx workspace</p>
            </div>
            <div className={styles.icon_item} onClick={() => handleRoute(5)}>
              <img
                src={process.env.PUBLIC_URL + "/Images/Navbarimg/form-f.svg"}
                alt="grid"
                className={styles.icon_size}
              />
              <p>
                Add <br />
                Forms
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNavbar;
