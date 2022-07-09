import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button, TextField } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllTeacher,
  deleteTeacher,
  getTeacherBySearch,
} from "../../../../../services/teacher-service";

import Table from "../../../../table/Table";
import { Link } from "react-router-dom";
import { Route } from "react-router";
import TeacherComponent from "./TeacherComponet";

const TeacherManager = () => {
  const dispatch = useDispatch();
  const listTeacher = useSelector((state) => state.teacher.listTeacher);
  console.log(listTeacher);
  const teacherHeader = [
    "STT",
    "Id",
    "Tên",
    "Email",
    "Trường",
    "Số ĐT",
    "CMND",
    "Quyền",
    "",
  ];
  const itemsPerPage = 10;
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.schoolId}</td>
      <td>{item.phone}</td>
      <td>{item.cmnd}</td>
      <td>{item.roleName}</td>
      <td>
        {/* <Link to={"list-of-students-by-teacher/" + item.id}>
          <button className="btn-a btn btn-info mr-10">Học sinh</button>
        </Link> */}
        <Link to={"teacher/" + item.id}>
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
    if (
      window.confirm("Bạn có muốn xoá thông tin giáo viên " + item.id + " ?")
    ) {
      //eslint-disable-line
      dispatch(deleteTeacher(item.id));
    }
  };
  useEffect(() => {
    dispatch(getAllTeacher("/teacher/manager"));
  }, []);

  useEffect(() => {}, [listTeacher]);

  const [search, setSearch] = useState("");
  const onClickSignIn = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    dispatch(getAllTeacher(`/teacher/manager?teacherIdFind=${search}`));
  };
  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <h4>Quản lý giáo viên</h4>
          </div>
          <Box className="card-header--actions">
            <div>
              <Link to="teacher/add">
                <Button className="m-2" variant="contained" color="primary">
                  Thêm mới
                </Button>
              </Link>
              <form
                onSubmit={onClickSignIn}
                className="d-none d-sm-inline-block form-inline  ml-14 mb-10 "
              >
                <div className="p-3">
                  <TextField
                    className="m-2"
                    type="text"
                    id="search-id"
                    placeholder="Tìm kiếm"
                    name="search"
                    onChange={(event) => onClickSignIn(event)}
                  />
                </div>
              </form>
            </div>
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}

            {listTeacher != null ? (
              <Route
                exact
                component={() => (
                  <TeacherComponent
                    data={listTeacher}
                    itemsPerPage={itemsPerPage}
                    // searchByData={searchByData}
                    tableHead={teacherHeader}
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
export default TeacherManager;
