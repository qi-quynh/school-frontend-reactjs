import React from "react";
import { Route, Switch } from "react-router-dom";
import NotificationManager from "../components/family/component/notification/notification/NotificationRequest";
import NotificationForm from "./../components/family/component/notification/notificationForm/NotificationForm";
import Logout from "./../components/family/component/logout/Logout";
import ContactBook from "../components/family/component/contactBook/ContactBook";
import FeeFamily from "./../components/family/component/fee/Fee";

const FamilyRoutes = () => {
  return (
    <Switch>
      <Route path="/family" exact component={NotificationManager} />
      <Route
        path="/family/notification-request"
        exact
        component={NotificationManager}
      />
      <Route path="/family/contactBook" exact component={ContactBook} />
      <Route path="/family/fee" exact component={FeeFamily} />
      <Route path="/family/contactBook/:id" component={ContactBook} />
      <Route
        path="/family/notification/add"
        exact
        component={NotificationForm}
      />
      <Route path="/family/logout" exact component={Logout} />
    </Switch>
  );
};
export default FamilyRoutes;
