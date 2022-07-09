import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllGrade,
  deleteGrade,
} from "../../../../../services/grade-service";

import Table from "../../../../table/Table";
import { Link } from "react-router-dom";

const GradeManager = () => {
  const dispatch = useDispatch();
  const listGrade = useSelector((state) => state.grade.listGrade);
  console.log(listGrade);
  const schoolTableHeader = ["STT", "ID", "Tên", "Trường", ""];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>
        {item.schoolId} - {item.schoolName}
      </td>
      <td>
        <Link to={"grade/" + item.id}>
          <button className="btn-a btn btn-warning mr-10">Sửa</button>
        </Link>
        <button
          className="btn btn-danger mr-10"
          onClick={() => handleDelete(item)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
  const handleDelete = (item) => {
    if (
      window.confirm(
        "Bạn muốn xóa thông tin khối " +
          item.name +
          " trường " +
          item.schoolId +
          "?"
      )
    ) {
      
      dispatch(deleteGrade(`/grade/admin?id=${item.id}`, item.id));
    }
  };
  useEffect(() => {
    dispatch(getAllGrade('/grade/admin'));
  }, [dispatch]);

  useEffect(() => {}, [listGrade]);

  return (
    <div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="card-table">
          <div className="card-table-header">
            <h4 className="title">Quản lý khối</h4>
          </div>
          <Link to="grade/add">
            <button className="btn mb-10 btn-primary">Thêm mới</button>
          </Link>
          <div className="card-body">
            <Table
              headData={schoolTableHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listGrade}
              renderBody={(item, index) => renderBody(item, index)}
            />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
export default GradeManager;
