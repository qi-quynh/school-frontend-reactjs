import React, { useEffect, useState, Fragment } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTeacher,
  deleteTeacher,
} from "../../../../../services/teacher-service";
import Table from "../../../../table/Table";
import { Link } from "react-router-dom";
import TeacherComponent from "./TeacherComponent";

const TeacherManager = () => {
  const dispatch = useDispatch();
  const listTeacher = useSelector((state) => state.teacher.listTeacher);
  console.log(listTeacher);
  const itemsPerPage = 10;
  const [isId, setIsId] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [title, setTitle] = React.useState("Tìm kiếm");
  const header = ["STT", "Id", "Tên", "Email", "CMND", ""];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>

      <td>{item.cmnd}</td>
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
    dispatch(getAllTeacher("/teacher/admin"));
  }, []);

  useEffect(() => {}, [listTeacher]);

  const [search, setSearch] = useState("");
  const onClickSignIn = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    if (isId) dispatch(getAllTeacher(`/teacher/admin?teacherIdFind=${search}`));
    else dispatch(getAllTeacher(`/teacher/admin?teacherNameFind=${search}`));
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };

  const onClickID = (event) => {
    event.preventDefault();
    dispatch(getAllTeacher(`/teacher/admin?teacherIdFind=${search}`));
    setIsId(true);
    setTitle("Tìm theo ID");
    handleClose();
  };
  const onClickName = (event) => {
    event.preventDefault();
    setTitle("Tìm theo tên");
    setIsId(false);
    dispatch(getAllTeacher(`/teacher/admin?teacherNameFind=${search}`));
    handleClose();
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
              <Button
                aria-controls="simple-menu"
                color="success"
                aria-haspopup="true"
                className="mt-2 mr-0"
                onClick={handleClick}
              >
                {title}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={onClickID}>Tìm kiếm theo ID</MenuItem>
                <MenuItem onClick={onClickName}>Tìm kiếm theo tên</MenuItem>
              </Menu>
              <form
                onSubmit={onClickSignIn}
                className="d-none d-sm-inline-block form-inline  ml-14 mb-10 "
              >
                <div className="pr-3 pt-0">
                  <TextField
                    className="ml-2"
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
            <Route
              exact
              component={() => (
                <TeacherComponent
                  data={listTeacher}
                  itemsPerPage={itemsPerPage}
                  // searchByData={searchByData}
                  tableHead={header}
                />
              )}
            />
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default TeacherManager;
