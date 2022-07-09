import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllFamily,
  deleteFamily,
} from "../../../../../services/family-service";
import Table from "../../../../table/Table";
import { Link } from "react-router-dom";

const FamilyManager = () => {
  const dispatch = useDispatch();
  const listFamily = useSelector((state) => state.family.listFamily);
  console.log(listFamily);
  const familyTableHeader = [
    "STT",
    "Số CMND/CCCD",
    "Họ Tên",
    "Mối quan hệ",
    "",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.cmnd}</td>
      <td>{item.name}</td>
      <td>{item.relationShip}</td>
      <td>
        <Link to={"family/" + item.cmnd}>
          <button className="btn-a btn btn-warning mr-10">Sửa</button>
        </Link>
        {/* <button
          className="btn btn-danger mr-10"
          onClick={() => handleDelete(item)}
        >
          Xóa
        </button> */}
      </td>
    </tr>
  );
  const handleDelete = (item) => {
    if (window.confirm("Bạn có muốn xóa thông tin " + item.id + " ?")) {
      //eslint-disable-line
      dispatch(deleteFamily(item.id));
    }
  };
  useEffect(() => {
    dispatch(getAllFamily());
  }, [dispatch]);

  useEffect(() => {}, [listFamily]);

  return (
    <div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="card-table">
          <div className="card-table-header">
            <h3 className="title">Quản lý phụ huynh</h3>
          </div>
          <Link to="family/add">
            <button className="btn mb-10 btn-primary">Thêm mới</button>
          </Link>
          <div className="card-body">
            <Table
              headData={familyTableHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listFamily}
              renderBody={(item, index) => renderBody(item, index)}
            />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
export default FamilyManager;
