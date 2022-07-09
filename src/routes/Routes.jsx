import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";

import AdminPage from "../pages/AdminPage";
import StudentPage from "../pages/StudentPage";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";

// import DefaultLayout from '../layout/DefaultLayout'
import ManagerPage from "../pages/ManagerPage";
import TeacherPage from "./../pages/TeacherPage";
import FamilyPage from "./../pages/FamilyPage";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" exact component={LoginPage} />
      <Route path="/" exact component={LoginPage} />
      <Route path="/logout" exact component={LogoutPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/teacher" component={TeacherPage} />
      <Route path="/family" component={FamilyPage} />
      <Route path="/manager" component={ManagerPage} />
      <Route path="/student" component={StudentPage} />
      <Route path="/forgetPassword" component={ForgetPasswordPage} />
    </Switch>
  );
};

export default Routes;
