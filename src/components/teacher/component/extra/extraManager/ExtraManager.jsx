import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllExtra,
  deleteExtra,
} from "../../../../../services/extra-service";
import Table from "../../../../table/Table";
import { Link } from "react-router-dom";
import moment from "moment";
const ExtraManager = () => {
  const dispatch = useDispatch();
  const listExtra = useSelector((state) => state.extra.listExtra);
  console.log(listExtra);
  const extraTableHeader = [
    "STT",
    "Mã HĐ",
    "Hoạt động",
    "Thời gian",
    "Trường",

    "",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{moment(item.day).format("DD/MM/YYYY")}</td>
      <td>{item.schoolId}</td>

      <td>
        <Link to={"extra/" + item.id}>
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
      window.confirm("Bạn có muốn xoá thông tin hoạt động " + item.id + " ?")
    ) {
      //eslint-disable-line
      dispatch(deleteExtra(item.id));
    }
  };
  useEffect(() => {
    dispatch(getAllExtra());
  }, [dispatch]);

  useEffect(() => {}, [listExtra]);

  return (
    <div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="card-table">
          <div className="card-table-header">
            <h3 className="title">Quản lý hoạt động ngoại khóa</h3>
          </div>
          <Link to="extra/add">
            <button className="btn mb-10 btn-primary">Thêm mới</button>
          </Link>
          <div className="card-body">
            <Table
              headData={extraTableHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listExtra}
              renderBody={(item, index) => renderBody(item, index)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExtraManager;
