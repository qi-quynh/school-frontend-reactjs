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
  const listSchool = useSelector((state) => state.school.listSchool);
  const listExtra = useSelector((state) => state.extra.listExtra);
  console.log(notification);
  const initialValues = {
    idNotification: "",
    titleNotification: "",
    idExtracurricularActivities: "",
    description: "",
  };
  useEffect(() => {
    dispatch(getAllExtra("/extracurricular-activities/admin"));
    dispatch(getAllSchool("/school/admin"));
  }, [dispatch]);

  useEffect(() => {
    const loadNotificationEdit = async () => {
      await dispatch(resetNotification());
      if (id !== -1) {
        await dispatch(getNotificationById(`/notification/admin/${id}`));
        console.log(getNotificationById(`/notification/admin/${id}`));

        setTitle("Thông tin thông báo ");
      }
    };
    loadNotificationEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);

  const handleBack = () => {
    history.push("/admin/notification");
  };
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
      title: "Toàn bộ",
    },
    {
      id: 6,
      title: "Giáo viên và học sinh",
    },
    {
      id: 7,
      title: "Quản lý trường và giáo viên",
    },
  ];
  const handleSubmit = (values) => {
    var params = {};
    params.title = values.titleNotification;
    params.idExtracurricularActivities = values.idExtracurricularActivities;
    params.description = values.descriptionNotification;
    params.object = values.object ?? 1;
    console.log("submit");
    if (id === -1) {
      dispatch(addNotification("/notification/admin", params, history));
      console.log("add");
    } else {
      params.id = id;
      dispatch(updateNotification("/notification/admin", params, history));
      console.log("update");
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
            {id === -1 ? (
              <div>
                <div className="row">
                  <TextField
                    label="Tiêu đề*"
                    name="titleNotification"
                    type="text"
                  />
                  <SelectField
                    label="Ngoại khóa"
                    name="idExtracurricularActivities"
                  >
                    {listExtra == null ? (
                      <div></div>
                    ) : (
                      listExtra.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title}
                        </option>
                      ))
                    )}
                    {/* {listExtra.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))} */}
                  </SelectField>
                </div>
              </div>
            ) : (
              <div>
                <div className="row">
                  <TextField
                    label="Id"
                    name="idNotification"
                    type="text"
                    readonly=""
                  />
                  <TextField
                    label="Tiêu đề*"
                    name="titleNotification"
                    type="text"
                  />
                </div>
                <div className="row">
                  <TextField
                    label="Ngoại khóa"
                    name="idExtracurricularActivities"
                    type="text"
                    readonly=""
                  />
                </div>
              </div>
            )}
            <div className="row">
              <SelectField label="Áp dụng" name="object" type="number">
                {listObject.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </SelectField>
            </div>

            <div className="row">
              <Multiline12Field
                label="Mô tả"
                name="descriptionNotification"
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
