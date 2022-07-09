import React, { Fragment, useEffect } from "react";
import { Box, Card, CardContent, Button } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllGrade,
  deleteGrade,
} from "../../../../../services/grade-service";

import Table from "../../../../table/Table";
import { Link, Route } from "react-router-dom";
import {
  getAllTeacher,
  getTeacherById,
} from "./../../../../../services/teacher-service";
import GradeComponent from "./GradeComponent";

const GradeManager = () => {
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const listGrade = useSelector((state) => state.grade.listGrade);
  const teacher = useSelector((state) => state.teacher.teacher);
  console.log(listGrade);
  const header = ["STT", "Tên", ""];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>

      <td>{item.name}</td>

      <td>
        <Link to={"grade/" + item.id}>
          <Button
            className="m-2 text-warning"
            variant="outlined"
            color="default"
          >
            Sửa
          </Button>
        </Link>
        <Button
          className="m-2 text-danger"
          variant="outlined"
          color="default"
          onClick={() => handleDelete(item)}
        >
          Xóa
        </Button>
      </td>
    </tr>
  );
  const handleDelete = (item) => {
    if (
      window.confirm(
        "Bạn muốn xóa thông tin khối " +
          item.name +
          " trường " +
          item.schoolId +
          "?"
      )
    ) {
      dispatch(deleteGrade(`/grade/admin?id=${item.id}`, item.id));
    }
  };
  useEffect(() => {
    dispatch(getAllGrade("/grade/admin"));
    dispatch(
      getTeacherById(`/grade/admin/${localStorage.getItem("username")}`)
    );
  }, [dispatch]);

  useEffect(() => {}, [listGrade]);

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <h4>Quản lý khối - Trường {teacher.schoolName} </h4>
          </div>
          <Box className="card-header--actions">
            <Link to="grade/add">
              <Button className="m-2" variant="contained" color="primary">
                Thêm mới
              </Button>
            </Link>
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            {listGrade != null ? (
              <Route
                exact
                component={() => (
                  <GradeComponent
                    data={listGrade}
                    itemsPerPage={itemsPerPage}
                    // searchByData={searchByData}
                    tableHead={header}
                  />
                )}
              />
            ) : (
              <div>Chưa có thông tin</div>
            )}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default GradeManager;
