import { BrowserRouter, Route } from "react-router-dom";
import Sidebar from "./component/siderbar/Siderbar";

import FamilyRoutes from "../../routes/FamilyRoutes";
import Topnav from "./component/topnav/TopNav";
const Family = () => {
  return (
    <div>
      {/* <BrowserRouter> */}
      <Route
        render={(props) => (
          <div>
            <Sidebar {...props} />
            <div className="layout__content">
              <Topnav />
              <div className="layout__content-main">
                <FamilyRoutes />
              </div>
            </div>
          </div>
        )}
      />
      {/* </BrowserRouter> */}
    </div>
  );
};

export default Family;
