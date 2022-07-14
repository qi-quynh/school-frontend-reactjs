import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactBookById,
  resetContactBook,
} from "../../../../../services/contactBook-service";
import { getAllContactBook } from "../../../../../services/contactBook-service";
import { addMark, resetMark } from "../../../../../services/mark-service";
import { getAllSubject } from "../../../../../services/subject-service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";
import { SelectField } from "../../../../formik/SelectField";

const MarkFormByContactBook = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const [title, setTitle] = useState("Nhập điểm");
  const history = useHistory();
  const dispatch = useDispatch();
  const contactBook = useSelector((state) => state.contactBook.contactBook);
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

  // useEffect(()=> {
  //     const loadContactBookEdit = async () => {
  //         await dispatch(resetContactBook());
  //         if(id !== -1){
  //             await dispatch(getContactBookById(id));

  //             setTitle("Thông tin sổ liên lạc ");
  //         }
  //     };
  //     loadContactBookEdit();
  //     return () => {
  //         return [];
  //     };
  // }, [dispatch, id]);

  const handleBack = () => {
    history.push("/manager/contactBook");
  };

  const handleSubmit = (values) => {
    var params = [];
    var param = {};

    param.subjectId = values.subjectId;
    param.mark = values.mark;
    param.contactBookId = id === -1 ? values.contactBookId : id;

    params.push(param);
    dispatch(addMark("/mark-student/manager", params, history));
    console.log("add");
    // if(id === -1){
    //     params.contactBookId = id;
    //     dispatch(addMark(params, history));
    //     console.log("add");
    // }
    // else{
    //     params.id = id;
    //     console.log(params);
    //    // dispatch(updateContactBook(params, history));
    //     console.log("update");
    // }

    //handleBackSubmit();
  };

  const validate = Yup.object({
    subjectId: Yup.string().required("Vui lòng chọn môn học"),
    mark: Yup.number()
      .required("Vui lòng nhập điểm")
      .max(10, "Điểm tối đa là 10")
      .min(0, "Điểm tối thiểu là 0"),
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
            {id === -1 ? (
              <div className="row ">
                <SelectField label="Học sinh" name="contactBookId">
                  {listContactBook == null
                    ? null
                    : listContactBook.map((item) => (
                        <option key={item.id} value={item.id}>
                          MSHS: {item.studentId} - Tên: {item.studentName}
                        </option>
                      ))}
                  /
                </SelectField>
              </div>
            ) : (
              <div></div>
            )}

            <div className="row ">
              <SelectField label="Môn học" name="subjectId">
                {listSubject == null
                  ? null
                  : listSubject.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                /
              </SelectField>
              <TextField label="Điểm" step="0.01" name="mark" type="number" />
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

export default MarkFormByContactBook;
