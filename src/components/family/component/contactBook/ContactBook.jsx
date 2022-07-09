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

const ContactBook = () => {
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
    "Điểm TB",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.teacherName}</td>
      <td>{item.semester}</td>
      <td>{item.yearName}</td>
      <td>{item.className}</td>
      <td>{item.mark}</td>
    </tr>
  );
  useEffect(() => {
    dispatch(getAllContactBook("/contact-book/student"));
  }, [dispatch, studentId]);

  useEffect(() => {}, [listContactBook]);

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title text-info text-center">
            <h4>Thông tin sổ liên lạc</h4>
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
    </Fragment>
  );
};
export default ContactBook;
