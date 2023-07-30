import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-app-polyfill/stable";
import "core-js";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import axios from "axios";
import { store } from "./redux/store";
import { cibGmail } from "@coreui/icons";

const setupAxios = () => {
  //axios.defaults.baseURL = 'https://bolo-api.checkapp.one/'
  //axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.baseURL = "https://boloai-api.onrender.com"; //->USE THIS

  axios.defaults.headers = {
    "Cache-Control": "no-cache,no-store",
    Pragma: "no-cache",
    Expires: "0",
  };
};

setupAxios();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
