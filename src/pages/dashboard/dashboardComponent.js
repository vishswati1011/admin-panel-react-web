import React from "react";
import styles from "./dashboard.module.css";
import SingleValueChart from "./chart";
import { LineChartComponent } from "./lineChart";
import { sharedWorkspace } from "./svg";
const dashboardComponent = ({ data, selectedOption }) => {
  return (
    <div className={styles.dashboard_main}>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.dashboard_div}>
        <div className={styles.total_workspace}>
          <p>Total Workspaces</p>
          <SingleValueChart
            value={"8"}
            colors={"linear-gradient(90deg, #8338EC, #FF004C, #3986FE)"}
            size={"80%"}
          />
          <p className={styles.value_of_totalworkspacevalue}>
            {selectedOption === "My Dashboard"
              ? data?.userId?.totalWorkSpace
              : data?.orgnizationId?.totalWorkSpace}
          </p>
        </div>
        <div className={styles.product_based_chart_div}>
          <div className={styles.product_based_chart}>
            <div className={styles.workspace_div}>
              <div className={styles.product_based}>
                <p>Workspaces in Taskdeployer</p>
                <img src={process.env.PUBLIC_URL + "/Images/Task.png"} alt="" />
              </div>
              <SingleValueChart value={"8"} colors={"#8338EC"} size={"80%"} />
              <p className={styles.value_of_totalworkspace_product}>
                {selectedOption === "My Dashboard"
                  ? data?.userId?.TASK
                  : data?.orgnizationId?.TASK}
              </p>
            </div>
            <div className={styles.workspace_div}>
              <div className={styles.product_based}>
                <p>Workspaces in Cxdeployer</p>
                <img src={process.env.PUBLIC_URL + "/Images/cx.png"} alt="" />
              </div>
              <p className={styles.value_of_totalworkspace_product}>
                {selectedOption === "My Dashboard"
                  ? data?.userId?.CX
                  : data?.orgnizationId?.CX}
              </p>
              <SingleValueChart value={"8"} colors={"#FF004C"} size={"80%"} />
            </div>
            <div className={styles.workspace_div}>
              <div className={styles.product_based}>
                <p>Workspaces in Ideadeployer</p>
                <img src={process.env.PUBLIC_URL + "/Images/idea.png"} alt="" />
              </div>
              <p className={styles.value_of_totalworkspace_product}>
                {selectedOption === "My Dashboard"
                  ? data?.userId?.IDEA
                  : data?.orgnizationId?.IDEA}
              </p>
              <SingleValueChart value={"8"} colors={"#3986FE"} size={"80%"} />
            </div>
            <div className={styles.workspace_div}>
              <div className={styles.product_based}>
                <p>Workspaces in Form</p>
                <img src={process.env.PUBLIC_URL + "/Images/idea.png"} alt="" />
              </div>
              <p className={styles.value_of_totalworkspace_product}>
                {selectedOption === "My Dashboard"
                  ? data?.userId?.FORM
                  : data?.orgnizationId?.FORM}
              </p>
              <SingleValueChart value={"8"} colors={"#3986FE"} size={"80%"} />
            </div>
          </div>
          <div className={styles.total_workspace_div}>
            <div className={styles.products_name_div}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M23 11.5C23 17.8513 17.8513 23 11.5 23C5.14873 23 0 17.8513 0 11.5C0 5.14873 5.14873 0 11.5 0C17.8513 0 23 5.14873 23 11.5ZM4.14 11.5C4.14 15.5648 7.43518 18.86 11.5 18.86C15.5648 18.86 18.86 15.5648 18.86 11.5C18.86 7.43518 15.5648 4.14 11.5 4.14C7.43518 4.14 4.14 7.43518 4.14 11.5Z"
                  fill="#8338EC"
                />
              </svg>
              <p>Taskdeployer</p>
            </div>
            <div className={styles.products_name_div}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M23 11.5C23 17.8513 17.8513 23 11.5 23C5.14873 23 0 17.8513 0 11.5C0 5.14873 5.14873 0 11.5 0C17.8513 0 23 5.14873 23 11.5ZM4.14 11.5C4.14 15.5648 7.43518 18.86 11.5 18.86C15.5648 18.86 18.86 15.5648 18.86 11.5C18.86 7.43518 15.5648 4.14 11.5 4.14C7.43518 4.14 4.14 7.43518 4.14 11.5Z"
                  fill="#FF004C"
                />
              </svg>
              <p>CXdeployer</p>
            </div>
            <div className={styles.products_name_div}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M23 11.5C23 17.8513 17.8513 23 11.5 23C5.14873 23 0 17.8513 0 11.5C0 5.14873 5.14873 0 11.5 0C17.8513 0 23 5.14873 23 11.5ZM4.14 11.5C4.14 15.5648 7.43518 18.86 11.5 18.86C15.5648 18.86 18.86 15.5648 18.86 11.5C18.86 7.43518 15.5648 4.14 11.5 4.14C7.43518 4.14 4.14 7.43518 4.14 11.5Z"
                  fill="#3986FE"
                />
              </svg>
              <p>Ideadeployer</p>
            </div>
            <div className={styles.products_name_div}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M23 11.5C23 17.8513 17.8513 23 11.5 23C5.14873 23 0 17.8513 0 11.5C0 5.14873 5.14873 0 11.5 0C17.8513 0 23 5.14873 23 11.5ZM4.14 11.5C4.14 15.5648 7.43518 18.86 11.5 18.86C15.5648 18.86 18.86 15.5648 18.86 11.5C18.86 7.43518 15.5648 4.14 11.5 4.14C7.43518 4.14 4.14 7.43518 4.14 11.5Z"
                  fill="#3986FE"
                />
              </svg>
              <p>Form</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.activity_section_graph}`}>
        <LineChartComponent
          chartData={
            selectedOption === "My Dashboard"
              ? data?.userId
              : data?.orgnizationId
          }
        />
      </div>
      {selectedOption === "My Dashboard" ? (
        <div className={styles.workspace_div_main}>
          <div className={styles.all_workspace_div}>
            <h3>Shared WorkSpace</h3>
            <div className={styles.sharedWorkspace}>
              {sharedWorkspace}
              <p className={styles.value_of_totalworkspace}>
                {data?.sharedWorkSpace?.totalWorkSpace}
              </p>
              <div className={styles.producticons}>
                <div className={styles.Dashboard_product}>
                  <span className={styles.color_box1}></span>
                  <p>
                    Taskdeployer <span>( {data?.sharedWorkSpace?.TASK})</span>
                  </p>
                </div>
                <div className={styles.Dashboard_product}>
                  <span className={styles.color_box2}></span>
                  <p>
                    CXdeployer <span>( {data?.sharedWorkSpace?.CX})</span>
                  </p>
                </div>
                <div className={styles.Dashboard_product}>
                  <span className={styles.color_box3}></span>
                  <p>
                    Form
                    <span>( {data?.sharedWorkSpace?.FORM})</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.all_workspace_div}>
            <h3>Starred workspaces</h3>
            <div className={styles.sharedWorkspace}>
              {sharedWorkspace}
              <p className={styles.value_of_totalworkspace}>
                {data?.staredWorkspace?.totalWorkSpace}
              </p>
              <div className={styles.producticons}>
                <div className={styles.Dashboard_product}>
                  <span className={styles.color_box1}></span>
                  <p>
                    Taskdeployer <span>( {data?.staredWorkspace?.TASK})</span>
                  </p>
                </div>
                <div className={styles.Dashboard_product}>
                  <span className={styles.color_box2}></span>
                  <p>
                    CXdeployer <span>({data?.staredWorkspace?.CX})</span>
                  </p>
                </div>
                <div className={styles.Dashboard_product}>
                  <span className={styles.color_box3}></span>
                  <p>
                    Ideadeployer <span>({data?.staredWorkspace?.IDEA})</span>
                  </p>
                </div>
                <div className={styles.Dashboard_product}>
                  <span className={styles.color_box3}></span>
                  <p>
                    Form <span>({data?.staredWorkspace?.FORM})</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.all_workspace_div}>
            <h3>Trash</h3>
            <div className={styles.sharedWorkspace}>
              {sharedWorkspace}
              <p className={styles.value_of_totalworkspace}>
                {data?.trashWorkspace?.totalWorkSpace}
              </p>
              <div className={styles.producticons}>
                <div className={styles.Dashboard_product}>
                  <span className={styles.color_box1}></span>
                  <p>
                    Taskdeployer <span>({data?.trashWorkspace?.TASK})</span>
                  </p>
                </div>
                <div className={styles.Dashboard_product}>
                  <span className={styles.color_box2}></span>
                  <p>
                    CXdeployer <span>({data?.trashWorkspace?.CX})</span>
                  </p>
                </div>
                <div className={styles.Dashboard_product}>
                  <span className={styles.color_box3}></span>
                  <p>
                    Ideadeployer <span>({data?.trashWorkspace?.IDEA})</span>
                  </p>
                </div>
                <div className={styles.Dashboard_product}>
                  <span className={styles.color_box3}></span>
                  <p>
                    Form <span>({data?.trashWorkspace?.FORM})</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.product_subdata}>
          <div className={styles.all_workspace_div_main}>
            <h3>Total Persona</h3>
            <div className={styles.sharedWorkspace}>
              {sharedWorkspace}
              <p className={styles.value_of_totalworkspaceoverall}>
                {data?.orgnizationId?.personasCount}
              </p>
            </div>
          </div>
          <div className={styles.all_workspace_div_main}>
            <h3>Total Empathy</h3>
            <div className={styles.sharedWorkspace}>
              {sharedWorkspace}
              <p className={styles.value_of_totalworkspaceoverall}>
                {data?.orgnizationId?.empathyCount}
              </p>
            </div>
          </div>
          <div className={styles.all_workspace_div_main}>
            <h3>Total Journy Map</h3>
            <div className={styles.sharedWorkspace}>
              {sharedWorkspace}
              <p className={styles.value_of_totalworkspaceoverall}>
                {data?.orgnizationId?.journyMapCount}
              </p>
            </div>
          </div>
          <div className={styles.all_workspace_div_main}>
            <h3>Total CX Idea</h3>
            <div className={styles.sharedWorkspace}>
              {sharedWorkspace}
              <p className={styles.value_of_totalworkspaceoverall}>
                {data?.orgnizationId?.cxIdeaCount}
              </p>
            </div>
          </div>
          <div className={styles.all_workspace_div_main}>
            <h3>Total Idea of Ideadeployer</h3>
            <div className={styles.sharedWorkspace}>
              {sharedWorkspace}
              <p className={styles.value_of_totalworkspaceoverall}>
                {data?.orgnizationId?.ideasCount}
              </p>
            </div>
          </div>
          <div className={styles.all_workspace_div_main}>
            <h3>Total Challanges of Ideadeployer</h3>
            <div className={styles.sharedWorkspace}>
              {sharedWorkspace}
              <p className={styles.value_of_totalworkspaceoverall}>
                {data?.orgnizationId?.challengeCount}
              </p>
            </div>
          </div>
          <div className={styles.all_workspace_div_main}>
            <h3>Total Boards</h3>
            <div className={styles.sharedWorkspace}>
              {sharedWorkspace}
              <p className={styles.value_of_totalworkspaceoverall}>
                {data?.orgnizationId?.boardsCount}
              </p>
            </div>
          </div>
          <div className={styles.all_workspace_div_main}>
            <h3>Total Users</h3>
            <div className={styles.sharedWorkspace}>
              {sharedWorkspace}
              <p className={styles.value_of_totalworkspaceoverall}>
                {data?.totalUsers}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default dashboardComponent;
