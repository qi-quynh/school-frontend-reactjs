import React, { useEffect, useState, Fragment } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  ButtonGroup,
  Menu,
  MenuItem,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllMark,
  getMarkByStudentId,
  getMarkByContactBookId,
} from "../../../../../services/mark-service";
import Table from "../../../../table/Table";
import { useParams } from "react-router";

import { Link, Route } from "react-router-dom";
import MarkComponent from "./MarkComponent";
const MarkManager = () => {
  let { id } = useParams();
  if (id == null) id = -1;
  console.log(id);

  const dispatch = useDispatch();
  const listMark = useSelector((state) => state.mark.listMark);
  console.log(listMark);
  const header = [
    "STT",
    "Môn học",
    "Mã học sinh",
    "Họ tên",
    "Lớp",
    "Năm học",
    "Điểm",
    "",
  ];

  useEffect(() => {
    if (id === -1) {
      console.log("id bằng null");

      dispatch(getAllMark("/mark-student/manager"));
    } else {
      dispatch(
        getMarkByContactBookId(`/mark-student/manager?contactBookId=${id}`)
      );
    }
  }, [dispatch, id]);
  const itemsPerPage = 10;
  const [object, setObject] = React.useState(2);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [title, setTitle] = React.useState("Tìm kiếm");
  useEffect(() => {}, [listMark]);

  const [search, setSearch] = useState("");

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };
  const onClickSignIn = (event) => {
    event.preventDefault();
    console.log("Click SignIn");
    setSearch(event.target.value);
    if (object === 2)
      dispatch(getAllMark(`/mark-student/manager?studentIdFind=${search}`));
    else if (object === 3)
      dispatch(getAllMark(`/mark-student/manager?studentNameFind=${search}`));
    else if (object === 5)
      dispatch(getAllMark(`/mark-student/manager?courseNameFind=${search}`));
    else dispatch(getAllMark(`/mark-student/manager?yearNameFind=${search}`));
  };

  const onClickID = (event) => {
    event.preventDefault();
    dispatch(getAllMark(`/mark-student/manager?studentIdFind=${search}`));
    setObject(2);
    setTitle("Tìm theo mã học sinh");
    handleClose();
  };
  const onClickName = (event) => {
    event.preventDefault();
    setTitle("Tìm theo tên học sinh");
    setObject(3);
    dispatch(getAllMark(`/mark-student/manager?studentNameFind=${search}`));
    handleClose();
  };
  const onClickCourse = (event) => {
    event.preventDefault();
    setTitle("Tìm theo tên khóa học");
    setObject(5);
    dispatch(getAllMark(`/mark-student/manager?courseNameFind=${search}`));
    handleClose();
  };
  const onClickYear = (event) => {
    event.preventDefault();
    setTitle("Tìm theo năm học");
    setObject(6);
    dispatch(getAllMark(`/mark-student/manager?yearNameFind=${search}`));
    handleClose();
  };

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            {id === -1 ? (
              <h4>Quản lý điểm</h4>
            ) : (
              <h4>Điểm các môn của sổ liên lạc {id}</h4>
            )}
          </div>
          <Box className="card-header--actions">
            {id === -1 ? (
              <Link to="mark/add">
                <Button className="m-2" variant="contained" color="primary">
                  Thêm mới
                </Button>
              </Link>
            ) : (
              <div></div>
            )}
            {/* <Button
              aria-controls="simple-menu"
              color="success"
              aria-haspopup="true"
              className="mt-2 mr-0"
              onClick={handleClick}
            >
              {title}
            </Button> */}
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
              <MenuItem onClick={onClickID}>Tìm kiếm theo mã học sinh</MenuItem>
              <MenuItem onClick={onClickName}>
                Tìm kiếm theo tên học sinh
              </MenuItem>
              <MenuItem onClick={onClickCourse}>
                Tìm kiếm theo tên khóa học
              </MenuItem>
              <MenuItem onClick={onClickYear}>Tìm kiếm theo năm học</MenuItem>
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
            {listMark == null || listMark.length === 0 ? (
              <div className="p-2">Không có dữ liệu</div>
            ) : (
              <Route
                exact
                component={() => (
                  <MarkComponent
                    data={listMark}
                    itemsPerPage={itemsPerPage}
                    // searchByData={searchByData}
                    tableHead={header}
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
export default MarkManager;
