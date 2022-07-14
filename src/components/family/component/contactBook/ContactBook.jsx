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
import { useHistory, useParams } from "react-router";
import { getAllContactBook } from "./../../../../services/contactBook-service";
import { getAllMark } from "../../../../services/mark-service";
import { getStudentById } from "../../../../services/student-service";

const ContactBook = () => {
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const dispatch = useDispatch();
  const studentId = localStorage.getItem("username");
  const listContactBook = useSelector(
    (state) => state.contactBook.listContactBook
  );
  console.log(listContactBook);
  const contactBookHeader = [
    "STT",
    "GVCN",
    "Học kì",
    "Năm học",
    "Lớp",
    "Điểm Trung Bình",
    "",
  ];
  const listMark = useSelector((state) => state.mark.listMark);
  const student = useSelector((state) => state.student.student);
  const markTableHeader = ["STT", "Lớp", "Năm học", "Môn học", "Điểm"];
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
      <td style={{ paddingLeft: "20px", color: "orange" }}>
        {item.markStudentMark}
      </td>
    </tr>
  );
  const handleClick = (value) => {
    console.log(value);
    dispatch(getAllMark(`/mark-student/family?contactBookId=${value}`));
  };
  const handleSeeAll = () => {
    dispatch(getAllMark(`/mark-student/family`));
  };
  useEffect(() => {
    dispatch(getAllContactBook(`/contact-book/family?studentId=${id}`));
    dispatch(getStudentById(`/student/family/${id}`));
  }, [dispatch, id]);

  useEffect(() => {}, [listContactBook]);
  console.log(student);
  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title text-info text-center">
            <h4>Thông tin sổ liên lạc của {student.name} </h4>
            <div className="text-secondary">
              Mã Học Sinh :<span className="text-secondary"> {student.id}</span>{" "}
            </div>

            <div className="text-secondary">
              Lớp Học : {student.className} - Trường : {student.schoolName}
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
