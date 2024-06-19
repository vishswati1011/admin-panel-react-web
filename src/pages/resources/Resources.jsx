import React, {useEffect} from "react";
import styles from "./Resources.module.css";
import updateUserActivity from '../../utils/UserActivity';
const Resources = () => {
  useEffect(() => {
    localStorage.setItem('log', new Date());
    setTimeout(() => {
			updateUserActivity("drive-resource");
		}, 5000);
  }, [])
  const Steps = [
    {
      stepNo: "Step 1",
      title: "Thank you for creating the account.",
      paragraph:
        "In this step, the focus is on the initial account creation process. Users are not only thanked but are also prompted to define a role for their working environment. This role likely sets the foundation for user permissions and access levels within the account.",
      image:
        "https://storage.googleapis.com/backend-upload-bucket/library/DriveStep1.png",
    },
    {
      stepNo: "Step 2",
      title: "Create Users",
      paragraph:
        "After establishing roles, the attention shifts to individual users. This step involves the creation of a list of users, implying that users are distinct entities within the system, each potentially assigned specific tasks or responsibilities.",
      image:
        "https://storage.googleapis.com/backend-upload-bucket/library/DriveStep2.png",
    },
    {
      stepNo: "Step 3",
      title: "Create Group",
      paragraph:
        "Building on the concept of individual users, the creation of groups is introduced. This suggests a collaborative or organizational structure where users can be grouped together, possibly to streamline communication or manage permissions collectively.",
      image:
        "https://storage.googleapis.com/backend-upload-bucket/library/DriveStep3.png",
    },
    {
      stepNo: "Step 4",
      title: "Create Workspace",
      paragraph:
        "Workspaces are pivotal in this step, serving as environments that allow users to access various deployers (task, idea, cx, or form). This indicates a modular approach to organizing and executing tasks within the working environment.",
      image:
        "https://storage.googleapis.com/backend-upload-bucket/library/DriveStep4.png",
    },
    {
      stepNo: "Step 5",
      title: "View all Workspaces",
      paragraph:
        "After the creation of workspaces, users are directed to the My Drive page. Here, they can gain an overview of all the workspaces they have created. The ability to star and delete workspaces suggests a customizable and user-centric workspace management system.",
      image:
        "https://storage.googleapis.com/backend-upload-bucket/library/DriveStep5.png",
    },
    {
      stepNo: "Step 6",
      title: "View all Shared Workspaces",
      paragraph:
        "This step extends the visibility of workspaces to shared ones. Users can explore the Share with Me page, where all shared workspaces are accessible. The option to make copies of specific workspaces indicates a collaborative approach to workspace utilization.",
      image:
        "https://storage.googleapis.com/backend-upload-bucket/library/DriveStep6.png",
    },
    {
      stepNo: "Step 7",
      title: "View all Starred Workspaces",
      paragraph:
        "Users are provided with a dedicated Starred Page, emphasizing favorited or frequently accessed workspaces. This feature enhances user efficiency by providing quick access to important or commonly used workspaces.",
      image:
        "https://storage.googleapis.com/backend-upload-bucket/library/DriveStep7.png",
    },
    {
      stepNo: "Step 8",
      title: "View all Trashed Workspaces",
      paragraph:
        "The final step involves managing trashed workspaces. Users can access the Trashed Page, where discarded workspaces are stored. The options to restore or permanently delete workspaces suggest a systematic approach to workspace lifecycle management.",
      image:
        "https://storage.googleapis.com/backend-upload-bucket/library/DriveStep8.png",
    },
  ];
  return (
    <>
      <div className={styles.resources_section_name}>
        <h2 className={styles.resources_name}>Resources</h2>
      </div>
      <div className={styles.resources_div}>
        {Steps.map((step, i) => (
          <div className="container py-2" key={i}>
            <div className="card">
              <div className={styles.card_container}>
                <div className={styles.card_first_container}>
                  <div className="p-3">
                    <h4 className={styles.resources_card_title}>
                      {step.stepNo}
                    </h4>
                    <p className={styles.resources_card_sub_title}>
                      {step.title}
                    </p>
                    <p className={styles.resources_card_description}>
                      {step.paragraph}
                    </p>
                  </div>
                </div>

                <div className={styles.card_second_container}>
                  <img
                    className={styles.resources_images}
                    src={step.image}
                    alt="images"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Resources;
