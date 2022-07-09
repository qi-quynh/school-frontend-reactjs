import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubjectById,
  resetSubject,
  addSubject,
  updateSubject,
} from "../../../../../services/subject-service";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";
import {
  addCourse,
  getCourseById,
  updateCourse,
  resetCourse,
} from "./../../../../../services/course-service";

const CourseForm = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const [title, setTitle] = useState("Thêm môn học");
  const history = useHistory();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  const error = useSelector((state) => state.course.error);
  console.log(course);
  const initialValues = {
    id: "",
    name: "",
    classHour: "",
  };

  useEffect(() => {
    const loadSchoolEdit = async () => {
      await dispatch(resetCourse());
      if (id !== -1) {
        await dispatch(getCourseById(`/cource/admin/${id}`));

        setTitle("Thông tin khóa học ");
      }
    };
    loadSchoolEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);

  const handleBack = () => {
    history.push("/admin/course");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.name = values.name;
    params.classHour = values.classHour;

    console.log(values);
    if (id === -1) {
      params.id = values.id;
      dispatch(addCourse("/cource/admin", params));
      console.log("add");
    } else {
      params.id = id;
      console.log(params);
      dispatch(updateCourse("/cource/admin", params));
      console.log("update");
    }

    handleBack();
  };
  const validate = Yup.object({
    name: Yup.string()
      .required("Vui lòng nhập tên môn học")
      .max(50, "Tên môn học nhập tối đa 50 kí tự")
      .matches(/[^!@#$%^&()-=+{};:,<.>]/, "Tên không chứa kí tự đặc biệt"),
    classHour: Yup.number().min(0, "Thời lượng không nhỏ hơn 0"),
  });

  return (
    <div>
      <hr />
      <Formik
        initialValues={course || initialValues}
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
                // <TextField label="Id" name="id" type="text" />
                <div></div>
              ) : (
                <TextField label="Id" name="id" type="text" readonly="" />
              )}
              <TextField label="Môn học*" name="name" type="text" />
            </div>

            <div className="row">
              <TextField label="Thời gian" name="classHour" type="number" />
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

export default CourseForm;
