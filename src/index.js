import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { HelmetProvider } from "react-helmet-async";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import AlertTemplate from "react-alert-template-basic";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

const options = {
  position: positions.TOP_RIGHT,
  timeout: 3000,
  offset: "10px",
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 10000000000,
  },
};
ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AlertProvider>
  </Provider>,
  document.getElementById("root"),
);

reportWebVitals();
