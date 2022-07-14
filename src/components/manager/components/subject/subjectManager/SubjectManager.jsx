import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllSubject,
  deleteSubject,
} from "../../../../../services/subject-service";
import Table from "../../../../table/Table";
import { Link, Route } from "react-router-dom";
import { Formik, Form } from "formik";
import SubjectComponent from "../../../../admin/component/subject/subjectManager/SubjectComponent";
const SubjectManager = () => {
  const dispatch = useDispatch();
  const listSubject = useSelector((state) => state.subject.listSubject);
  console.log(listSubject);
  const itemsPerPage = 10;
  const subjectHeader = ["STT", "Mã môn", "Môn học", ""];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.name}</td>

      <td>
        <Link to={"subject/" + item.id}>
          <Button variant="outlined" color="default" className="m-2 text-info">
            Sửa
          </Button>
        </Link>
        {/* <button className="btn btn-danger mr-10" onClick={() => handleDelete(item)}>Xóa</button> */}
      </td>
    </tr>
  );
  const handleDelete = (item) => {
    if (window.confirm("Bạn có muốn xóa thông tin môn học " + item.id + " ?")) {
      //eslint-disable-line
      dispatch(deleteSubject(item.id));
    }
  };
  useEffect(() => {
    dispatch(getAllSubject());
  }, [dispatch]);

  useEffect(() => {}, [listSubject]);

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <h4>Quản lý môn học</h4>
          </div>
          <Box className="card-header--actions">
            <Link to="subject/add">
              <Button className="m-2" variant="contained" color="primary">
                Thêm mới
              </Button>
            </Link>
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            {listSubject != null ? (
              <Route
                exact
                component={() => (
                  <SubjectComponent
                    data={listSubject}
                    itemsPerPage={itemsPerPage}
                    // searchByData={searchByData}
                    tableHead={subjectHeader}
                  />
                )}
              />
            ) : null}
            {/* </div> */}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default SubjectManager;
