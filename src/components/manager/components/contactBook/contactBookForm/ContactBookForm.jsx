import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactBookById,
  resetContactBook,
  addContactBook,
  updateContactBook,
  addContactBookByStudent,
} from "../../../../../services/contactBook-service";
import { getAllStudent } from "../../../../../services/student-service";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";
import { SelectField } from "../../../../formik/SelectField";
import { getAllYear } from "../../../../../services/year-service";

const ContactBookForm = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const [title, setTitle] = useState("Thêm thông tin lớp học");
  const history = useHistory();
  const dispatch = useDispatch();
  const contactBook = useSelector((state) => state.contactBook.contactBook);
  const listStudent = useSelector((state) => state.student.listStudent);
  const listYear = useSelector((state) => state.year.listYear);
  const error = useSelector((state) => state.contactBook.error);
  const listSemester = [
    {
      name: "HK I",
    },
    {
      name: "HK II",
    },
  ];

  const initialValues = {
    id: "",
    studentId: "",
    mark: "",
    semester: "",
    schoolYear: 1,
  };

  useEffect(() => {
    const loadContactBookEdit = async () => {
      await dispatch(resetContactBook());
      if (id !== -1) {
        await dispatch(getContactBookById(id));

        setTitle("Thông tin sổ liên lạc ");
      }
    };
    loadContactBookEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getAllStudent("/student/manager"));
    dispatch(getAllYear());
  }, [dispatch]);
  const handleBack = () => {
    history.push("/manager/contactBook");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.studentId = values.studentId;
    //params.teacherId = values.teacherId;
    params.semester = values.semester !== "" ? values.semester : "HK I";
    params.schoolYear = values.schoolYear;
    console.log(values);
    if (id === -1) {
      dispatch(
        addContactBookByStudent("/contact-book/manager", params, history)
      );
      console.log("add");
    } else {
      params.id = id;
      console.log(params);
      dispatch(updateContactBook("/contact-book/manager", params, history));
      console.log("update");
    }

    //handleBackSubmit();
  };

  const validate = Yup.object({
    // name : Yup.string().required("Vui lòng nhập tên lớp")
    //                 .max(3, "Nhập tên tối đa 3 kí tự")
    //                 .matches(/\w/, "Tên không chứa kí tự đặc biệt"),
    // teacherId : Yup.string().required("Vui lòng nhập giáo viên chủ nhiệm"),
    // total : Yup.number().required("Vui lòng nhập tổng số học sinh").max(100, "Lớp học tối đa 50 học sinh").min(0, "Lớp học tối thiểu 0 học sinh")
  });

  //const [selectedGradeId, setSelectedGreadeId] = useState(listGrade[0].gradeId);
  return (
    <div>
      <Formik
        initialValues={contactBook || initialValues}
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
            <div className="row ">
              <SelectField label="Học sinh*" name="studentId">
                {listStudent.map((item) => (
                  <option key={item.id} value={item.id}>
                    Mã Số: {item.id} - Tên: {item.name}
                  </option>
                ))}
                /
              </SelectField>
              <SelectField label="Học kì*" name="semester">
                {listSemester.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
                /
              </SelectField>
            </div>
            <div className="row ">
              <SelectField label="Năm học*" name="schoolYear">
                {listYear == null ? (
                  <div></div>
                ) : (
                  listYear.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))
                )}
                /
              </SelectField>
            </div>
            <div className="row text-center ">
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

export default ContactBookForm;
