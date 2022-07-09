import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllSubject,
  deleteSubject,
} from "../../../../../services/subject-service";
import Table from "../../../../table/Table";
import { Link } from "react-router-dom";
import { getAllCourse } from "../../../../../services/course-service";
import { deleteCourseSuccess } from "../../../../../actions/course-actions";
import { Route } from "react-router";
import CourseComponent from "./CourseComponent";
const CourseManager = () => {
  const dispatch = useDispatch();
  const listCourse = useSelector((state) => state.course.listCourse);
  console.log(listCourse);
  console.log("Course Manager");
  const itemsPerPage = 10;
  const header = [
    "STT",
    "Tên khóa học",
    "Khối học",
    "Lớp học",
    "Mã giáo viên",
    "Tên giáo viên",
    "Môn học",
    "",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.nameCources}</td>
      <td>{item.gradeName}</td>
      <td>{item.className}</td>
      <td>{item.teacherId}</td>
      <td>{item.teacherName}</td>

      <td>
        <Link to={"course/" + item.idCources}>
          <Button
            variant="outlined"
            color="default"
            className="m-2 text-warning"
          >
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
      dispatch(deleteCourseSuccess(item.id));
    }
  };
  useEffect(() => {
    dispatch(getAllCourse("/cource/manager"));
  }, [dispatch]);

  useEffect(() => {}, [listCourse]);

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <h4>Quản lý khóa học</h4>
          </div>
          <Box className="card-header--actions">
            <Link to="course/add">
              <Button className="m-2" variant="contained" color="primary">
                Thêm mới
              </Button>
            </Link>
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}

            <Route
              exact
              component={() => (
                <CourseComponent
                  data={listCourse}
                  itemsPerPage={itemsPerPage}
                  // searchByData={searchByData}
                  tableHead={header}
                />
              )}
            />
            {/* </div> */}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default CourseManager;
