import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getFamilyById,
  resetFamily,
  addFamily,
  updateFamily,
} from "../../../../../services/family-service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";
import { MultilineField } from "../../../../formik/MultilineText";

const FamilyForm = () => {
  let { id } = useParams();

  if (id == null) id = -1;
  const [title, setTitle] = useState("Thêm thông tin phụ huynh");
  const history = useHistory();
  const dispatch = useDispatch();
  const family = useSelector((state) => state.family.family);
  const error = useSelector((state) => state.family.error);
  console.log(family);
  const initialValues = {
    cccd: "",
    name: "",
  };

  useEffect(() => {
    const loadFamilyEdit = () => {
      dispatch(resetFamily());
      if (id !== -1) {
        dispatch(getFamilyById(`/family/manager/${id}`));

        setTitle("Thông tin phụ huynh " + id);
      }
    };
    loadFamilyEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);

  const handleBack = () => {
    history.push("/manager/family");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.name = values.name;
    params.phone = values.phone;

    console.log(values);
    console.log(id);
    if (id === -1) {
      params.cmnd = values.cmnd;
      dispatch(addFamily("/family/manager", params, history));
      console.log("add");
    } else {
      params.cmnd = id;
      console.log(params);
      dispatch(updateFamily("/family/manager", params, history));
      console.log("update");
    }

    //handleBack();
  };
  const validate = Yup.object({
    cmnd: Yup.string()
      .required("Vui lòng nhập số Căn cước công dân")
      .min(9, "Vui lòng nhập tối thiểu 9 kí tự")
      .max(12, "Vui lòng nhập tối đa 12 kí tự")
      .matches(/[0-9]/, "Vui lòng nhập số CMND/CCCD"),
    name: Yup.string()
      .required("Vui lòng nhập tên phụ huynh")
      .max(200, "Vui lòng nhập tối đa 50 kí tự")
      .matches(/[a-zA-Z0-9]/, "Vui lòng không nhập kí tự đặc biệt"),
    phone: Yup.string()
      .required("Vui lòng nhập số điện thoại")
      .min(9, "Vui lòng nhập tối thiểu 9 số")
      .max(12, "Vui lòng nhập tối đa 12 số")
      .matches(/[0-9]/, "Vui lòng nhập chỉ nhập số"),
    email: Yup.string(),
  });

  return (
    <div>
      <Formik
        initialValues={family || initialValues}
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
                <TextField label="Số CMND/CCCD*" name="cmnd" type="text" />
              ) : (
                <TextField
                  label="Số CMND/CCCD"
                  name="cmnd"
                  type="text"
                  readonly=""
                />
              )}
              <TextField label="Họ tên*" name="name" type="text" />
            </div>
            <div className="row">
              <TextField label="Số điện thoại*" name="phone" type="text" />
              <TextField label="Email*" name="email" type="email" />
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

export default FamilyForm;
