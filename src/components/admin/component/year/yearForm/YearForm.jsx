import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getYearById,
  resetYear,
  addYear,
  updateYear,
} from "../../../../../services/year-service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";

const YearForm = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const [title, setTitle] = useState("Thông tin trường mới");
  const history = useHistory();
  const dispatch = useDispatch();
  const year = useSelector((state) => state.year.year);
  const error = useSelector((state) => state.year.error);

  const initialValues = {
    id: "",
    start: "",
    end: "",
  };

  useEffect(() => {
    const loadYearEdit = async () => {
      await dispatch(resetYear());
      if (id !== -1) {
        await dispatch(getYearById(id));

        setTitle("Thông tin trường " + id);
      }
    };
    loadYearEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);

  const handleBack = () => {
    history.push("/admin/schoolYear");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.start = values.start;
    params.end = values.end;

    console.log(values);
    if (id === -1) {
      dispatch(addYear(params, history));
      console.log("add");
    } else {
      params.id = id;
      console.log(params);
      dispatch(updateYear(params, history));
      console.log("update");
    }

    // handleBack();
  };
  const validate = Yup.object({
    start: Yup.number().required("Vui lòng nhập năm học bắt đầu"),
    end: Yup.number().required("Vui lòng nhập năm kết thúc"),
  });

  return (
    <div>
      <Formik
        initialValues={year || initialValues}
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
              <TextField label="Năm bắt đầu*" name="start" type="number" />

              <TextField label="Năm kết thúc*" name="end" type="number" />
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

export default YearForm;
