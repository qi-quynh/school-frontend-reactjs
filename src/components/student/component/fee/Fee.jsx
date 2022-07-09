import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { getFeeBySearch } from "../../../../services/fee-service";
import Table from "../../../table/Table";
import { Link } from "react-router-dom";
import moment from "moment";
import { getAllFee } from "./../../../../services/fee-service";
const Fee = () => {
  const dispatch = useDispatch();
  const studentId = localStorage.getItem("username");
  const listFee = useSelector((state) => state.fee.listFee);
  console.log(listFee);
  const feeHeader = [
    "STT",
    "Mã HP",

    "SLL",
    "Lớp",
    "Năm học",
    "Hạn nộp",
    "Trạng thái",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.contactBookId}</td>
      <td>{item.className}</td>
      <td>
        {item.semester} - {item.year}
      </td>
      <td>{moment(item.dateFee).format("DD/MM/YYYY")}</td>
      <td>{item.status ? "Đã Đóng" : "Chưa đóng"}</td>
    </tr>
  );

  useEffect(() => {
    dispatch(getAllFee("/fee/student"));
  }, [dispatch]);

  useEffect(() => {}, [listFee]);
  const [search, setSearch] = useState("");

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title text-center text-info">
            <h4>Quản lý học phí</h4>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {listFee != null ? (
              <Table
                headData={feeHeader}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={listFee}
                renderBody={(item, index) => renderBody(item, index)}
              />
            ) : (
              <div>Chưa có thông tin</div>
            )}
            {/* <div className="card-body"> */}

            {/* </div> */}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default Fee;
