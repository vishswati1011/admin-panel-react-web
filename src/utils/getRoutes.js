import { task, cx, idea, form } from "./routes";
export const handleRoute = (data) => {
  const newTab = window.open("about:blank", "_blank");
  const routes = {
    1: `${task}/workspace/${data._id}`,
    4: `${idea}/challenges/${data.name}/${data._id}`,
    3: `${cx}?mode=create&workspacrId=${data._id}`,
    5: `${form}/workspace/${data._id}`,
  };
  if (routes[data.appId]) {
    newTab.location.href = `http://${routes[data.appId]}`;
  }
};
