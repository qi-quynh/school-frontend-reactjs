import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationById,
  resetNotification,
  addNotification,
  updateNotification,
} from "../../../../../services/notification-service";
import { ButtonGroup, Box, Menu, MenuItem, Button } from "@material-ui/core";

import { getAllExtra } from "../../../../../services/extra-service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";
import { SelectField } from "../../../../formik/SelectField";
import { getAllSchool } from "../../../../../services/school-service";
import { Multiline12Field } from "../../../../formik/MultilineText12";
import { getAllStudent } from "./../../../../../services/student-service";
import { getAllTeacher } from "./../../../../../services/teacher-service";
import { getAllClass } from "./../../../../../services/class-service";
import { getClassByMarkTeacher } from "../../../../../services/mark-service";
import { MultilineField } from "./../../../../formik/MultilineText";
import { TextField12 } from "../../../../formik/TextField12";

const NotificationForm = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const [title, setTitle] = useState("Thêm thông báo ");
  const history = useHistory();
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.notification);
  const listStudent = useSelector((state) => state.student.listStudent);
  const listMarkTeacher = useSelector(
    (state) => state.markTeacher.listClassTeaching
  );

  console.log(notification);
  const initialValues = {
    idNotification: "",
    titleNotification: "",
    extracurricularActivitiesId: "",
    description: "",
  };

  useEffect(() => {
    const loadNotificationEdit = async () => {
      await dispatch(resetNotification());
      if (id !== -1) {
        await dispatch(getNotificationById(`/notification/teacher/${id}`));
        console.log(getNotificationById(`/notification/admin/${id}`));

        setTitle("Thông tin thông báo ");
      }
    };
    loadNotificationEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);

  const handleBack = () => {
    history.push("/teacher/notification");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.title = values.titleNotification;

    params.description = values.descriptionNotification;

    if (object === 2) {
      dispatch(
        addNotification("/notification/teacher-homeroom-list", params, history)
      );
    }
    if (object === 3) {
      params.classId = values.classId;
      console.log(params);
      dispatch(
        addNotification("/notification/teacher-course-list", params, history)
      );
    }
    if (object === 5) {
      params.object = values.studentId;
      dispatch(
        addNotification("/notification/teacher-homeroom", params, history)
      );
    }
    if (object === 6) {
      params.object = values.studentId;
      dispatch(
        addNotification("/notification/teacher-course", params, history)
      );
    }
    if (object === 7) {
      dispatch(
        addNotification("/notification/teacher-homeroom", params, history)
      );
    }
    console.log("submit");
  };
  const validate = Yup.object({
    titleNotification: Yup.string()
      .required("Vui lòng nhập tiêu đề")
      .max(400, "Vui lòng nhập tối đa 400 kí tự")
      .matches(/[0-9a-zA-Z]/, "Vui lòng không nhập kí tự đăc biệt"),
    description: Yup.string().max(4000, "Vui lòng nhập tối đa 4000 kí tự"),
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElObject, setAnchorElObject] = React.useState(null);
  const [name, setName] = React.useState("Chọn đối tượng cần gửi");
  const [object, setObject] = React.useState(1);
  const [classId, setClassId] = useState();
  const [isDisplayClass, setIsDisplayClass] = React.useState(true);
  const [isDisplayStudent, setIsDisplayStudent] = React.useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };
  const handleObjectClick = (event) => {
    setAnchorElObject(event.currentTarget);
    console.log(anchorEl);
  };
  const onClickAll = (event) => {
    event.preventDefault();

    handleClose();
  };
  const onClickHomeroomTeacherToAll = (event) => {
    event.preventDefault();

    setName("Đến Cả Lớp Đang Chủ Nhiệm");
    setObject(2);
    handleClose();
  };

  const onClickSubjectTeacherToAll = (event) => {
    event.preventDefault();
    setName("Đến Cả Lớp Đang Dạy");
    setObject(3);
    dispatch(getClassByMarkTeacher("/cource/teacher-name-course"));

    handleClose();
  };
  const onClickHomeroomTeacherToOne = (event) => {
    event.preventDefault();
    setObject(5);

    dispatch(getAllStudent("/student/teacher-homeroom"));
    setName("Đến Học Sinh Đang Chủ Nhiệm");

    handleClose();
  };
  const onClickSubjectTeacherToOne = (event) => {
    event.preventDefault();
    setObject(6);
    setName("Đến Học Sinh Đang Dạy");
    dispatch(getClassByMarkTeacher("/cource/teacher-name-course"));
    dispatch(getAllStudent("/student/teacher-homeroom"));
    handleClose();
  };

  const onClickToAdmin = (event) => {
    event.preventDefault();
    setName("Đến Quản Lý Trường");
    setObject(7);
    handleClose();
  };
  const handleClassChange = (values) => {
    console.log(values);

    dispatch(getAllStudent(`/student/teacher-course?classId=${values}`));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <hr />
      <Formik
        initialValues={notification || initialValues}
        validationSchema={validate}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize
      >
        <div className="container text-center">
          <h4 className="my-4 font-weight-bold text-info">{title}</h4>
          <Form>
            <div className="row text-center">
              {id === -1 ? (
                <div></div>
              ) : (
                <TextField
                  label="Id"
                  name="idNotification"
                  type="text"
                  readonly=""
                />
              )}
              <div className="col-md-5 text-center">
                <Box className="card-header--actions ">
                  <Button
                    aria-controls="simple-menu"
                    variant="contained"
                    color="primary"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    {name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={onClickHomeroomTeacherToAll}>
                      Lớp Học Chủ Nhiệm - Cả Lớp
                    </MenuItem>
                    <MenuItem onClick={onClickSubjectTeacherToAll}>
                      Lớp Học Bộ Môn - Cả Lớp
                    </MenuItem>
                    <MenuItem onClick={onClickHomeroomTeacherToOne}>
                      Lớp Học Chủ Nhiệm - Học Sinh
                    </MenuItem>
                    <MenuItem onClick={onClickSubjectTeacherToOne}>
                      Lớp Học Bộ Môn - Học Sinh
                    </MenuItem>
                    <MenuItem onClick={onClickToAdmin}>
                      Đến Quản Lý Trường
                    </MenuItem>
                  </Menu>
                </Box>
              </div>
            </div>
            <div className="row ">
              {object === 3 ? (
                <SelectField label="Lớp Học" name="classId">
                  {listMarkTeacher != null
                    ? listMarkTeacher.map((item) => (
                        <option key={item.classId} value={item.classId}>
                          {item.className}
                        </option>
                      ))
                    : null}
                </SelectField>
              ) : null}
              {object === 6 ? (
                <div className="row">
                  <div className="col-md-6">
                    <label>Lớp Học</label>
                    <select
                      className="form-control shadow-none"
                      onChange={(val) => handleClassChange(val.target.value)}
                    >
                      {listMarkTeacher == null
                        ? null
                        : listMarkTeacher.map((item) => (
                            <option key={item.classId} value={item.classId}>
                              {item.className}
                            </option>
                          ))}
                    </select>
                  </div>
                  <SelectField label="Học sinh" name="studentId">
                    {listStudent != null
                      ? listStudent.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.id} - {item.name}
                          </option>
                        ))
                      : null}
                  </SelectField>
                </div>
              ) : null}

              {object === 5 ? (
                <SelectField label="Học sinh" name="studentId">
                  {listStudent != null
                    ? listStudent.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.id} - {item.name}
                        </option>
                      ))
                    : null}
                </SelectField>
              ) : null}
            </div>

            <div className="row">
              <TextField12
                label="Tiêu đề*"
                name="titleNotification"
                type="text"
              />
            </div>
            <div className="row">
              <Multiline12Field
                label="Mô tả"
                name="descriptionNotification"
                type="number"
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
      <hr />
    </div>
  );
};

export default NotificationForm;
