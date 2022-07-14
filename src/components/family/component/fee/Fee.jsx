import React, { useEffect, useState, Fragment } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import {
  getAllFeeDebt,
  getFeeBySearch,
} from "../../../../services/fee-service";
import Table from "../../../table/Table";
import { Link } from "react-router-dom";
import moment from "moment";
import { getAllFee } from "./../../../../services/fee-service";
const FeeFamily = () => {
  const dispatch = useDispatch();
  const studentId = localStorage.getItem("username");
  const listFee = useSelector((state) => state.fee.listFee);
  const listFeeDebt = useSelector((state) => state.fee.listFeeDebt);
  console.log(listFee);
  const feeHeader = [
    "STT",
    "Mã Học Phí",

    "Sổ Liên Lạc",
    "Lớp Học",
    "Năm Học",
    "Hạn Nộp",
    "Trạng Thái",
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
    dispatch(getAllFee("/fee/family?status=1"));
    dispatch(getAllFeeDebt("/fee/family?status=0"));
  }, [dispatch]);

  useEffect(() => {}, [listFee]);
  const [search, setSearch] = useState("");
  console.log(listFeeDebt);
  console.log(listFee.length);
  return (
    <Fragment>
      <h4 className="mb-4 text-info text-center">Danh Sách Học Phí Còn Nợ</h4>
      {listFeeDebt != null ? (
        listFeeDebt.map((item) => (
          <Card className="mb-4 text-center">
            <CardContent className="p-3 text-center">
              <h5 className="text-primary">Học sinh : {item.studentId}</h5>
              <h6 className="card-text">
                <TableRow
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "18px",
                    }}
                  >
                    Hạn nộp
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "18px",
                    }}
                  >
                    {moment(item.dateFee).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "18px",
                    }}
                  >
                    Giáo viên chủ nhiệm
                  </TableCell>

                  <TableCell
                    align="right"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "18px",
                    }}
                  >
                    {item.className}
                  </TableCell>
                  <TableCell
                    component="th"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "18px",
                    }}
                    scope="row"
                  >
                    Lớp học
                  </TableCell>

                  <TableCell
                    align="right"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "18px",
                    }}
                  >
                    {item.teacherId}
                  </TableCell>
                  <TableCell
                    component="th"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "18px",
                    }}
                    scope="row"
                  >
                    Học kỳ
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "18px",
                    }}
                  >
                    {item.semester}
                  </TableCell>
                  <TableCell
                    component="th"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "18px",
                    }}
                    scope="row"
                  >
                    Năm học
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "18px",
                    }}
                  >
                    {item.year}
                  </TableCell>
                </TableRow>
              </h6>
            </CardContent>
          </Card>
        ))
      ) : (
        <CardContent className="p-3">
          <h5 className="card-title font-weight-bold font-size-lg">
            Không có thông tin nợ phí
          </h5>
        </CardContent>
      )}
      <hr />
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title text-center text-info">
            <h4>Lịch Sử Đã Nộp</h4>
          </div>
        </div>
        {listFee == null || listFee.length === 0 ? (
          <CardContent className="p-0 text-center ">
            <h4>Không có lịch sử thanh toán</h4>
          </CardContent>
        ) : (
          <div className="table-responsive">
            <Table
              headData={feeHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listFee}
              renderBody={(item, index) => renderBody(item, index)}
            />
          </div>
        )}
        {/* <div className="card-body"> */}
      </Card>
    </Fragment>
  );
};
export default FeeFamily;
