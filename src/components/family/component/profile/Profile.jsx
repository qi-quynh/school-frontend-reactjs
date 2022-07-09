import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentById,
  resetStudent,
  addStudent,
  updateStudent,
} from "../../../../services/student-service";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../formik/TextField";

const StudentForm = () => {
  const studentId = localStorage.getItem("username");
  const [title, setTitle] = useState("Thông tin học sinh");
  const history = useHistory();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.student.student);
  const error = useSelector((state) => state.student.error);

  console.log(student);
  const initialValues = {
    id: "",
    name: "",
    roleId: "",
    classId: "",
    className: "",
    teacherId: "",
    cmndFamily: "",
    phone: "",
    email: "",
    address: "",
  };

  useEffect(() => {
    dispatch(resetStudent());
    dispatch(getStudentById('/student'));
  }, [dispatch]);

  const handleBack = () => {
    history.push("/student");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.name = values.name;
    params.phone = values.phone;
    params.address = values.address;
    params.email = values.email;

    params.id = studentId;
    console.log(params);
    dispatch(updateStudent(params, history));
  };

  const validate = Yup.object({
    name: Yup.string()
      .required("Vui lòng nhập tên học sinh")
      .max(100, "Địa chỉ nhập tối đa 100 kí tự")
      .matches(/[^!@#$%^&()-=+{};:,<.>]+$/, "Tên không chứa kí tự đặc biệt"),
    id: Yup.string().required("Vui lòng nhập Id"),
    classId: Yup.string().required("Vui lòng nhập lớp học"),
    //email : Yup.string().required("Vui lòng nhập email"),
    //schoolId : Yup.string().required("Vui lòng nhập mã trường"),
    //cmndFamily : Yup.string().required("Vui lòng nhập số CMND/CCCD"),
    //address : Yup.string().max(100, "Địa chỉ nhập tối đa 100 kí tự")
  });

  return (
    <div>
      <hr />
      <Formik
        initialValues={student || initialValues}
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
              <TextField label="Id" name="id" type="text" readonly="" />

              <TextField label="Tên " name="name" type="text" readonly="" />
            </div>
            <div className="row">
              <TextField label="Lớp" name="className" type="text" readonly="" />
              <TextField
                label="Phụ huynh"
                name="cmndFamily"
                type="text"
                readonly=""
              />
            </div>

            <div className="row">
              <TextField label="SĐT" name="phone" type="text" />
              <TextField label="Địa chỉ" name="address" type="text" />
            </div>
            <div className="row">
              {/* <label htmlFor="status">Còn học</label>
              <input
                type="checkbox"
                id="status"
                name="status"
                value="true"
              ></input> */}
              <TextField label="email " name="email" type="text" readonly="" />

              <TextField label="Trạng thái" name="status" type="" readonly="" />
            </div>

            {/* <div className="row ">
              <div className="col-md-6">
                <button
                  className="btn btn-success mt-3 float-sm-right"
                  type="submit"
                >
                  Lưu
                </button>
              </div>
            </div> */}
          </Form>
        </div>
      </Formik>
      <div className="container">
        <hr />
        <h4 className="font-weight-bold text-info">Bảo mật</h4>
        <Link to={"/student/change-password"}>
          <button className="btn-a btn btn-info mr-10">Đổi mật khẩu</button>
        </Link>
        <button
          className="btn btn-dark mt-10  float-sm-right"
          type="button"
          onClick={handleBack}
        >
          Thoát
        </button>
      </div>
      <div className="col-md-12"></div>
    </div>
  );
};

export default StudentForm;
