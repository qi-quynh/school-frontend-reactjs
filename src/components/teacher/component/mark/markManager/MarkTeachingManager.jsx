import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllMark,
  getMarkByStudentId,
} from "../../../../../services/mark-service";
import Table from "../../../../table/Table";
import { Link } from "react-router-dom";
import { Route } from "react-router";
import { useParams } from "react-router";
import MarkComponent from "./MarkComponent";
import { getClassById } from "../../../../../services/class-service";
import MarkTeachingComponent from "./MarkTeachingComponent";
const MarkTeachingManager = () => {
  let { id } = useParams();
  if (id == null) id = -1;
  console.log(id);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const classDetail = useSelector((state) => state.class.class);
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
    const loadGradeEdit = () => {
      if (id === -1) {
        dispatch(getAllMark("/mark-student/teacher"));
      } else {
        dispatch(getAllMark(`/mark-student/teacher?courceId=${id}`));
      }
    };
    loadGradeEdit();
    return () => {
      return [];
    };
  }, [dispatch, id]);

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
        <Link to={"/teacher/mark/" + item.id}>
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
          <div className="card-header--title text-center text-info">
            <h4>Điểm Môn Học</h4>
            <Box className="card-header--actions  ">
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
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            {listMark == null || listMark.length === 0 ? (
              <div className="p-4">Không có thông tin về điểm học sinh</div>
            ) : (
              <Route
                exact
                component={() => (
                  <MarkTeachingComponent
                    data={listMark}
                    itemsPerPage={itemsPerPage}
                    // searchByData={searchByData}
                    tableHead={header}
                  />
                )}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default MarkTeachingManager;
