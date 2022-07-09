import React from "react";
import { Route, Switch } from "react-router";

import Dashboard from "../components/manager/components/dashboard/Dashboard";
import SchoolManager from "../components/manager/components/school/SchoolManager";
import SchoolForm from "../components/manager/components/school/schoolForm/SchoolForm";

import TeacherManager from "../components/manager/components/teacher/teacherManager/TeacherManager";
import TeacherForm from "../components/manager/components/teacher/teacherForm/TeacherForm";

import GradeManager from "./../components/manager/components/grade/gradeManager/GradeManager";
import GradeForm from "../components/manager/components/grade/gradeForm/GradeForm";

import ClassManager from "../components/manager/components/class/classManager/ClassManager";
import ClassForm from "../components/manager/components/class/classForm/ClassForm";

import StudentManager from "../components/manager/components/student/studentManager/StudentManager";
import StudentForm from "../components/manager/components/student/studentForm/StudentForm";
import TransferClass from "./../components/manager/components/student/transferClass/TransferClass";

import SubjectForm from "../components/manager/components/subject/subjectForm/SubjectForm";
import SubjectManager from "../components/manager/components/subject/subjectManager/SubjectManager";

import ContactBookManager from "../components/manager/components/contactBook/contactBookManager/ContactBookManager";
import ContactBookForm from "./../components/manager/components/contactBook/contactBookForm/ContactBookForm";

import ContactBookByClass from "../components/manager/components/contactBook/contactBookByClass/ContactBookByClass";
import ContactBookDetail from "../components/admin/component/contactBook/contactBookDetail/ContactBookDetail";

import YearManager from "../components/manager/components/year/yearManager/YearManager";
import YearForm from "../components/manager/components/year/yearForm/YearForm";

import MarkManager from "../components/manager/components/mark/markManager/MarkManager";

import MarkForm from "../components/manager/components/mark/markFormByContactBook/markForm";
import MarkFormByContactBook from "../components/manager/components/mark/markFormByContactBook/markFormByContactBook";

import Logout from "../components/manager/components/logout/Logout";
import FeeManager from "./../components/manager/components/fee/feeManager/FeeManager";
import FeeFormDetail from "../components/manager/components/fee/feeForm/FeeFormDetail";
import FeeForm from "../components/manager/components/fee/feeForm/FeeFormByGrade";

import NotificationManager from "./../components/manager/components/notification/notificationManager/NotificationManager";
import NotificationForm from "./../components/manager/components/notification/notificationForm/NotificationForm";
import ExtraManager from "../components/manager/components/extra/extraManager/ExtraManager";
import ExtraForm from "./../components/manager/components/extra/extraForm/ExtraForm";
import FamilyManager from "./../components/manager/components/family/familyManager/FamilyManager";
import FamilyForm from "./../components/manager/components/family/familyForm/FamilyForm";
import ProfileManager from "./../components/manager/components/profile/Profile";
import ChangePassword from "./../components/manager/components/teacher/changePassword/ChangePassword";
import CourseManager from "./../components/manager/components/course/courseManager/CourseManager";
import CourseForm from "../components/manager/components/course/courseForm/CourseForm";
const ManagerRoutes = () => {
  return (
    <Switch>
      <Route path="/manager" exact component={NotificationManager} />
      <Route path="/manager/logout" component={Logout} />

      <Route path="/manager/profile" component={ProfileManager} />

      <Route path="/manager/school" exact component={SchoolManager} />
      <Route path="/manager/school/add" component={SchoolForm} />
      <Route path="/manager/school/:id" component={SchoolForm} />

      <Route path="/manager/teacher" exact component={TeacherManager} />
      <Route path="/manager/teacher/add" component={TeacherForm} />
      <Route path="/manager/teacher/:id" component={TeacherForm} />
      <Route path="/manager/change-password" component={ChangePassword} />

      <Route path="/manager/grade" exact component={GradeManager} />
      <Route path="/manager/grade/add" component={GradeForm} />
      <Route path="/manager/grade/:id" component={GradeForm} />

      <Route path="/manager/class" exact component={ClassManager} />
      <Route path="/manager/class/add" component={ClassForm} />
      <Route path="/manager/class/:id" component={ClassForm} />

      <Route path="/manager/student" exact component={StudentManager} />
      <Route path="/manager/student/add" component={StudentForm} />

      <Route path="/manager/student/transfer" component={TransferClass} />
      <Route
        path="manager/list-of-students-by-class/:id"
        component={StudentManager}
      />
      <Route path="/manager/student/:id" component={StudentForm} />

      <Route path="/manager/extra" exact component={ExtraManager} />
      <Route path="/manager/extra/add" component={ExtraForm} />
      <Route path="/manager/extra/:id" component={ExtraForm} />

      <Route
        path="/manager/notification"
        exact
        component={NotificationManager}
      />
      <Route path="/manager/notification/add" component={NotificationForm} />
      <Route path="/manager/notification/:id" component={NotificationForm} />

      <Route path="/manager/subject" exact component={SubjectManager} />
      <Route path="/manager/subject/add" component={SubjectForm} />
      <Route path="/manager/subject/:id" component={SubjectForm} />

      <Route path="/manager/course" exact component={CourseManager} />
      <Route path="/manager/course/add" component={CourseForm} />

      <Route path="/manager/contactBook" exact component={ContactBookManager} />
      <Route
        path="/manager/contactBook/addByClass"
        component={ContactBookByClass}
      />
      <Route
        path="/manager/contactBook/addByStudent"
        component={ContactBookForm}
      />
      <Route path="/manager/contactBook/:id" component={ContactBookManager} />

      <Route path="/manager/schoolYear" exact component={YearManager} />
      <Route path="/manager/schoolYear/add" component={YearForm} />

      <Route path="/manager/mark" exact component={MarkManager} />
      <Route
        path="/manager/mark/add-by-contact-book/:id"
        component={MarkFormByContactBook}
      />
      <Route path="/manager/mark/add" component={MarkForm} />
      <Route path="/manager/mark/:id" component={MarkForm} />
      <Route path="/manager/list-mark/:id" component={MarkManager} />

      <Route path="/manager/family" exact component={FamilyManager} />
      <Route path="/manager/family/add" component={FamilyForm} />
      <Route path="/manager/family/:id" component={FamilyForm} />

      <Route path="/manager/fee" exact component={FeeManager} />
      <Route path="/manager/fee/add-by-grade" component={FeeForm} />
      <Route path="/manager/fee/add" component={FeeFormDetail} />
      <Route path="/manager/fee/:id" component={FeeFormDetail} />
    </Switch>
  );
};

export default ManagerRoutes;
