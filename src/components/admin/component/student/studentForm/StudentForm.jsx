import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentById,
  resetStudent,
  addStudent,
  updateStudent,
} from "../../../../../services/student-service";
import { getAllFamily } from "../../../../../services/family-service";
import { getClassBySchoolId } from "../../../../../services/class-service";
import { getAllClass } from "../../../../../services/class-service";
import { getAllSchool } from "../../../../../services/school-service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";
import { SelectField } from "../../../../formik/SelectField";

const StudentForm = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const [title, setTitle] = useState("Thêm thông tin học sinh");
  const history = useHistory();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.student.student);
  const error = useSelector((state) => state.student.error);
  const listSchool = useSelector((state) => state.school.listSchool);
  const listClass = useSelector((state) => state.class.listClass);
  const listFamily = useSelector((state) => state.family.listFamily);
  console.log(listClass);
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
    const loadStudentEdit = async () => {
      await dispatch(resetStudent());
      if (id !== -1) {
        await dispatch(getStudentById(`/student/admin/${id}`));

        setTitle("Thông tin học sinh");
      }
    };
    loadStudentEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllClass("/class/admin"));
    dispatch(getAllFamily("/family"));
  }, [dispatch]);

  const handleBack = () => {
    history.push("/admin/student");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.name = values.name;
    params.roleId = "STUDENT";
    params.cmndFamily = values.cmndFamily;
    params.classId =
      values.classId !== "" ? values.classId : listClass[0].classId;
    params.name = values.name;
    params.phone = values.phone !== "" ? values.phone : "0";
    params.address = values.address;
    params.email = values.email;
    params.status = values.status;

    console.log(values);
    if (id === -1) {
      params.id = values.id;
      dispatch(addStudent("/student/admin", params, history));
      console.log("add");
    } else {
      params.id = id;
      console.log(params);
      dispatch(updateStudent("/student/admin", params, history));
      console.log("update");
    }
  };
  const handleSchoolChange = (values) => {
    console.log(values);

    dispatch(getAllClass(`/class/admin?schoolId=${values}`));
  };
  const validate = Yup.object({
    name: Yup.string()
      .required("Vui lòng nhập tên học sinh")
      .max(100, "Địa chỉ nhập tối đa 100 kí tự")
      .matches(/[^!@#$%^&()-=+{};:,<.>]+$/, "Tên không chứa kí tự đặc biệt"),
    id: Yup.string().required("Vui lòng nhập Id"),
    // classId: Yup.string().required("Vui lòng nhập lớp học"),
    phone: Yup.string()
      .matches(/[0-9]+$/, "Vui lòng nhập số điện thoại")
      .max(12, "Vui lòng nhập tối đa 12 kí tự"),
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
              {id === -1 ? (
                <TextField label="MSHS*" name="id" type="text" />
              ) : (
                <TextField label="MSHS" name="id" type="text" readonly="" />
              )}
              <TextField label="Họ Tên*" name="name" type="text" />
            </div>
            <div className="row">
              {/* <TextField label="CMND/CCCD" name="cmndFamily" type="number" /> */}

              <SelectField label="Lớp" name="classId">
                {listClass == null ? (
                  <div></div>
                ) : (
                  listClass.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))
                )}
              </SelectField>
              <TextField label="Email" name="email" type="email" />
            </div>
            <div className="row">
              <TextField label="SĐT" name="phone" type="text" />
              <TextField label="Địa chỉ" name="address" type="text" />
            </div>
            <div className="row">
              <SelectField label="Phụ huynh" name="cmndFamily">
                {listFamily == null ? (
                  <div></div>
                ) : (
                  listFamily.map((item) => (
                    <option key={item.cmnd} value={item.cmnd}>
                      {item.cmnd} {item.name}
                    </option>
                  ))
                )}
              </SelectField>
              {/* <label htmlFor="status">Còn học</label>
              <input
                type="checkbox"
                id="status"
                name="status"
                value="true"
              ></input> */}
              <TextField label="Trạng thái" name="status" type="" />
            </div>
            <div className="row"></div>

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
      <hr />
    </div>
  );
};

export default StudentForm;
