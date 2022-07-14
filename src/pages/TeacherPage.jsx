import React, { useEffect, useState } from "react";
import Student from "../components/student/Student";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import Teacher from "../components/teacher/Teacher";

const TeacherPage = () => {
  const [access, setAccess] = useState(false);
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const checkAccess = async () => {
      const role = localStorage.getItem("role");
      const isLogin = localStorage.getItem("isLoggedIn");
      if (!(isLoggedIn || isLogin)) {
        history.push("/login");
      } else if (role !== "TEACHER") {
        alert("Bạn không có quyền truy cập tài nguyên này!");
        history.push("/");
      } else {
        setAccess(true);
      }
    };
    checkAccess();
    return () => {};
  }, []);
  return access ? <Teacher /> : null;

  // return(

  //     <Admin/>

  //  )
};
export default TeacherPage;
