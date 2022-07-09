import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getAllStudent } from "../../../../../services/student-service";
import Table from "../../../../table/Table";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import StudentComponent from "./StudentComponent";

const StudentManager = () => {
  let { id } = useParams();
  if (id == null) id = -1;
  console.log(id);

  const dispatch = useDispatch();

  const studentHeader = [
    "STT",
    "Mã Số",
    "Họ Tên",
    "Lớp",
    "Trường",
    "SDT",
    "Phụ Huynh",
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
      <td>{item.className}</td>
      <td>
        <Link to={"/manager/student/" + item.id}>
          <Button
            className="m-2 text-warning"
            variant="outlined"
            color="default"
          >
            Sửa
          </Button>
        </Link>
        <Link to={"/manager/contactBook/" + item.id}>
          <Button variant="outlined" color="default" className="m-2 text-info">
            Sổ liên lạc
          </Button>
        </Link>
        {/* <button className="btn btn-danger mr-10" onClick={() => handleDelete(item)}>Xóa</button> */}
      </td>
    </tr>
  );
  // const handleDelete = (item) => {
  //   if (
  //     window.confirm("Bạn có muốn xoá thông tin học sinh " + item.id + " ?")
  //   ) {
  //     //eslint-disable-line
  //     dispatch(deleteStudent(item.id));
  //   }
  // };
  useEffect(() => {
    if (id === -1) {
      console.log("id bằng null");
      dispatch(getAllStudent("/student/manager"));
    } else {
      dispatch(getAllStudent(`/student/manager?classId=${id}`));
    }
  }, [dispatch, id]);

  const listStudent = useSelector((state) => state.student.listStudent);
  console.log(listStudent);
  useEffect(() => {}, [listStudent]);

  const [search, setSearch] = useState("");
  const onClickSignIn = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    dispatch(getAllStudent(`/student/manager?studentIdFind=${search}`));
  };
  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <h4>Quản lý học sinh</h4>
          </div>
          <Box className="card-header--actions">
            <Link to="student/add">
              <Button className="m-2" variant="contained" color="primary">
                Thêm mới
              </Button>
            </Link>
            <Link to="student/transfer">
              <Button className="m-2" variant="contained" color="default">
                Chuyển lớp
              </Button>
            </Link>
            <Link to="family">
              <Button className="m-2" variant="contained" color="secondary">
                Phụ huynh học sinh
              </Button>
            </Link>
            <form
              onSubmit={onClickSignIn}
              className="d-none d-sm-inline-block form-inline  ml-10 mb-10 "
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
                {/* <div className="">
                    <button className="btn btn-primary" type="submit">
                      <i className="fas fa-search fa-sm"></i>
                    </button>
                  </div> */}
              </div>
            </form>
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
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
            ) : (
              <div>Chưa có thông tin</div>
            )}

            {/* </div> */}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default StudentManager;
