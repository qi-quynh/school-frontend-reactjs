import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { logout } from "../../services/auth-service";
import { Link } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    history.push("/logout");
    return () => {
      return [];
    };
  }, [dispatch]);

  return <div>Tranfer</div>;
};

export default Logout;
