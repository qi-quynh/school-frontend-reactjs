import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { transferClass } from "../../../../../services/student-service";
import { getAllClass } from "../../../../../services/class-service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { SelectField } from "../../../../formik/SelectField";

const TransferClass = () => {
  const [title, setTitle] = useState("Chuyển lớp");
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.student.error);
  const listClass = useSelector((state) => state.class.listClass);
  console.log(listClass);
  const initialValues = {
    oldClass: "",
    newClass: "",
  };

  useEffect(() => {
    dispatch(getAllClass("/class/manager"));
  }, [dispatch]);

  const handleBack = () => {
    history.push("/manager/student");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.oldClass = values.oldClass;
    params.newClass = values.newClass;

    dispatch(transferClass("/student/manager", params, history));
  };

  const validate = Yup.object({
    //email : Yup.string().required("Vui lòng nhập email"),
    //schoolId : Yup.string().required("Vui lòng nhập mã trường"),
    //cmndFamily : Yup.string().required("Vui lòng nhập số CMND/CCCD"),
    //address : Yup.string().max(100, "Địa chỉ nhập tối đa 100 kí tự")
  });

  return (
    <div>
      <hr />
      <Formik
        initialValues={initialValues}
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
              <SelectField label="Lớp cũ" name="oldClass">
                {listClass == null
                  ? null
                  : listClass.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
              </SelectField>
              <SelectField label="Lớp mới" name="newClass">
                {listClass == null
                  ? null
                  : listClass.map((item) => (
                      <option key={item.id} value={item.id}>
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

export default TransferClass;
