import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTeacher,
  deleteTeacher,
  getTeacherBySearch,
} from "../../../../../services/teacher-service";
import Table from "../../../../table/Table";
import { Link } from "react-router-dom";

const TeacherManager = () => {
  const dispatch = useDispatch();
  const listTeacher = useSelector((state) => state.teacher.listTeacher);
  console.log(listTeacher);
  const schoolTableHeader = ["STT", "Id", "Tên", "Email", "Trường", "CMND", ""];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.schoolId}</td>
      <td>{item.cmnd}</td>
      <td>
        {/* <Link to={"list-of-students-by-teacher/" + item.id}>
          <button className="btn-a btn btn-info mr-10">Học sinh</button>
        </Link> */}
        <Link to={"teacher/" + item.id}>
          <button className="btn-a btn btn-warning mr-10">Sửa</button>
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
    const checkRole = ()=> {
      var role = localStorage.getItem("role");
      if(role === "ADMIN"){
        dispatch(getAllTeacher('/teacher/admin'));
      }
      else{
        dispatch(getAllTeacher('/teacher/manager'));
      }
    }
    checkRole();
    return () =>{}
  }, []);

  useEffect(() => {}, [listTeacher]);

  const [search, setSearch] = useState("");
  const onClickSignIn = (event) => {
    event.preventDefault();
    dispatch(getTeacherBySearch(search));
  };
  return (
    <div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="card-table">
          <div className="card-table-header">
            <h3 className="title">Quản lý giáo viên</h3>
          </div>
          <div>
            <Link to="teacher/add">
              <button className="btn mb-10 mt-2 btn-primary">Thêm mới</button>
            </Link>
            <form
              onSubmit={onClickSignIn}
              className=" d-sm-inline-block form-inline  mb-10 ml-10 "
            >
              <div className="input-search">
                <input
                  type="text"
                  className="form-control bg-light border-2 small"
                  placeholder="Tìm kiếm "
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

          <div className="card-body">
            <Table
              headData={schoolTableHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listTeacher}
              renderBody={(item, index) => renderBody(item, index)}
            />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
export default TeacherManager;
