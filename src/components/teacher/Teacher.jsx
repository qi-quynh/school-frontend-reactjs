import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Sidebar from "./component/sidebar/Sidebar";
import TopNav from "../teacher/component/topnav/TopNav";
import TeacherRoutes from "../../routes/TeacherRoute";

const Teacher = () => {
  
  
  return (
    <div>
      {/* <BrowserRouter> */}
      <Route
        render={(props) => (
          <div>
            <div>
              <Sidebar {...props} />
              <div className="layout__content">
                <TopNav />
                <div className="layout__content-main">
                  <TeacherRoutes />
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

export default Teacher;
