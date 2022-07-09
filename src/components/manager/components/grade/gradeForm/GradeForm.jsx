import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getGradeById,
  resetGrade,
  addGrade,
  updateGrade,
} from "../../../../../services/grade-service";
import { getAllSchool } from "../../../../../services/school-service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";
import { SelectField } from "../../../../formik/SelectField";

const GradeForm = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const [title, setTitle] = useState("Thêm khối học");
  const history = useHistory();
  const dispatch = useDispatch();

  const grade = useSelector((state) => state.grade.grade);
  const listSchool = useSelector((state) => state.school.listSchool);
  var error = useSelector((state) => state.grade.error);
  console.log(grade);
  const initialValues = {
    id: "",
    name: "",
    schoolId: "",
  };
  useEffect(() => {
    dispatch(getAllSchool("/school/manager"));
  }, [dispatch]);

  useEffect(() => {
    const loadGradeEdit = async () => {
      await dispatch(resetGrade());
      if (id !== -1) {
        await dispatch(getGradeById(`/grade/manager?id=${id}`));

        setTitle("Thông tin khối học");
      }
    };
    loadGradeEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);

  const handleBack = () => {
    history.push("/manager/grade");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.name = values.name;
    params.schoolId = values.schoolId;

    console.log(values);
    if (id === -1) {
      dispatch(addGrade("/grade/manager", params, history));
      console.log("add");
    } else {
      params.id = id;
      console.log(params);
      dispatch(updateGrade("/grade/manager", params, history));
      console.log("update");
    }
  };
  const validate = Yup.object({
    schoolId: Yup.string().required("Vui lòng nhập Id trường"),
    name: Yup.number()
      .required("Vui lòng nhập tên khối")
      .oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "Khối từ 1 đến 12"),
  });

  return (
    <div>
      <Formik
        initialValues={grade || initialValues}
        validationSchema={validate}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize
      >
        <div className="container text-center">
          <h3 className="my-4 font-weight-bold text-info">{title}</h3>
          {error ? (
            <div className="alert alert-danger col-6" role="alert">
              {error}
            </div>
          ) : null}
          <Form>
            <div className="row text-center">
              {id === -1 ? (
                <div></div>
              ) : (
                <TextField label="Id" name="id" type="text" readonly="" />
              )}
            </div>
            <div className="row">
              <TextField label="Tên Khối*" name="name" type="text" />
              <SelectField label="Trường*" name="schoolId">
                {listSchool == null
                  ? null
                  : listSchool.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.id} - {item.name}
                      </option>
                    ))}
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

export default GradeForm;
