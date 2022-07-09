import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactBookById,
  resetContactBook,
} from "../../../../../services/contactBook-service";
import { getAllContactBook } from "../../../../../services/contactBook-service";
import {
  addMark,
  getMarkById,
  resetMark,
  updateMark,
} from "../../../../../services/mark-service";
import { getAllSubject } from "../../../../../services/subject-service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";

import { SelectField } from "../../../../formik/SelectField";
import { TextField3 } from "./../../../../formik/TextField3";
import { TextField2 } from "./../../../../formik/TextField2";
import { SelectField3 } from "./../../../../formik/SelectField3";

const MarkForm = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const [title, setTitle] = useState("Nhập điểm");
  const history = useHistory();
  const dispatch = useDispatch();
  const mark = useSelector((state) => state.mark.mark);
  const listSubject = useSelector((state) => state.subject.listSubject);
  const listContactBook = useSelector(
    (state) => state.contactBook.listContactBook
  );
  const error = useSelector((state) => state.mark.error);
  console.log(error);

  const initialValues = {
    contactBookId: "",
    subjectId: "",
    mark: "",
  };
  useEffect(() => {
    dispatch(getAllSubject());
    dispatch(resetMark());
    if (id === -1) {
      dispatch(getAllContactBook("/contact-book/teacher"));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const loadMarkEdit = async () => {
      await dispatch(resetMark());
      if (id !== -1) {
        await dispatch(getMarkById(`/mark-student/teacher/${id}`));

        setTitle("Thông tin sổ liên lạc ");
      }
    };
    loadMarkEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);

  const handleBack = () => {
    history.push("/teacher/mark");
  };

  const handleSubmit = (values) => {
    var params = [];
    var param = {};
    param.mark = values.markStudentMark;
    //params.contactBookId = values.contactBookId;
    param.id = id;
    console.log(params);
    params.push(param);
    dispatch(updateMark("/mark-student/teacher", params, history));
    console.log("update");

    //handleBackSubmit();
  };

  const validate = Yup.object({
    contactBookId: Yup.string().required("Vui lòng chọn mã sổ liên lạc"),
    subjectId: Yup.string().required("Vui lòng chọn môn học"),
    markStudentMark: Yup.number()
      .required("Vui lòng nhập điểm")
      .max(10, "Điểm tối đa là 10")
      .min(0, "Điểm tối thiểu là 0"),
  });

  //const [selectedGradeId, setSelectedGreadeId] = useState(listGrade[0].gradeId);
  return (
    <div>
      <Formik
        initialValues={mark || initialValues}
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
              {id === -1 ? (
                <SelectField label="Học sinh*" name="contactBookId">
                  {listContactBook.map((item) => (
                    <option key={item.id} value={item.id}>
                      SLL: {item.id} - MS: {item.studentId} - {item.studentName}
                    </option>
                  ))}
                  /
                </SelectField>
              ) : (
                <TextField3
                  label="SLL"
                  name="contactBookId"
                  type="text"
                  readonly=""
                />
              )}

              <TextField3
                label="Lớp"
                name="className"
                type="text"
                readonly=""
              />
              <TextField3
                label="Khóa học"
                name="courceName"
                type="text"
                readonly=""
              />
              <TextField3
                label="Học kỳ"
                name="semester"
                type="text"
                readonly=""
              />
            </div>
            <div className="row ">
              <TextField3
                label="Học Sinh"
                name="studentId"
                type="text"
                readonly=""
              />
              <TextField3
                label="Học Sinh"
                name="studentName"
                type="text"
                readonly=""
              />
              <SelectField3 label="Môn học*" name="subjectId">
                {listSubject.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
                /
              </SelectField3>
              <TextField3 label="Điểm*" name="markStudentMark" type="number" />
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

export default MarkForm;
