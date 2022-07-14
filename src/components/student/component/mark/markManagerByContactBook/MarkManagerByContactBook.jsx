import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button, ButtonGroup } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getAllMark } from "../../../../../services/mark-service";
import Table from "../../../../table/Table";
import { Link } from "react-router-dom";
import { getStudentById } from "../../../../../services/student-service";
import Student from "./../../../Student";

import { useHistory, useParams } from "react-router";
const MarkManagerByContactBook = () => {
  let { id } = useParams();
  const studentId = localStorage.getItem("username");
  const dispatch = useDispatch();
  const listMark = useSelector((state) => state.mark.listMark);
  console.log(listMark);
  const student = useSelector((state) => state.student.student);
  const markTableHeader = ["STT", "Lớp", "Năm học", "Môn học", "Điểm"];
  useEffect(() => {
    dispatch(getAllMark(`/mark-student/student?contactBookId=${id}`));
  }, [dispatch, id]);

  useEffect(() => {}, [listMark]);
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>

      <td>{item.className}</td>
      <td>
        {item.semester} - {item.yearName}{" "}
      </td>

      <td>{item.subjectName}</td>
      <td>{item.markStudentMark}</td>
    </tr>
  );

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header--title">
          <h5 className="text-info text-center">Xem điểm</h5>
          <div className="text-secondary text-center">
            {student.name} [Mã số: {student.id}]
            <br />
          </div>
        </div>
      </Card>
      <Card className="card-box mb-4">
        <div className="card-header"></div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            <Table
              headData={markTableHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listMark}
              renderBody={(item, index) => renderBody(item, index)}
            />
            {/* </div> */}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default MarkManagerByContactBook;
