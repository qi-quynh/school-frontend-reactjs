import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubjectById,
  resetSubject,
  addSubject,
  updateSubject,
  getAllSubject,
} from "../../../../../services/subject-service";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";

import { getAllTeacher } from "./../../../../../services/teacher-service";
import {
  addCourse,
  getCourseById,
  updateCourse,
  resetCourse,
} from "./../../../../../services/course-service";
import { SelectField } from "../../../../formik/SelectField";
import { getAllSchool } from "../../../../../services/school-service";
import { getAllGrade } from "../../../../../services/grade-service";
import { getAllYear } from "../../../../../services/year-service";
import { getAllClass } from "../../../../../services/class-service";

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
  const [schoolId, setSchoolId] = useState();
  useEffect(() => {
    const loadSchoolEdit = () => {
      dispatch(resetCourse());
      if (id !== -1) {
        dispatch(getCourseById(`/cource/manager/${id}`));

        setTitle("Thông tin khóa học ");
      }
    };
    loadSchoolEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);
  const listSemester = [
    {
      name: "HK I",
    },
    {
      name: "HK II",
    },
  ];

  const listTeacher = useSelector((state) => state.teacher.listTeacher);
  const listSubject = useSelector((state) => state.subject.listSubject);
  const listYear = useSelector((state) => state.year.listYear);
  const listClass = useSelector((state) => state.class.listClass);

  useEffect(() => {
    dispatch(getAllSchool("/school/manager"));
    dispatch(getAllTeacher("/teacher/manager"));
    dispatch(getAllYear("/year/manager"));
    dispatch(getAllSubject("/subject/manager"));
    dispatch(getAllClass("/class/manager"));
  }, [dispatch]);

  const listSchool = useSelector((state) => state.school.listSchool);

  const handleSchoolChange = (values) => {
    console.log(values);
    dispatch(getAllClass(`/class/manager?schoolId=${values}`));
    dispatch(getAllTeacher(`/teacher/manager?schoolId=${values}`));
    setSchoolId(values);
  };
  const handleBack = () => {
    history.push("/manager/course");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.teacherId = values.teacherId;
    params.classId = values.classId;
    params.schoolId = schoolId;
    params.yearId = values.yearId;
    params.subjectId = values.subjectId;
    params.semester = values.semester;
    console.log("Manager course");
    console.log(params);
    if (id === -1) {
      params.id = values.id;
      dispatch(addCourse("/cource/manager", params, history));
      console.log("add");
    } else {
      params.id = id;
      console.log(params);
      dispatch(updateCourse("/cource/manager", params));
      console.log("update");
    }
  };
  const validate = Yup.object({
    // name: Yup.string()
    //   .required("Vui lòng nhập tên môn học")
    //   .max(50, "Tên môn học nhập tối đa 50 kí tự")
    //   .matches(/[^!@#$%^&()-=+{};:,<.>]/, "Tên không chứa kí tự đặc biệt"),
    // classHour: Yup.number().min(0, "Thời lượng không nhỏ hơn 0"),
  });

  console.log(listTeacher);
  console.log(listSubject);
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
              {/* <TextField label="Tên" name="name" type="text" /> */}
            </div>

            <div className="row">
              <div className="col-md-6">
                <label>Trường</label>
                <select
                  className="form-control shadow-none"
                  onChange={(val) => handleSchoolChange(val.target.value)}
                >
                  {listSchool == null
                    ? null
                    : listSchool.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.id} - {item.name}
                        </option>
                      ))}
                </select>
              </div>

              <SelectField label="Giáo viên" name="teacherId">
                {listTeacher != null
                  ? listTeacher.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.id} - {item.name}
                      </option>
                    ))
                  : null}
              </SelectField>
            </div>
            <div className="row">
              <SelectField label="Môn học" name="subjectId">
                {listSubject != null
                  ? listSubject.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  : null}
              </SelectField>
              <SelectField label="Năm học" name="yearId">
                {listYear != null
                  ? listYear.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  : null}
              </SelectField>
            </div>
            <div className="row">
              <SelectField label="Lớp học" name="classId">
                {listClass != null
                  ? listClass.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  : null}
              </SelectField>
              <SelectField label="Học kỳ" name="semester">
                {listSemester.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </SelectField>
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
