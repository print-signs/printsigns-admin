import React, { Component, Suspense } from "react";
import axios from "axios";
import { Router, Route, Routes, HashRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "./scss/style.scss";
import ForgotPassword from "./views/pages/register/ForgotPassword";
import NewRegister from "./views/pages/register/NewRegister";
// import ProtectedRoute from './components/ProtectedRoute';
import { isAutheticated } from "./auth";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
// import EditProducts from './views/Commerce/Editproducts'
// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() =>
  import("./views/pages/register/Change_password")
);
const Page404 = React.lazy(() =>
  import("./views/pages/register/page404/Page404")
);
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  const [userdata, setUserData] = useState(null);
  const token = isAutheticated();

  useEffect(() => {
    const getUser = async () => {
      let existanceData = localStorage.getItem("authToken");
      if (!existanceData) {
        // console.log(existanceData.userData)
        setUserData(false);
      } else {
        try {
          // console.log('requesting user data from server')
          let response = await axios.get(`/api/v1/user/details`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log(response.data)
          const data = response.data;
          if (data.success && data.user.role === "admin") {
            setUserData(data.user);
          } else {
            setUserData(false);
          }
        } catch (err) {
          setUserData(false);
          console.log(err);
        }
      }
    };
    getUser();
  }, []);

  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/" name="Login Page" element={<Login />} />
          <Route
            exact
            path="/register"
            name="Register Page"
            element={<NewRegister />}
          />
          <Route
            exact
            path="/password/forgot"
            name="Forgot Page"
            element={<ForgotPassword />}
          />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />

          <Route
            path="/"
            name="Home"
            element={
              userdata?.role === "admin" ? (
                <DefaultLayout />
              ) : userdata === false ? (
                <Login />
              ) : (
                <div></div>
              )
            }
          />

          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
        <Toaster />
      </Suspense>
    </HashRouter>
  );
};
export default App;
