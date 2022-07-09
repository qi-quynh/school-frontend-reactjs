import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllMark,
  getMarkByStudentId,
  getMarkByContactBookId,
} from "../../../../../services/mark-service";
import Table from "../../../../table/Table";
import { useParams } from "react-router";
import MarkComponent from "./../../../../admin/component/mark/markManager/MarkComponent";
import { Link, Route } from "react-router-dom";
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
    "ID Học sinh",
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

  useEffect(() => {}, [listMark]);
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.subjectName}</td>
      <td>{item.studentId}</td>
      <td>{item.studentName}</td>
      <td>{item.className}</td>
      <td>
        {item.semester} - {item.yearName}{" "}
      </td>
      <td>{item.markStudentMark}</td>

      <td>
        <Link to={"/manager/mark/" + item.id}>
          <Button
            className="m-2 text-warning"
            variant="outlined"
            color="default"
          >
            Sửa
          </Button>
        </Link>
        {/* <button className="btn btn-danger mr-10" onClick={() => handleDelete(item)}>Xóa</button> */}
      </td>
    </tr>
  );
  const handleDelete = (item) => {
    if (window.confirm("Bạn có muốn xóa thông tin " + item.id + " ?")) {
      //eslint-disable-line
      // dispatch(deleteSchool(item.id));
    }
  };

  const [search, setSearch] = useState("");
  const onClickSignIn = (event) => {
    event.preventDefault();
    dispatch(getMarkByStudentId(search));
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
            <form
              onSubmit={onClickSignIn}
              className=" d-sm-inline-block form-inline  mb-10 ml-10 "
            >
              <div className="p-1">
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
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
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
            {/* </div> */}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default MarkManager;
