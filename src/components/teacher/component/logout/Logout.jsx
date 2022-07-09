import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../../../services/auth-service";

import Routes from "../../../../routes/Routes";
import { Link } from "react-router-dom";
import {
  BrowserRouter,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import App from "../../../../App";

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
