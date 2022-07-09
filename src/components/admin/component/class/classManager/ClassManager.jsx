import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllClass,
  deleteClass,
  resetTeacherOfClass,
  getClassBySearch,
} from "../../../../../services/class-service";
import Table from "../../../../table/Table";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import ClassComponent from "./ClassComponent";
const ClassManager = () => {
  const dispatch = useDispatch();
  const listClass = useSelector((state) => state.class.listClass);
  console.log(listClass);
  const header = ["STT", "ID", "Tên Lớp", "SL", "Giáo viên chủ nhiệm", ""];
  const itemsPerPage = 10;
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.total}</td>
      <td>{item.teacherName}</td>
      <td>
        <Link to={"class/" + item.id}>
          <Button
            className="m-2 text-warning"
            variant="outlined"
            color="default"
          >
            Sửa
          </Button>
        </Link>
        <Link to={"list-of-students-by-class/" + item.id}>
          <Button variant="outlined" color="primary" className="m-2">
            Học sinh
          </Button>
        </Link>
        <Button
          variant="outlined"
          color="default"
          className="m-2 text-danger"
          onClick={() => handleDelete(item)}
        >
          Xóa
        </Button>
      </td>
    </tr>
  );
  const handleDelete = (item) => {
    if (window.confirm("Bạn có muốn xóa lớp học " + item.name + " ?")) {
      dispatch(deleteClass(`/class/manager?id=${item.id}`, item.id));
    }
  };
  const handleReset = () => {
    if (
      window.confirm(
        "Bạn có muốn làm mới lại giáo viên chủ nhiệm trong lớp học ?"
      )
    ) {
      dispatch(resetTeacherOfClass());
    }
  };
  useEffect(() => {
    dispatch(getAllClass("/class/admin"));
  }, [dispatch]);

  useEffect(() => {}, [listClass]);
  const [search, setSearch] = useState("");
  const onClickSignIn = (event) => {
    event.preventDefault();
    dispatch(getClassBySearch(search));
  };
  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <h4>Quản lý lớp học</h4>
          </div>
          <Box className="card-header--actions">
            <div>
              <Link to="class/add">
                <button className="btn mb-10 mt-2 btn-primary">Thêm mới</button>
              </Link>
              <button
                className="btn btn-secondary mt-2 mb-10 mr-10 ml-10"
                onClick={() => handleReset()}
              >
                Làm mới GVCN
              </button>
              <form
                onSubmit={onClickSignIn}
                className="d-none d-sm-inline-block form-inline mb-10 "
              >
                <div className="input-search">
                  <input
                    type="text"
                    className="form-control bg-light border-2 small"
                    placeholder="Tìm kiếm"
                    name="search"
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  <div className="">
                    <button className="btn btn-primary" type="submit">
                      <i className="fas fa-search fa-sm"></i>
                    </button>
                  </div>
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
                <ClassComponent
                  data={listClass}
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
export default ClassManager;
