import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllYear, deleteYear } from "../../../../../services/year-service";
import Table from "../../../../table/Table";
import { Link } from "react-router-dom";

const YearManager = () => {
  const dispatch = useDispatch();
  const listYear = useSelector((state) => state.year.listYear);
  console.log(listYear);
  const yearTableHeader = ["STT", "ID", "Năm học"];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.name}</td>
      {/* <td>
                <Link to={'schoolYear/' + item.id}>
                    <button className="btn-a btn btn-warning mr-10">Sửa</button>
                </Link>
            </td> */}
    </tr>
  );

  useEffect(() => {
    dispatch(getAllYear());
  }, [dispatch]);

  useEffect(() => {}, [listYear]);

  return (
    <div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="card-table">
          <div className="card-table-header">
            <h3 className="title">Quản lý năm học</h3>
          </div>
          <Link to="schoolYear/add">
            <button className="btn mb-10 btn-primary">Thêm mới</button>
          </Link>
          <div className="card-body">
            <Table
              headData={yearTableHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listYear}
              renderBody={(item, index) => renderBody(item, index)}
            />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
export default YearManager;
