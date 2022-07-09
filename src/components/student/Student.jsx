import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Sidebar from "../student/component/siderbar/Siderbar";
import TopNav from "../student/component/topnav/TopNav";
import StudentRoutes from "../../routes/StudentRoutes";
import { useSelector } from "react-redux";
import Routes from "../../routes/Routes";
const Student = () => {
  let isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    console.log(isLogin);
    console.log(localStorage.getItem("isLoggedIn"));
    //var isLogin = localStorage.getItem("isLoggedIn");
  }, []);
  return (
    <div>
      <Route
        render={(props) => (
          <div>
            <Sidebar {...props} />
            <div className="layout__content">
              <TopNav />
              <div className="layout__content-main">
                <StudentRoutes />
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Student;
