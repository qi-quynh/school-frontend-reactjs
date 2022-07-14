import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllStudent,
  getStudentBySearch,
} from "../../../../../services/student-service";
import Table from "../../../../table/Table";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import StudentComponent from "./StudentComponent";

const StudentManager = () => {
  // let  id  = useParams();
  // if (id == null) id = -1;
  // console.log(id);

  const dispatch = useDispatch();

  const studentHeader = [
    "STT",
    "Mã số",
    "Họ Tên",
    "Lớp",
    "Trường",
    "Số điện thoại",
    "",
  ];
  const itemsPerPage = 10;
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.schoolId}</td>
      <td>{item.phone}</td>
      <td>{item.className}</td>
      <td>
        <Link to={"/teacher/student/" + item.id}>
          <Button
            className="m-2 text-warning"
            variant="outlined"
            color="default"
          >
            Sửa
          </Button>
        </Link>
        <Link to={"/teacher/contactBook/" + item.id}>
          <Button variant="outlined" color="default" className="m-2 text-info">
            Sổ liên lạc
          </Button>
        </Link>
        {/* <button className="btn btn-danger mr-10" onClick={() => handleDelete(item)}>Xóa</button> */}
      </td>
    </tr>
  );
  useEffect(() => {
    dispatch(getAllStudent("/student/teacher-homeroom"));
  }, [dispatch]);

  const listStudent = useSelector((state) => state.student.listStudent);
  console.log(listStudent);
  useEffect(() => {}, [listStudent]);

  const [search, setSearch] = useState("");
  const onClickSignIn = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    dispatch(
      getAllStudent(`/student/teacher-homeroom?studentIdFind=${search}`)
    );
  };
  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <h4>Quản lý học sinh chủ nhiệm</h4>
          </div>
          <Box className="card-header--actions">
            <form
              onSubmit={onClickSignIn}
              className="d-none d-sm-inline-block form-inline  ml-10 mb-10 "
            >
              <div className="p-1">
                <TextField
                  className="m-2"
                  type="text"
                  id="search-id"
                  placeholder="Tìm kiếm theo ID"
                  name="search"
                  onChange={(event) => onClickSignIn(event)}
                />
              </div>
            </form>
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {listStudent != null ? (
              <Route
                exact
                component={() => (
                  <StudentComponent
                    data={listStudent}
                    itemsPerPage={itemsPerPage}
                    // searchByData={searchByData}
                    tableHead={studentHeader}
                  />
                )}
              />
            ) : null}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default StudentManager;
