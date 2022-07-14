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
import { getAllSubject } from "./../../../../../services/subject-service";
import { SelectField } from "../../../../formik/SelectField";
import { getAllTeacher } from "../../../../../services/teacher-service";
import { getAllYear } from "../../../../../services/year-service";
import { getAllClass } from "../../../../../services/class-service";
import { SelectField3 } from "./../../../../formik/SelectField3";
import { TextField3 } from "./../../../../formik/TextField3";
import { SelectField4 } from "../../../../formik/SelectField4";
import { SelectField8 } from "../../../../formik/SelectField8";
const CourseForm = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const [title, setTitle] = useState("Thêm khóa học mới");
  const history = useHistory();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  console.log(course);
  const listTeacher = useSelector((state) => state.teacher.listTeacher);
  const listSubject = useSelector((state) => state.subject.listSubject);
  const listYear = useSelector((state) => state.year.listYear);
  const listClass = useSelector((state) => state.class.listClass);

  useEffect(() => {
    dispatch(getAllTeacher("/teacher/admin"));
    dispatch(getAllYear("/year"));
    dispatch(getAllSubject("/subject"));
    dispatch(getAllClass("/class/admin"));
  }, [dispatch]);
  const error = useSelector((state) => state.course.error);
  console.log(course);
  const initialValues = {
    id: "",
    name: "",
    classHour: "",
  };
  const listSemester = [
    {
      name: "HK I",
    },
    {
      name: "HK II",
    },
  ];
  useEffect(() => {
    const loadSchoolEdit = () => {
      dispatch(resetCourse());
      dispatch(getAllSubject());
      if (id !== -1) {
        dispatch(getCourseById(`/cource/admin/${id}`));
        if (course != null) setTitle("Thông tin khóa học" + course.nameCources);
        else {
          setTitle("Thông tin khóa học");
        }
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
    console.log(values);
    params.teacherId =
      values.teacherId ?? (listTeacher != null ? listTeacher[0].id : null);
    params.classId =
      values.classId ?? (listClass != null ? listClass[0].id : null);
    params.yearId = values.yearId ?? (listYear != null ? listYear[0].id : null);
    params.subjectId = values.subjectId;
    params.semester = values.semester;

    console.log(values);
    if (id === -1) {
      params.id = values.id;
      dispatch(addCourse("/cource/admin", params, history));
      console.log("add");
    } else {
      console.log(params);
      dispatch(updateCourse("/cource/admin", params, history));
      console.log("update");
    }
  };
  const validate = Yup.object({});

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
            <div className="row"></div>

            <div className="row">
              <SelectField4 label="Môn học" name="subjectId">
                {listSubject != null
                  ? listSubject.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  : null}
              </SelectField4>

              <SelectField4 label="Năm học" name="yearId">
                {listYear != null
                  ? listYear.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  : null}
              </SelectField4>
              <SelectField4 label="Học kỳ" name="semester">
                {listSemester.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </SelectField4>
            </div>

            <div className="row">
              <SelectField4 label="Lớp học" name="classId">
                {listClass != null
                  ? listClass.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  : null}
              </SelectField4>
              <SelectField8 label="Giáo viên" name="teacherId">
                {listTeacher != null
                  ? listTeacher.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} - {item.id}
                      </option>
                    ))
                  : null}
              </SelectField8>
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

export default CourseForm;
