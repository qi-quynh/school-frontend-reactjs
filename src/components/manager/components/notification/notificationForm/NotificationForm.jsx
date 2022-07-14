import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationById,
  resetNotification,
  addNotification,
  updateNotification,
} from "../../../../../services/notification-service";
import { getAllExtra } from "../../../../../services/extra-service";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";
import { SelectField } from "../../../../formik/SelectField";
import { getAllSchool } from "../../../../../services/school-service";
import { Multiline12Field } from "../../../../formik/MultilineText12";

const NotificationForm = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const [title, setTitle] = useState("Thêm thông báo ");

  const history = useHistory();
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.notification);
  const [status, setStatus] = useState();
  const listSchool = useSelector((state) => state.school.listSchool);
  const listExtra = useSelector((state) => state.extra.listExtra);
  const listObject = [
    {
      id: 1,
      title: "Học sinh",
    },
    {
      id: 2,
      title: "Giáo viên",
    },
    {
      id: 3,
      title: "Quản lý trường",
    },

    {
      id: 5,
      title: "Giáo viên và học sinh",
    },
    {
      id: 6,
      title: "Quản lý trường và giáo viên",
    },
  ];
  const listStatus = [
    {
      id: "WAIT",
      name: "Đang xử lý",
    },
    {
      id: "APPROVE",
      name: "Đã xác nhận",
    },
    {
      id: "CANCEL",
      name: "Đã hủy",
    },
  ];
  console.log(notification);
  const initialValues = {
    idNotification: "",
    titleNotification: "",
    extracurricularActivitiesId: "",
    description: "",
    object: 1,
  };
  useEffect(() => {
    dispatch(getAllExtra("/extracurricular-activities/manager"));
    dispatch(getAllSchool("/school/manager"));
  }, [dispatch]);

  useEffect(() => {
    const loadNotificationEdit = async () => {
      await dispatch(resetNotification());
      if (id !== -1) {
        await dispatch(getNotificationById(`/notification/manager/${id}`));
        console.log(notification.StatusNotification);
        setStatus(notification.StatusNotification);
        setTitle("Thông tin thông báo ");
      }
    };
    loadNotificationEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);

  const handleBack = () => {
    history.push("/manager/notification");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.title = values.titleNotification;
    params.extracurricularActivitiesId = values.extracurricularActivitiesId;
    params.description = values.description;
    params.schoolId = values.schoolId;
    params.status = values.StatusNotification;
    params.object = Number(values.object);
    console.log("submit");
    if (id === -1) {
      dispatch(addNotification("/notification/manager", params, history));
      console.log("add");
      console.log(params);
    } else {
      params.id = Number(id);
      dispatch(updateNotification("/notification/manager", params, history));
      console.log("update");
      console.log(params);
    }
  };
  const validate = Yup.object({
    titleNotification: Yup.string()
      .required("Vui lòng nhập tiêu đề")
      .max(400, "Vui lòng nhập tối đa 400 kí tự")
      .matches(/[0-9a-zA-Z]/, "Vui lòng không nhập kí tự đăc biệt"),
    description: Yup.string().max(4000, "Vui lòng nhập tối đa 4000 kí tự"),
  });

  return (
    <div>
      <hr />
      <Formik
        initialValues={notification || initialValues}
        validationSchema={validate}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize
      >
        <div className="container text-center">
          <h4 className="my-4 font-weight-bold text-info">{title}</h4>
          <Form>
            <div className="row">
              <TextField
                label="Tiêu đề*"
                name="titleNotification"
                type="text"
              />
              <SelectField label="Áp dụng" name="object" type="number">
                {listObject == null
                  ? null
                  : listObject.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
              </SelectField>
            </div>
            <div className="row">
              <SelectField
                label="Ngoại khóa"
                name="extracurricularActivitiesId"
              >
                {listExtra == null
                  ? null
                  : listExtra.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
              </SelectField>
              <SelectField label="Trường học" name="schoolId">
                {listSchool.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </SelectField>
            </div>
            <div className="row"></div>
            <div className="row">
              <Multiline12Field
                label="Mô tả"
                name="description"
                type="number"
              />
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

export default NotificationForm;
