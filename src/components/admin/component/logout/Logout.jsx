import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../../../services/auth-service";

const Logout = () => {
  console.log("logout");
  const history = useHistory();
  const dispatch = useDispatch();
  history.push("/");
  useEffect(() => {
    dispatch(logout());

    console.log("đã logout");
    return () => {
      return [];
    };
  }, [dispatch, history]);

  return <div></div>;
};

export default Logout;
