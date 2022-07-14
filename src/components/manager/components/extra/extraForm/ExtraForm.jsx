import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getExtraById,
  resetExtra,
  addExtra,
  updateExtra,
} from "../../../../../services/extra-service";
import moment from "moment";
import { getAllSchool } from "../../../../../services/school-service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";
import { SelectField } from "../../../../formik/SelectField";
import { Multiline12Field } from "../../../../formik/MultilineText12";
import { DatePickerField } from "../../../../formik/DatePicker";
import { getAllContactBook } from "../../../../../services/contactBook-service";
const ExtraForm = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const [title, setTitle] = useState("Thêm hoạt động ngoại khóa");
  const history = useHistory();
  const dispatch = useDispatch();

  const extra = useSelector((state) => state.extra.extra);

  const listSchool = useSelector((state) => state.school.listSchool);
  console.log(extra);
  const initialValues = {
    id: "",
    day: "",
    title: "",
    location: "",
    description: "",
    schoolId: "",
  };

  useEffect(() => {
    const loadExtraEdit = () => {
      dispatch(resetExtra());
      if (id !== -1) {
        dispatch(getExtraById(`/extracurricular-activities/manager/${id}`));
        setTitle("Thông tin hoạt động ngoại khóa");
      }
    };
    loadExtraEdit();
    console.log(extra);

    return () => {
      return [];
    };
  }, [dispatch, id]);

  useDispatch(() => {
    dispatch(getAllSchool("/school/manager"));
  }, [dispatch]);

  const handleBack = () => {
    history.push("/manager/extra");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.location = values.location;
    params.title = values.title;
    params.day = moment(values.day).format("YYYY-MM-DD");
    params.schoolId = values.schoolId;
    params.description = values.description;

    console.log(values);
    if (id === -1) {
      dispatch(
        addExtra("/extracurricular-activities/manager", params, history)
      );
      console.log("add");
    } else {
      params.id = id;
      console.log(params);
      dispatch(
        updateExtra("/extracurricular-activities/manager", params, history)
      );
      console.log("update");
    }

    //handleBack();
  };
  const validate = Yup.object({
    description: Yup.string().max(2000, "Mô tả quá dài"),
  });
  console.log("Danh dách trường");
  console.log(listSchool);
  return (
    <div>
      <Formik
        initialValues={extra || initialValues}
        validationSchema={validate}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize
      >
        <div className="container text-center">
          <h3 className="my-4 font-weight-bold text-info">{title}</h3>
          <Form>
            <div className="row text-center">
              {id === -1 ? (
                <div></div>
              ) : (
                <TextField label="Id" name="id" type="text" readonly="" />
              )}
            </div>
            <div className="row">
              <TextField label="Hoạt động" name="title" type="t" />
              <TextField label="Địa điểm" name="location" type="text" />
            </div>
            <div className="row">
              <TextField label="Thời gian" name="day" type="date" />
              <SelectField label="Trường học" name="schoolId">
                {listSchool == null ? (
                  <div></div>
                ) : (
                  listSchool.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))
                )}
                /
              </SelectField>
            </div>
            <div className="row">
              <Multiline12Field label="Mô tả" name="description" type="text" />
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

export default ExtraForm;
