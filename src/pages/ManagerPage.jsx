import React, { useEffect, useState } from "react";

import Manager from "../../src/components/manager/Manager";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const ManagerPage = () => {
  const [access, setAccess] = useState(false);
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("Manager Page");
  useEffect(() => {
    const checkAccess = async () => {
      var role = localStorage.getItem("role");
      const isLogin = localStorage.getItem("isLoggedIn");
      if (!(isLoggedIn || isLogin)) {
        history.push("/login");
      } else if (role !== "MANAGER") {
        alert("Bạn không có quyền truy cập tài nguyên này!");
        history.push("/");
      } else {
        setAccess(true);
      }
    };
    checkAccess();
    return () => {};
  }, []);
  return access ? <Manager /> : null;

  // return(

  //     <Admin/>

  //  )
};
export default ManagerPage;
