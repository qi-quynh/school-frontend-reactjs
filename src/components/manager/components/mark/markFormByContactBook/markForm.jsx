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
    dispatch(getAllSubject("/subject/manager"));
    dispatch(resetMark());
    if (id === -1) {
      dispatch(getAllContactBook("/contact-book/manager"));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const loadMarkEdit = async () => {
      await dispatch(resetMark());
      if (id !== -1) {
        await dispatch(getMarkById(`/mark-student/manager/${id}`));

        setTitle("Thông tin sổ liên lạc ");
      }
    };
    loadMarkEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);

  const handleBack = () => {
    history.push("/manager/mark");
  };

  const handleSubmit = (values) => {
    if (id === -1) {
      var params = [];
      var param = {};

      param.subjectId = values.subjectId;
      param.mark = values.markStudentMark;
      param.contactBookId = values.contactBookId;
      params.push(param);
      dispatch(addMark("/mark-student/manager", params, history));
      console.log("add");
    } else {
      var params = {};

      params.subjectId = values.subjectId;
      params.mark = values.markStudentMark;
      //params.contactBookId = values.contactBookId;
      params.id = id;
      console.log(params);
      dispatch(updateMark("/mark-student/manager", params, history));
      console.log("update");
    }

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
                  {listContactBook == null
                    ? null
                    : listContactBook.map((item) => (
                        <option key={item.id} value={item.id}>
                          SLL: {item.id} - Tên: {item.studentName}
                        </option>
                      ))}
                  /
                </SelectField>
              ) : (
                <TextField
                  label="Sổ Liên Lạc"
                  name="contactBookId"
                  type="text"
                  readonly=""
                />
              )}
            </div>

            <div className="row ">
              <SelectField label="Môn học*" name="subjectId">
                {listSubject == null
                  ? null
                  : listSubject.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                /
              </SelectField>
              <TextField
                label="Điểm*"
                step="0.01"
                name="markStudentMark"
                type="number"
              />
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
