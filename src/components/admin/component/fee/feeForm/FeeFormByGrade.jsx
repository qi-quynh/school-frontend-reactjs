import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getFeeById,
  resetFee,
  addFee,
  updateFee,
} from "../../../../../services/fee-service";
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

const FeeForm = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const [title, setTitle] = useState("Thông tin học phí");
  const history = useHistory();
  const dispatch = useDispatch();
  const fee = useSelector((state) => state.fee.fee);
  const error = useSelector((state) => state.fee.error);
  console.log(fee);

  const initialValues = {
    schoolYear: 1,
    gradeId: "",
    semester: "",
    tuitionFee: 0,
    dateFee: "",
  };
  console.log(initialValues);

  const listSemester = [
    {
      name: "HK I",
    },
    {
      name: "HK II",
    },
  ];
  const handleSchoolChange = (values) => {
    console.log(values);
    dispatch(getGradeBySchoolId(values));
  };

  useEffect(() => {
    dispatch(getAllYear());
    //dispatch(getAllSchool('/school/admin'));
    dispatch(getAllGrade("/grade/admin"));
  }, [dispatch]);

  const listGrade = useSelector((state) => state.grade.listGrade);
  //const listSchool = useSelector((state) => state.school.listSchool);
  const listYear = useSelector((state) => state.year.listYear);

  useEffect(() => {
    const loadFeeEdit = async () => {
      await dispatch(resetFee());
      if (id !== -1) {
        await dispatch(getFeeById(id));

        setTitle("Thông tin học phí ID " + id);
      }
    };
    loadFeeEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);

  const handleBack = () => {
    history.push("/admin/fee");
  };

  const handleSubmit = (values) => {
    var params = {};
    params.gradeId = Number(values.gradeId);
    params.dateFee = moment(values.dateFee).format("YYYY-MM-DD");
    params.tuitionFee = values.tuitionFee;
    params.semester = values.semester !== "" ? values.semester : "HK I";

    params.schoolYear =
      values.schoolYear !== "" ? Number(values.schoolYear) : 1;
    dispatch(addFee("/fee/admin", params, history));
    console.log("add");

    //handleBack();
  };
  const validate = Yup.object({
    gradeId: Yup.string().required("Vui lòng chọn khối học"),

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
              {/* {id === -1 ? (
                null
                // <div className="col-md-6">
                //   <label>Trường</label>
                //   <select
                //     className="form-control shadow-none"
                //     onChange={(val) => handleSchoolChange(val.target.value)}
                //   >
                //     {listSchool.map((item) => (
                //       <option key={item.id} value={item.id}>
                //         {item.id} - {item.name}
                //       </option>
                //     ))}
                //   </select>
                // </div>
              ) : (
                <TextField label="Id" name="id" type="text" readonly="" />
              )} */}

              {id === -1 ? (
                <SelectField label="Khối*" name="gradeId">
                  {listGrade.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </SelectField>
              ) : (
                <TextField
                  label="Khối*"
                  name="gradeName"
                  type="text"
                  readonly=""
                />
              )}
              <SelectField label="Học kì*" name="semester">
                {listSemester.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </SelectField>
            </div>
            <div className="row">
              <SelectField label="Năm học*" name="schoolYear">
                {listYear.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </SelectField>
              <TextField label="Hạn nộp" name="dateFee" type="date" />
            </div>
            <div className="row text-center">
              <TextField label="Học phí*" name="tuitionFee" type="number" />
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

export default FeeForm;
