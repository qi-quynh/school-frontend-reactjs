import React, { useEffect, useState, Fragment } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Menu,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../../table/Table";

import { getAllContactBook } from "./../../../../services/contactBook-service";
import { getStudentById } from "../../../../services/student-service";
import { Link } from "react-router-dom";
import { getAllMark } from "../../../../services/mark-service";

const ContactBook = () => {
  const dispatch = useDispatch();
  const studentId = localStorage.getItem("username");
  const listContactBook = useSelector(
    (state) => state.contactBook.listContactBook
  );
  const listMark = useSelector((state) => state.mark.listMark);
  console.log(listContactBook);
  const student = useSelector((state) => state.student.student);
  const markTableHeader = ["STT", "Lớp", "Năm học", "Môn học", "Điểm"];
  const contactBookHeader = [
    "STT",
    "Năm học",
    "Học kì",
    "Giáo viên chủ nhiệm",
    "Lớp",
    "Điểm Trung Bình",
    "",
  ];
  const handleClick = (value) => {
    console.log(value);
    dispatch(getAllMark(`/mark-student/student?contactBookId=${value}`));
  };
  const handleSeeAll = () => {
    dispatch(getAllMark(`/mark-student/student`));
  };
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.yearName}</td>
      <td>{item.semester}</td>
      <td>{item.teacherName}</td>
      <td>{item.className}</td>
      <td style={{ paddingLeft: "70px", color: "orange" }}>{item.mark}</td>
      <td>
        <Button
          value={item.id}
          variant="outlined"
          color="default"
          className="m-2 text-info"
          onClick={() => handleClick(item.id)}
        >
          Xem điểm
        </Button>
      </td>
    </tr>
  );
  const renderBodyMark = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>

      <td>{item.className}</td>
      <td>
        {item.semester} - {item.yearName}{" "}
      </td>

      <td>{item.subjectName}</td>
      <td style={{ paddingLeft: "70px", color: "orange" }}>
        {item.markStudentMark}
      </td>
    </tr>
  );
  useEffect(() => {
    dispatch(getAllContactBook("/contact-book/student"));
    dispatch(getStudentById("/student/student"));
    dispatch(getAllMark("/mark-student/student"));
  }, [dispatch, studentId]);

  useEffect(() => {}, [listContactBook]);

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title text-info text-center">
            <h4>Thông tin sổ liên lạc của {student.name}</h4>
            <dispatchEvent className="text-secondary">
              Mã Học Sinh :
              <span style={{ fontWeight: 600 }}> {student.id}</span>{" "}
            </dispatchEvent>

            <div className="text-secondary">
              Đang học lớp {student.className} - Trường {student.schoolName}
            </div>
            <div className="text-secondary">
              {" "}
              Giáo Viên Chủ Nhiệm : {student.teacherName}
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            <Table
              headData={contactBookHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listContactBook}
              renderBody={(item, index) => renderBody(item, index)}
            />
            {/* </div> */}
          </div>
        </CardContent>
      </Card>

      <Card className="card-box mb-1">
        <div className="card-header text-center text-success">
          <Button
            color="default"
            className="text-success"
            onClick={() => handleSeeAll()}
          >
            Bảng Điểm
          </Button>
        </div>
        <div></div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            <Table
              headData={markTableHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listMark}
              renderBody={(item, index) => renderBodyMark(item, index)}
            />
            {/* </div> */}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default ContactBook;
