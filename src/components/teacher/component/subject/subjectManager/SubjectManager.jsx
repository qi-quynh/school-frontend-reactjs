import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllSubject,
  deleteSubject,
} from "../../../../../services/subject-service";
import Table from "../../../../table/Table";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
const SubjectManager = () => {
  const dispatch = useDispatch();
  const listSubject = useSelector((state) => state.subject.listSubject);
  console.log(listSubject);
  const subjectTableHeader = ["STT", "Mã môn", "Môn học", ""];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.name}</td>

      <td>
        <Link to={"subject/" + item.id}>
          <button className="btn-a btn btn-warning mr-10">Sửa</button>
        </Link>
        {/* <button className="btn btn-danger mr-10" onClick={() => handleDelete(item)}>Xóa</button> */}
      </td>
    </tr>
  );
  const handleDelete = (item) => {
    if (window.confirm("Bạn có muốn xóa thông tin môn học " + item.id + " ?")) {
      //eslint-disable-line
      dispatch(deleteSubject(item.id));
    }
  };
  useEffect(() => {
    dispatch(getAllSubject());
  }, [dispatch]);

  useEffect(() => {}, [listSubject]);

  return (
    <div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="card-table">
          <div className="card-table-header">
            <h3 className="title">Quản lý môn học</h3>
          </div>
          <Link to="subject/add">
            <button className="btn mb-10 btn-success">Thêm mới</button>
          </Link>
          <div className="card-body">
            <Table
              headData={subjectTableHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listSubject}
              renderBody={(item, index) => renderBody(item, index)}
            />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
export default SubjectManager;
