import ManagerRoutes from "../../routes/ManagerRoutes";
import { BrowserRouter, Route } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import TopNav from "../manager/components/topnav/TopNav";

import Routes from "../../routes/Routes";
import SidebarManager from "./components/sidebar/Sidebar";
import LoginPage from "./../../pages/LoginPage";

const Manager = () => {
  let isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    console.log("Manager");

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
              <SidebarManager {...props} />
              <div className="layout__content">
                <TopNav />
                <div className="layout__content-main">
                  <ManagerRoutes />
                </div>
              </div>
            </div>
          </div>
        )}
      />
      {/* </BrowserRouter> */}
    </div>
  );
};

export default Manager;
