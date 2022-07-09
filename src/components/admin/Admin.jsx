import AdminRoutes from "../../routes/AdminRoutes";
import { BrowserRouter, Route } from "react-router-dom";
import Sidebar from "../admin/component/sidebar/Sidebar";
import TopNav from "../admin/component/topnav/TopNav";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Routes from "../../routes/Routes";
import LoginPage from "../../pages/LoginPage";
const Admin = () => {
  let isLogin = useSelector((state) => state.auth.isLogin);
  console.log("Admin");
  useEffect(() => {
    console.log(isLogin);
    console.log(localStorage.getItem("isLoggedIn"));
    //var isLogin = localStorage.getItem("isLoggedIn");
  }, []);
  return (
    <div>
      {/* <BrowserRouter> */}
      <Route
        render={(props) => (
          <div>
            <div>
              {console.log(props)}
              <Sidebar {...props} />

              <div className="layout__content">
                <TopNav /> :
                <div className="layout__content-main">
                  <AdminRoutes />
                </div>
              </div>
            </div>
            {/* ) : (
                <LoginPage />
              )} */}
          </div>
        )}
      />
      {/* </BrowserRouter> */}
    </div>
  );
};

export default Admin;
