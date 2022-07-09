import React from "react";
import { Route, Switch } from "react-router";

import Dashboard from "../components/admin/component/dashboard/Dashboard";

import SchoolManager from "../components/manager/components/school/SchoolManager";
import SchoolForm from "../components/admin/component/school/schoolForm/SchoolForm";
import Logout from "../components/admin/component/logout/Logout";

import TeacherManager from "../components/admin/component/teacher/teacherManager/TeacherManager";
import TeacherForm from "../components/admin/component/teacher/teacherForm/TeacherForm";
import ChangePassword from "../components/admin/component/teacher/changePassword/ChangePassword";

import GradeManager from "../components/admin/component/grade/gradeManager/GradeManager";
import GradeForm from "../components/admin/component/grade/gradeForm/GradeForm";

import ClassManager from "../components/admin/component/class/classManager/ClassManager";
import ClassForm from "../components/admin/component/class/classForm/ClassForm";

import StudentManager from "../components/admin/component/student/studentManager/StudentManager";
import StudentForm from "../components/admin/component/student/studentForm/StudentForm";
import TransferClass from "../components/admin/component/student/transferClass/TransferClass";

import ExtraManager from "../components/admin/component/extra/extraManager/ExtraManager";
import ExtraForm from "../components/admin/component/extra/extraForm/ExtraForm";

import NotificationManager from "../components/admin/component/notification/notificationManager/NotificationManager";
import NotificationForm from "../components/admin/component/notification/notificationForm/NotificationForm";

import SubjectManager from "../components/admin/component/subject/subjectManager/SubjectManager";
import SubjectForm from "../components/admin/component/subject/subjectForm/SubjectForm";

import ContactBookManager from "../components/admin/component/contactBook/contactBookManager/ContactBookManager";
import ContactBookForm from "../components/admin/component/contactBook/contactBookForm/ContactBookForm";
import ContactBookByClass from "../components/admin/component/contactBook/contactBookByClass/ContactBookByClass";
import ContactBookDetail from "../components/admin/component/contactBook/contactBookDetail/ContactBookDetail";

import YearManager from "../components/admin/component/year/yearManager/YearManager";
import YearForm from "../components/admin/component/year/yearForm/YearForm";

import MarkManager from "../components/admin/component/mark/markManager/MarkManager";
import MarkFormByContactBook from "../components/admin/component/mark/markFormByContactBook/markFormByContactBook";
import MarkForm from "../components/admin/component/mark/markFormByContactBook/markForm";

import LoginPage from "../pages/LoginPage";
import FamilyManager from "../components/admin/component/family/familyManager/FamilyManager";
import FamilyForm from "../components/admin/component/family/familyForm/FamilyForm";

import FeeManager from "../components/admin/component/fee/feeManager/FeeManager";
import FeeForm from "../components/admin/component/fee/feeForm/FeeFormByGrade";
import FeeFormDetail from "../components/admin/component/fee/feeForm/FeeFormDetail";
import App from "../App";
import AdminPage from "./../pages/AdminPage";
import CourseManager from "../components/admin/component/course/courseManager/CourseManager";
import CourseForm from "./../components/admin/component/course/courseForm/CourseForm";
import Profile from "./../components/admin/component/profile/Profile";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route path="/admin" exact component={NotificationManager} />
      <Route path="/admin/logout" component={Logout} />
      {/* //<Route path="/" component={AdminPage} /> */}
      <Route path="/admin/profile" component={Profile} />
      <Route path="/admin/school" exact component={SchoolManager} />

      <Route path="/admin/school/add" component={SchoolForm} />
      <Route path="/admin/school/:id" component={SchoolForm} />

      <Route path="/admin/teacher" exact component={TeacherManager} />
      <Route path="/admin/teacher/add" component={TeacherForm} />
      <Route path="/admin/teacher/:id" component={TeacherForm} />
      <Route path="/admin/change-password" component={ChangePassword} />

      <Route path="/admin/grade" exact component={GradeManager} />
      <Route path="/admin/grade/add" component={GradeForm} />
      <Route path="/admin/grade/:id" component={GradeForm} />

      <Route path="/admin/class" exact component={ClassManager} />
      <Route path="/admin/class/add" component={ClassForm} />
      <Route path="/admin/class/:id" component={ClassForm} />

      <Route path="/admin/student" exact component={StudentManager} />
      <Route path="/admin/student/add" component={StudentForm} />

      <Route path="/admin/student/transfer" component={TransferClass} />
      <Route
        path="/admin/list-of-students-by-class/:id"
        component={StudentManager}
      />
      <Route path="/admin/student/:id" component={StudentForm} />

      <Route path="/admin/extra" exact component={ExtraManager} />
      <Route path="/admin/extra/add" component={ExtraForm} />
      <Route path="/admin/extra/:id" component={ExtraForm} />

      <Route path="/admin/notification" exact component={NotificationManager} />
      <Route path="/admin/notification/add" component={NotificationForm} />
      <Route path="/admin/notification/:id" component={NotificationForm} />

      <Route path="/admin/subject" exact component={SubjectManager} />
      <Route path="/admin/subject/add" component={SubjectForm} />
      <Route path="/admin/subject/:id" component={SubjectForm} />

      <Route path="/admin/course" exact component={CourseManager} />
      <Route path="/admin/course/add" component={CourseForm} />
      <Route path="/admin/course/:id" component={CourseForm} />

      <Route path="/admin/contactBook" exact component={ContactBookManager} />
      <Route
        path="/admin/contactBook/addByClass"
        component={ContactBookByClass}
      />
      <Route
        path="/admin/contactBook/addByStudent"
        component={ContactBookForm}
      />
      <Route path="/admin/contactBook/:id" component={ContactBookManager} />

      <Route path="/admin/schoolYear" exact component={YearManager} />
      <Route path="/admin/schoolYear/add" component={YearForm} />

      <Route path="/admin/mark" exact component={MarkManager} />
      <Route
        path="/admin/mark/add-by-contact-book/:id"
        component={MarkFormByContactBook}
      />
      <Route path="/admin/mark/add" component={MarkForm} />
      <Route path="/admin/mark/:id" component={MarkForm} />
      <Route path="/admin/list-mark/:id" component={MarkManager} />

      <Route path="/admin/family" exact component={FamilyManager} />
      <Route path="/admin/family/add" component={FamilyForm} />
      <Route path="/admin/family/:id" component={FamilyForm} />

      <Route path="/admin/fee" exact component={FeeManager} />
      <Route path="/admin/fee/add-by-grade" component={FeeForm} />
      <Route path="/admin/fee/add" component={FeeFormDetail} />
      <Route path="/admin/fee/:id" component={FeeFormDetail} />
    </Switch>
  );
};

export default AdminRoutes;
