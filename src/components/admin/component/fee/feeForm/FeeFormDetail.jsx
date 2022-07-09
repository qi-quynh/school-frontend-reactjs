import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getFeeById,
  resetFee,
  addFee,
  updateFee,
} from "../../../../../services/fee-service";
import { getAllContactBook } from "../../../../../services/contactBook-service";
import { getAllYear } from "../../../../../services/year-service";
import { getAllSchool } from "../../../../../services/school-service";
import {
  getAllGrade,
  getGradeBySchoolId,
} from "../../../../../services/grade-service";
import moment from "moment";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../../../formik/TextField";
import { SelectField } from "../../../../formik/SelectField";
import { MultilineField } from "../../../../formik/MultilineText";

const FeeFormDetail = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const [title, setTitle] = useState("Thông tin học phí");
  const history = useHistory();
  const dispatch = useDispatch();
  const fee = useSelector((state) => state.fee.fee);
  const error = useSelector((state) => state.fee.error);
  const listContactBook = useSelector(
    (state) => state.contactBook.listContactBook
  );
  console.log(fee);
  const initialValues = {
    id: "",
    contactBookId: "",
    dateFee: "",
    tuitionFee: "",
    status: "",
  };
  const listSemester = [
    {
      name: "HK I",
    },
    {
      name: "HK II",
    },
  ];
  const listStatus = [
    {
      value: false,
      name: "Chưa đóng",
    },
    {
      value: true,
      name: "Đã đóng",
    },
  ];

  useEffect(() => {
    const loadFeeEdit = async () => {
      dispatch(resetFee());
      if (id !== -1) {
        dispatch(getFeeById(`/fee/admin/${id}`));

        setTitle("Thông tin học phí  " + id);
      }
    };
    loadFeeEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getAllContactBook());
  }, [dispatch]);

  const handleBack = () => {
    history.push("/admin/fee");
  };

  const handleSubmit = (values) => {
    var params = {};

    params.contactBookId = values.contactBookId;

    params.dateFee = moment(values.dateFee).format("YYYY-MM-DD");
    params.tuitionFee = values.tuitionFee;
    params.semester = values.semester !== "" ? values.semester : "HK I";
    // params.semester = values.semester !== "" ? values.semester : "HK I";
    params.status = values.status;
    if (id === -1) {
      dispatch(addFee("/fee/admin", params, history));
      console.log("add");
    } else {
      params.id = id;
      console.log(params);
      dispatch(updateFee("/fee/admin", params, history));
      console.log("update");
    }

    //handleBack();
  };
  const validate = Yup.object({
    contactBookId: Yup.string().required("Vui lòng chọn mã sổ liên lạc"),
    tuitionFee: Yup.number()

      .min(0, "Vui lòng nhập học phí lớn hơn 0 VND")
      .max(5000000000, "Vui lòng nhập học phí dưới 500 triệu VND"),
  });

  return (
    <div>
      <Formik
        initialValues={fee || initialValues}
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
                <SelectField label="Sổ liên lạc*" name="contactBookId">
                  {listContactBook == null ? (
                    <div></div>
                  ) : (
                    listContactBook.map((item) => (
                      <option key={item.id} value={item.id}>
                        SLL : {item.id} - HS: {item.studentName}
                      </option>
                    ))
                  )}
                </SelectField>
              ) : (
                <TextField
                  label="Sổ liên lạc*"
                  name="contactBookId"
                  type="text"
                  readonly=""
                />
              )}
              {id === -1 ? (
                <TextField label="Học phí*" name="tuitionFee" type="number" />
              ) : (
                <TextField label="Id" name="id" type="text" readonly="" />
              )}
            </div>
            <div className="row">
              <SelectField label="Trạng thái" name="status">
                {listStatus.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </SelectField>
              <TextField label="Hạn nộp" name="dateFee" type="date" />
            </div>
            <div className="row text-center">
              {id === -1 ? (
                <SelectField label="Học kì*" name="semester">
                  {listSemester == null ? (
                    <div></div>
                  ) : (
                    listSemester.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))
                  )}
                </SelectField>
              ) : (
                <TextField label="Học phí" name="tuitionFee" type="number" />
              )}
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

export default FeeFormDetail;
