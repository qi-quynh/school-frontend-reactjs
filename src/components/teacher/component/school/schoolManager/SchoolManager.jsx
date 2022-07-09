import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllSchool,
  deleteSchool,
} from "../../../../services/school-service";
import Table from "../../../admin/component/table/Table";
import { Link } from "react-router-dom";

const SchoolManager = () => {
  const dispatch = useDispatch();
  const listSchool = useSelector((state) => state.school.listSchool);
  console.log(listSchool);
  const schoolTableHeader = ["STT", "Id", "Tên Trường", "Địa Chỉ", "Cấp", ""];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.address}</td>
      <td>{item.type}</td>
      <td>
        <Link to={"school/" + item.id}>
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
    if (window.confirm("Bạn có muốn xóa thông tin trường " + item.id + " ?")) {
      //eslint-disable-line
      dispatch(deleteSchool(item.id));
    }
  };
  useEffect(() => {
    dispatch(getAllSchool('/school/manager'));
  }, [dispatch]);

  useEffect(() => {}, [listSchool]);

  return (
    <div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="card-table">
          <div className="card-table-header">
            <h3 className="title">Quản lý trường học</h3>
          </div>
          <Link to="school/add">
            <button className="btn mb-10 btn-primary">Thêm mới</button>
          </Link>
          <div className="card-body">
            <Table
              headData={schoolTableHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listSchool}
              renderBody={(item, index) => renderBody(item, index)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SchoolManager;
