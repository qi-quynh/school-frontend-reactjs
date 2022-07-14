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
import { getClassByMarkTeacher } from "../../../../../services/mark-service";

const ClassManager = () => {
  const dispatch = useDispatch();
  const listClass = useSelector((state) => state.class.listClass);
  const listMarkTeacher = useSelector(
    (state) => state.markTeacher.listClassTeaching
  );

  console.log(listClass);
  const classHeader = ["Mã Lớp Học", "Tên Lớp", "Sỉ số", "Khối", "Trường", ""];
  const markTeacherHeader = [
    "Mã Khóa Học",
    "Khóa Học",
    "Mã Lớp",
    "Tên Lớp",
    "Năm Học",
    "Học Kỳ",
    "",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.total}</td>
      <td>{item.gradeName}</td>

      <td>{item.schoolName}</td>

      <td>
        {/* <Link to={"class/" + item.id}>
          <button className="btn-a btn btn-warning mr-10">Sửa</button>
        </Link> */}
        <Link to={"/teacher/student"}>
          <Button className="m-2 text-info" variant="outlined" color="default">
            Học sinh
          </Button>
        </Link>
        {/* <button
          className="btn-a btn  btn-danger mr-10"
          onClick={() => handleDelete(item)}
        >
          Xóa
        </button> */}
      </td>
    </tr>
  );
  const renderMarkTeacherBody = (item, index) => (
    <tr key={index}>
      <td>{item.courceId}</td>
      <td>{item.courceName}</td>
      <td>{item.classId}</td>
      <td>{item.className}</td>
      <td>{item.yearName}</td>

      <td>{item.semester}</td>

      <td>
        {/* <Link to={"class/" + item.id}>
          <button className="btn-a btn btn-warning mr-10">Sửa</button>
        </Link> */}
        <Link to={"/teacher/mark-class/" + item.courceId}>
          <Button className="m-2 text-info" variant="outlined" color="default">
            Nhập Điểm
          </Button>
        </Link>
        {/* <button
          className="btn-a btn  btn-danger mr-10"
          onClick={() => handleDelete(item)}
        >
          Xóa
        </button> */}
      </td>
    </tr>
  );
  console.log(listMarkTeacher);
  const handleDelete = (item) => {
    if (window.confirm("Bạn có muốn xóa lớp học " + item.id + " ?", item.id)) {
      //eslint-disable-line
      dispatch(deleteClass(item.id));
    }
  };
  const handleReset = () => {
    if (
      window.confirm(
        "Bạn có muốn xoá làm mới lại giáo viên chủ nhiệm trong lớp học ?"
      )
    ) {
      dispatch(resetTeacherOfClass());
    }
  };
  useEffect(() => {
    dispatch(getAllClass("/class/teacher"));
    dispatch(getClassByMarkTeacher("/mark-student/teacher-class"));
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
            <h4>Lớp học của tôi</h4>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            <Table
              headData={classHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listClass}
              renderBody={(item, index) => renderBody(item, index)}
            />
            {/* </div> */}
          </div>
        </CardContent>
      </Card>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <h4>Lớp Học Bộ Môn </h4>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            <Table
              headData={markTeacherHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listMarkTeacher}
              renderBody={(item, index) => renderMarkTeacherBody(item, index)}
            />
            {/* </div> */}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default ClassManager;
