import React, { useEffect, useState, Fragment } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  ButtonGroup,
  TextField,
  Menu,
  MenuItem,
} from "@material-ui/core";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
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
  const [isId, setIsId] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [title, setTitle] = React.useState("Tìm kiếm");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [search, setSearch] = useState("");
  const onClickSignIn = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    if (isId)
      dispatch(getAllStudent(`/student/manager?studentIdFind=${search}`));
    else dispatch(getAllStudent(`/student/manager?studentNameFind=${search}`));
  };

  const onClickID = (event) => {
    event.preventDefault();
    dispatch(getAllStudent(`/student/manager?studentIdFind=${search}`));
    setIsId(true);
    setTitle("Tìm theo ID");
    handleClose();
  };
  const onClickName = (event) => {
    event.preventDefault();
    setTitle("Tìm theo tên");
    setIsId(false);
    dispatch(getAllStudent(`/student/manager?studentNameFind=${search}`));
    handleClose();
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
            <ButtonGroup
              aria-controls="simple-menu"
              color="success"
              aria-haspopup="true"
              className="mt-2 mb-2 ml-2 mr-0"
              aria-label="split button"
            >
              <Button>{title}</Button>
              <Button
                color="primary"
                size="small"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
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
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            {listStudent == null || listStudent.length === 0 ? (
              <div className="p-3">Không có dữ liệu học sinh</div>
            ) : (
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
            )}

            {/* </div> */}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default StudentManager;
