import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import { TextField } from "../../../formik/TextField";
import { SelectField } from "../../../formik/SelectField";
import {
  addTeacher,
  getTeacherById,
  resetTeacher,
  updateTeacher,
} from "./../../../../services/teacher-service";

const Profile = () => {
  let id = localStorage.getItem("username");
  console.log("id " + id);
  if (id == null) id = -1;
  const [title, setTitle] = useState("Thêm giáo viên");
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.teacher.error);
  const teacher = useSelector((state) => state.teacher.teacher);

  console.log(teacher);
  const initialValues = {
    id: "",
    name: "",
    roleId: "",
    schoolId: "",
    cmnd: "",
    salary: "",
    status: "",
    email: "",
    phone: "",
    address: "",
  };
  const roles = [
    { id: "TEACHER", name: "GIÁO VIÊN" },
    { id: "ADMIN", name: "QUẢN TRỊ VIÊN" },
  ];

  useEffect(() => {
    const loadTeacherEdit = () => {
      dispatch(resetTeacher());
      if (id !== -1) {
        dispatch(getTeacherById(`/teacher/admin/${id}`));
        console.log(teacher);
        setTitle("Thông tin giáo viên ");
      }
    };
    loadTeacherEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);

  const handleBack = () => {
    history.push("/admin/teacher");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.name = values.name;
    params.roleId = values.roleId ?? "TEACHER";

    params.cmnd = values.cmnd;
    params.status = values.status;
    params.salary = values.salary;
    params.address = values.address;
    params.email = values.email;
    params.phone = values.phone;

    console.log(values);
    if (id === -1) {
      params.id = values.id;
      dispatch(addTeacher("/teacher/admin", params, history));
      console.log("add");
    } else {
      params.id = id;
      console.log(params);
      dispatch(updateTeacher("/teacher/admin", params, history));
      console.log("update");
    }
  };
  const validate = Yup.object({
    name: Yup.string()
      .required("Vui lòng nhập tên giáo viên")
      .max(100, "Địa chỉ nhập tối đa 100 kí tự")
      .matches(/[^!@#$%^&()-=+{};:,<.>]/, "Tên không chứa kí tự đặc biệt"),
    id: Yup.string().required("Vui lòng nhập Id giáo viên"),
    email: Yup.string().required("Vui lòng nhập email"),

    cmnd: Yup.string()
      .required("Vui lòng nhập số CMND/CCCD")
      .matches(/[0-9]/, "Vui lòng nhập số CMND/CCCD"),
    address: Yup.string().max(100, "Địa chỉ nhập tối đa 100 kí tự"),
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
          <h4 className="my-4 font-weight-bold text-info">
            Quản lý hồ sơ của tôi
          </h4>

          {error ? (
            <div className="alert alert-danger col-6" role="alert">
              {error}
            </div>
          ) : null}
          <Form>
            <div className="row">
              {id === -1 ? (
                <TextField label="Id*" name="id" type="text" />
              ) : (
                <TextField label="Id" name="id" type="text" readonly="" />
              )}
              <TextField label="Tên* " name="name" type="text" />
            </div>
            <div className="row">
              <TextField label="CMND/CCCD*" name="cmnd" type="text" />
              <TextField label="Email*" name="email" type="text" />
            </div>
            <div className="row">
              <TextField label="Địa chỉ" name="address" type="text" />
              <SelectField label="Quyền" name="roleId">
                {roles.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </SelectField>
            </div>
            <div className="row">
              <TextField label="Trạng thái" name="status" type="text" />
              <TextField label="SĐT" name="phone" type="text" />
            </div>
            <div className="row">
              <TextField label="Lương" name="salary" type="number" />
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

      <div className="container">
        <hr />
        <h4 className="font-weight-bold text-info">Bảo mật</h4>
        <Link to={"/admin/change-password"}>
          <button className="btn-a btn btn-info mr-10">Đổi mật khẩu</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
