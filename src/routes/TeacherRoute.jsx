import React from "react";
import { Route, Switch } from "react-router";
import ClassManager from "../components/teacher/component/class/classManager/ClassManager";
import ContactBookForm from "../components/teacher/component/contactBook/contactBookForm/ContactBookForm";
import MarkForm from "../components/teacher/component/mark/markFormByContactBook/markForm";
import MarkManager from "../components/teacher/component/mark/markManager/MarkManager";
import StudentForm from "../components/teacher/component/student/studentForm/StudentForm";
import StudentManager from "../components/teacher/component/student/studentManager/StudentManager";
import ChangePassword from "../components/teacher/component/teacher/changePassword/ChangePassword";
import Dashboard from "./../components/manager/components/dashboard/Dashboard";
import ContactBookManager from "./../components/teacher/component/contactBook/contactBookManager/ContactBookManager";
import MarkFormByContactBook from "./../components/teacher/component/mark/markFormByContactBook/markFormByContactBook";
import TeacherForm from "./../components/teacher/component/teacher/teacherForm/TeacherForm";
import Logout from "./../components/teacher/component/logout/Logout";
import NotificationManager from "./../components/teacher/component/notification/notificationManager/NotificationManager";
import NotificationForm from "./../components/teacher/component/notification/notificationForm/NotificationForm";
import MarkTeachingManager from "../components/teacher/component/mark/markManager/MarkTeachingManager";

const TeacherRoutes = () => {
  return (
    <Switch>
      <Route path="/teacher" exact component={NotificationManager} />
      <Route path="/teacher/class" exact component={ClassManager} />
      <Route path="/teacher/logout" component={Logout} />
      <Route path="/teacher/student" exact component={StudentManager} />
      <Route path="/teacher/student/:id" component={StudentForm} />
      <Route path="/teacher/contactBook" exact component={ContactBookManager} />
      <Route
        path="/teacher/contactBook/addByStudent"
        component={ContactBookForm}
      />
      <Route path="/teacher/contactBook/:id" component={ContactBookForm} />
      <Route path="/teacher/mark" exact component={MarkManager} />
      <Route
        path="/teacher/mark/add-by-contact-book/:id"
        component={MarkFormByContactBook}
      />
      <Route path="/teacher/mark/add" component={MarkForm} />

      <Route path="/teacher/mark/:id" component={MarkForm} />
      <Route path="/teacher/mark-class/:id" component={MarkTeachingManager} />
      <Route path="/teacher/list-mark/:id" component={MarkManager} />
      <Route path="/teacher/profile/:id" component={TeacherForm} />
      <Route path="/teacher/change-password" component={ChangePassword} />

      {/* <Route
        path="manager/list-of-students-by-class/:id"
        component={}
      /> */}

      <Route
        path="/teacher/notification"
        exact
        component={NotificationManager}
      />
      <Route path="/teacher/notification/add" component={NotificationForm} />
      <Route path="/teacher/notification/:id" component={NotificationForm} />
    </Switch>
  );
};
export default TeacherRoutes;
