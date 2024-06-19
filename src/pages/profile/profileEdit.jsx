import React, { useCallback, useEffect, useState } from "react";
import styles from "./profileEdit.module.css";
import updateUserActivity from '../../utils/UserActivity';
import { useDispatch, useSelector } from "react-redux";
import { getProfile, editProfile } from "../../redux/action/userAction";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Modal } from "react-bootstrap";
import { useAlert } from "react-alert";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { splitUserName } from "../../utils/splitUserName";

const ProfileEditPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.userRoot.user);
  const [image, setImage] = useState(null); // Use null instead of empty string for image state
  const [show, setShow] = useState(false);
  const [name, setName] = useState(profile && profile[0]?.userId?.username); // Set initial name to the current username
  const alert = useAlert();
  const [disabled, setDisabled] = useState();
  useEffect(() => {
    localStorage.setItem('log', new Date());
    setTimeout(() => {
			updateUserActivity("drive-profile");
		}, 5000);
    // Dispatch action to fetch profile when component mounts or when dependencies change
    dispatch(getProfile());
  }, [dispatch]);
  useEffect(() => {
    if (profile && profile[0]?.userId?.username) {
      setName(profile[0]?.userId?.username); // Set the initial name in the state
    }
  }, [profile]);
  const handleImageChange = useCallback((e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      // Perform file type validation (optional)
      if (!selectedImage.type.startsWith("image/")) {
        alert.error("Please select an image file.");
        return;
      }

      setImage(selectedImage);
    } else {
      // No image selected, reset the image state to null
      setImage(null);
    }
  }, []);

  const handleEditProfile = useCallback(() => {
    // Username validation: Ensure that the username is not empty
    if (!name.trim()) {
      alert.error("Please enter a valid username.");
      return;
    }

    // Create a FormData object and append the image and username values to it
    const formData = new FormData();

    formData.append("profile-attach", image);

    formData.append("username", name);
    setDisabled(true);
    dispatch(
      editProfile(formData, (data, type) => {
        alert.show(data, { type: type });
        setShow(false); // Close the modal after successful submission
        setDisabled(false);
      }),
    );
  }, [name, image]);
  const handleImageClick = useCallback(() => {
    // Trigger the click event of the hidden input when clicking on the image
    document.getElementById("image-inputProfilePage").click();
  }, []);
  const onHidefunction = useCallback(() => {
    setImage(null);
    setName(profile && profile[0]?.userId?.username);
    setShow(false);
  }, []);

  return (
    <>
      <div className={styles.profile_edit_page}>
        <div className={styles.profile_edit_icons}>
          <div>
            {profile && profile[0]?.userId.image ? (
              <img
                src={profile && profile[0]?.userId.image}
                alt="Profile"
                className={styles.image_view}
              />
            ) : (
              <p
                className={styles.profile_icon}
                style={{ paddingTop: "2px", textTransform: "uppercase" }}
              >
                {splitUserName(profile && profile[0]?.userId.username)}
              </p>
            )}
          </div>
          <div onClick={setShow.bind(this, true)} className={styles.edit_icon}>
            <EditOutlinedIcon />
            <span className={styles.edit_icon_span}>Edit</span>
          </div>
        </div>
        <div className={styles.div_of_user_details}>
          <p className={styles.name_heading}>
            {/* Display skeleton if name is not available */}
            {(profile && profile[0]?.userId.username) || (
              <Skeleton width={200} />
            )}
          </p>
          <span className={styles.email_heading}>
            {/* Display skeleton if email is not available */}
            Email:&nbsp;
            {(profile && profile[0]?.userId.email) || <Skeleton width={150} />}
          </span>
          <div style={{ marginTop: "1rem" }}>
            <span className={styles.roles_heading}>
              {/* Display skeleton if roleId is not available */}
              Role: &nbsp;
              {(profile && profile[0]?.roleId?.name) || (
                <Skeleton width={100} />
              )}
            </span>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <span className={styles.roles_heading}>
              {/* Display skeleton if organizationId is not available */}
              Organization: &nbsp;
              {(profile && profile[0]?.organizationId?.name) || (
                <Skeleton width={150} />
              )}
            </span>
          </div>
        </div>
        <Modal show={show} onHide={onHidefunction} size="large">
          <Modal.Header closeButton className={styles.modal_headers}>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modal_headers}>
            <form className={styles.form_head_section}>
              <div className={styles.perent_div_of_image}>
                <span>Profile:</span>
                <div className={styles.image_preview_container}>
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : (profile && profile[0]?.userId.image) ||
                          process.env.PUBLIC_URL +
                            "/Images/Navbarimg/user-profile.png"
                    }
                    alt="Profile"
                    id="image-preview"
                    className={styles.image_preview}
                  />
                  <div className={styles.upload_image_div}>
                    <p
                      className={styles.upload_picture_text}
                      onClick={handleImageClick}
                    >
                      Upload a picture
                    </p>
                  </div>
                </div>
              </div>
              <input
                type="file"
                id="image-inputProfilePage"
                placeholder="Please Select Your Image"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              <div className={styles.edit_area_container}>
                <span>Name:</span>
                <input
                  className={styles.edit_name_input}
                  type="text"
                  placeholder="Please Enter Your Name"
                  value={name} // Use 'value' prop to bind input value
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </form>
            <div className={styles.form_head_section}>
              <button
                type="button"
                disabled={disabled}
                className={styles.save_button}
                onClick={handleEditProfile}
              >
                Save
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ProfileEditPage;
