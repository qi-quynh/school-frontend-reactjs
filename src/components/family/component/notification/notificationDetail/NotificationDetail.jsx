import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationById,
  resetNotification,
  addNotification,
  updateNotification,
} from "../../../../../services/notification-service";
import { getAllExtra } from "../../../../../services/extra-service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";
import { SelectField } from "../../../../formik/SelectField";
import { getAllSchool } from "../../../../../services/school-service";
import { Multiline12Field } from "../../../../formik/MultilineText12";

const NotificationDetail = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;

  const history = useHistory();
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.notification);

  console.log(notification);
  useEffect(() => {
    dispatch(getNotificationById(id));

    return () => {
      return [];
    };
  }, [dispatch, id]);

  const handleBack = () => {
    history.push("/admin/notification");
  };

  return (
    <div>
      <hr />
      <h3>{notification.title}</h3>
      <h4 className="">Đối tượng : {notification.schoolId}</h4>
      <h5>Mô tả</h5>
      <div>{notification.description}</div>
      <hr />
    </div>
  );
};

export default NotificationDetail;
