import React from "react";
import { Route, Switch } from "react-router";

import MarkManager from "../components/student/component/mark/markManager/MarkManager";
import ContactBook from "../components/student/component/contactBook/ContactBook";
import Notification from "../components/student/component/notification/notification/Notification";
import NotificationDetail from "../components/student/component/notification/notificationDetail/NotificationDetail";
import Logout from "../components/student/component/logout/Logout";
import Profile from "../components/student/component/profile/Profile";
import ChangePassword from "../components/student/component/changePassword/ChangePassword";
import Fee from "../components/student/component/fee/Fee";
import NotificationForm from "../components/student/component/notification/notificationForm/NotificationForm";
import MarkManagerByContactBook from "../components/student/component/mark/markManagerByContactBook/MarkManagerByContactBook";
const StudentRoutes = () => {
  return (
    <Switch>
      <Route path="/student" exact component={Notification} />
      <Route path="/student/mark" exact component={MarkManager} />
      <Route
        path="/student/mark-by-contact-book/:id"
        component={MarkManagerByContactBook}
      />

      <Route path="/student/contactBook" exact component={ContactBook} />
      <Route path="/student/logout" component={Logout} />

      <Route path="/student/notification" exact component={Notification} />
      <Route path="/student/notification/add" component={NotificationForm} />
      <Route path="/student/notification/:id" component={NotificationDetail} />

      <Route path="/student/profile" component={Profile} />
      <Route path="/student/fee" component={Fee} />
      <Route path="/student/change-password" component={ChangePassword} />
    </Switch>
  );
};
export default StudentRoutes;
