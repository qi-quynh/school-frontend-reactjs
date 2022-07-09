import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassById,
  resetClass,
  addClass,
  updateClass,
} from "../../../../../services/class-service";
import {
  getAllTeacher,
  getTeacherById,
  getTeacherBySchoolId,
} from "../../../../../services/teacher-service";
import {
  getAllGrade,
  getGradeBySchoolId,
} from "../../../../../services/grade-service";
import { getAllSchool } from "../../../../../services/school-service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";
import { SelectField } from "../../../../formik/SelectField";

const ClassForm = () => {
  let { id } = useParams();

  if (id == null) id = -1;
  const [title, setTitle] = useState("Thêm thông tin lớp học");
  const history = useHistory();
  const dispatch = useDispatch();

  const classDetail = useSelector((state) => state.class.class);

  useEffect(() => {
    dispatch(resetClass());
    if (id !== -1) {
      dispatch(getClassById(`/class/admin/${id}`));
      //console.log(classDetail);
      setTitle("Thông tin lớp ");
    }

    return () => {
      return [];
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (id !== -1 && classDetail != null) {
      handleSchoolChange(classDetail.schoolId);
    }
  }, [dispatch, classDetail]);

  const listGrade = useSelector((state) => state.grade.listGrade);
  const listTeacher = useSelector((state) => state.teacher.listTeacher);

  useEffect(() => {
    dispatch(getAllTeacher("/teacher/admin"));
    dispatch(getAllGrade("/grade/admin"));
  }, [dispatch]);

  const listSchool = useSelector((state) => state.school.listSchool);
  const error = useSelector((state) => state.class.error);

  const initialValues = {
    id: "",
    name: "",
    total: "",
    teacherId: "",
    schoolName: "",
    schoolId: "",
    teacherName: "",
    gradeId: "",
    gradeName: "",
  };
  const handleSchoolChange = (values) => {
    console.log(values);
    dispatch(getGradeBySchoolId(values));
    dispatch(getTeacherBySchoolId(values));
  };
  const handleBack = () => {
    history.push("/admin/class");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.name = values.name;
    params.gradeId = values.gradeId;
    params.teacherId = values.teacherId;

    console.log(values);
    if (id === -1) {
      params.id = null;
      dispatch(addClass("/class/admin", params, history));
      console.log("add");
    } else {
      params.id = id;
      console.log(params);
      dispatch(updateClass("/class/admin", params, history));
      console.log("update");
    }

    //handleBackSubmit();
  };

  const validate = Yup.object({
    name: Yup.string()
      .required("Vui lòng nhập tên lớp")
      .max(6, "Nhập tên tối đa 6 kí tự")
      .matches(/\w/, "Tên không chứa kí tự đặc biệt"),
    teacherId: Yup.string().required("Vui lòng nhập giáo viên chủ nhiệm"),
    gradeId: Yup.string().required("Vui lòng chọn khối"),
  });

  //const [selectedGradeId, setSelectedGreadeId] = useState(listGrade[0].gradeId);
  return (
    <div>
      <div>
        <Formik
          initialValues={classDetail || initialValues}
          validationSchema={validate}
          onSubmit={(values) => handleSubmit(values)}
          enableReinitialize
        >
          <div className="container text-center">
            <h2 className="my-4 font-weight-bold text-info">{title}</h2>
            {error ? (
              <div className="alert alert-danger col-6" role="alert">
                {error}
              </div>
            ) : null}
            <Form>
              <div className="row">
                {id === -1 ? (
                  <SelectField label="Khối*" name="gradeId">
                    {listGrade == null ? (
                      <div></div>
                    ) : (
                      listGrade.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    )}
                  </SelectField>
                ) : (
                  <TextField
                    label="Khối*"
                    name="gradeName"
                    type="text"
                    readonly=""
                  />
                )}
                <SelectField label="Giáo viên chủ nhiệm*" name="teacherId">
                  {listTeacher == null ? (
                    <div></div>
                  ) : (
                    listTeacher.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.id} - {item.name}
                      </option>
                    ))
                  )}
                </SelectField>
              </div>
              <div className="row">
                <TextField label="Tên lớp*" name="name" type="text" />
                {id === -1 ? (
                  <div></div>
                ) : (
                  <TextField
                    label="Sỉ số lớp học"
                    name="total"
                    type="number"
                    readonly=""
                  />
                )}
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
    </div>
  );
};

export default ClassForm;
