import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getSchoolById,
  resetSchool,
  addSchool,
  updateSchool,
} from "../../../../../services/school-service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";
import { MultilineField } from "../../../../formik/MultilineText";

const SchoolForm = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const [title, setTitle] = useState("Thông tin trường mới");
  const history = useHistory();
  const dispatch = useDispatch();
  const school = useSelector((state) => state.school.school);
  const error = useSelector((state) => state.school.error);
  console.log(school);
  const initialValues = {
    id: "",
    name: "",
    type: "",
    address: "",
    description: "",
  };

  useEffect(() => {
    const loadSchoolEdit = async () => {
      await dispatch(resetSchool());
      if (id !== -1) {
        await dispatch(getSchoolById("/school/manager", id));

        setTitle("Thông tin trường " + id);
      }
    };
    loadSchoolEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);

  const handleBack = () => {
    history.push("/manager/school");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.name = values.name;
    params.type = values.type;
    params.address = values.address;
    params.description = values.description;

    console.log(values);
    console.log(id);
    if (id === -1) {
      params.id = values.id;
      dispatch(
        addSchool("/school/manager", params, history, "/manager/school")
      );
      console.log("add");
    } else {
      params.id = id;
      console.log(params);
      dispatch(
        updateSchool("/school/manager", params, history, "/manager/school")
      );
      console.log("update");
    }

    //handleBack();
  };
  const validate = Yup.object({
    id: Yup.string()
      .required("Vui lòng nhập Id trường")
      .max(10, "Id tối đa 10 kí tự")
      .matches(/[0-9a-zA-Z]/, "Id chỉ gồm kí chữ cái Latinh và số"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
    name: Yup.string()
      .required("Vui lòng nhập tên trường")
      // .max(50, "Địa chỉ nhập tối đa 50 kí tự")
      .matches(/[a-zA-Z0-9]/, "Tên không chứa kí tự đặc biệt"),
    type: Yup.number()
      .required("Vui lòng nhập cấp")
      .is([1, 2, 3], "Cấp chỉ gồm 1,2 hoăc 3"),
    // address : Yup.string().required("Vui lòng nhập tên địa chỉ").max(150, "Địa chỉ nhập tối đa 150 kí tự"),
    description: Yup.string().max(400, "Mô tả tối đa 400 kí tự"),
  });

  return (
    <div>
      <Formik
        initialValues={school || initialValues}
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
                <TextField label="Id*" name="id" type="text" />
              ) : (
                <TextField label="Id" name="id" type="text" readonly="" />
              )}
              <TextField label="Tên Trường*" name="name" type="text" />
            </div>
            <div className="row">
              <TextField label="Cấp*" name="type" type="number" />
              <TextField label="Địa chỉ" name="address" type="text" />
            </div>
            <div className="row text-center">
              <MultilineField label="Mô tả" name="description" type="text" />
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

export default SchoolForm;
