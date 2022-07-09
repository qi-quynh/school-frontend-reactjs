import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  updateStudent,
  changePassword,
} from "../../../../services/student-service";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../formik/TextField";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  let id = localStorage.getItem("username");
  const [title, setTitle] = useState("Đổi mật khẩu");
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.student.error);
  const teacher = useSelector((state) => state.student.teacher);

  console.log(teacher);
  const initialValues = {
    oldPassword: "",
    newPassword: "",
  };

  const handleBack = () => {
    history.push("/student");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.oldPassword = values.oldPassword;
    params.newPassword = values.newPassword;
    params.id = id;
    dispatch(changePassword("/student/change-password", params, history));
    console.log("update");
  };
  const validate = Yup.object({
    oldPassword: Yup.string()
      .required("Vui lòng nhập mật khẩu hiện tại")
      .min(6, "Vui lòng nhập tối thiểu 6 kí tự")
      .max(100, "Vui lòng nhập tối đa 100 kí tự")
      .matches(/[0-9a-zA-Z]/, "Vui lòng không nhập kí tự đặc biệt"),
    newPassword: Yup.string()
      .required("Vui lòng nhập mật khẩu mới")
      .min(6, "Vui lòng nhập tối thiểu 6 kí tự")
      .max(15, "Địa chỉ nhập tối đa 100 kí tự")
      .matches(/[0-9a-zA-Z]/, "Vui lòng không chứa kí tự đặc biệt"),
  });

  return (
    <div>
      <hr />
      <Formik
        initialValues={teacher || initialValues}
        validationSchema={validate}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize
      >
        <div className="container text-center">
          <h4 className="my-4 font-weight-bold text-info">{title}</h4>

          {error ? (
            <div className="alert alert-danger col-6" role="alert">
              {error}
            </div>
          ) : null}
          <Form>
            <div className="row">
              <TextField
                label="Mật khẩu hiện tại"
                name="oldPassword"
                type="password"
              />

              <TextField
                label="Mật khẩu mới"
                name="newPassword"
                type="password"
              />
            </div>

            <div className="row ">
              <div className="col-md-6">
                <button
                  className="btn btn-success mt-3 float-sm-right"
                  type="submit"
                >
                  Lưu
                </button>
              </div>
              <div className="col-md-6">
                <button
                  className="btn btn-dark mt-3 float-sm-left"
                  type="button"
                  onClick={handleBack}
                >
                  Hủy
                </button>
              </div>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default ChangePassword;
