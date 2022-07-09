import schoolReducer from "./schoolReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import teacherReducer from "./teacherReducer";
import gradeReducer from "./gradeReducer";
import classReducer from "./classReducer";
import studentReducer from "./studentReducer";
import extraReducer from "./extraReducer";
import notificationReducer from "./notificationReducer";
import yearReducer from "./yearReducer";
import subjectReducer from "./subjectReducer";
import contactBookReducer from "./contactBookReducer";
import markReducer from "./markReducer";
import familyReducer from "./familyReducer";
import feeReducer from "./feeReducer";
import courseReducer from "./courseReducer";
import { combineReducers } from "redux";
import markTeacherReducer from "./markTeacherReducer";

const rootReducer = combineReducers({
  school: schoolReducer,
  grade: gradeReducer,
  class: classReducer,
  auth: authReducer,
  user: userReducer,
  teacher: teacherReducer,
  student: studentReducer,
  notification: notificationReducer,
  extra: extraReducer,
  year: yearReducer,
  subject: subjectReducer,
  course: courseReducer,
  contactBook: contactBookReducer,
  mark: markReducer,
  markTeacher: markTeacherReducer,
  fee: feeReducer,
  family: familyReducer,
});

export default rootReducer;
