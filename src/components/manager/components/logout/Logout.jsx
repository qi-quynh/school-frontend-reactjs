import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../../../services/auth-service";

const Logout = () => {
  console.log("logout");
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    history.push("/");

    console.log("đã logout");
    return () => {
      return [];
    };
  }, [dispatch]);

  return <div>Transfer</div>;
};

export default Logout;
