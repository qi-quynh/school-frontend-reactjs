import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllFee,
  deleteFee,
  getFeeBySearch,
} from "../../../../../services/fee-service";
import { Box, Card, CardContent, Button, TextField } from "@material-ui/core";
import Table from "../../../../table/Table";
import { Link, Route } from "react-router-dom";

import moment from "moment";
import FeeComponent from "./../../../../admin/component/fee/feeManager/FeeComponent";
const FeeManager = () => {
  const dispatch = useDispatch();
  const listFee = useSelector((state) => state.fee.listFee);
  console.log(listFee);
  const header = [
    "STT",
    "Mã HP",
    "Học Sinh",
    "SLL",
    "Lớp",
    "Năm học",
    "Hạn nộp",
    "Trạng thái",
    "",
  ];
  const itemsPerPage = 10;
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.studentId}</td>
      <td>{item.contactBookId}</td>
      <td>{item.className}</td>
      <td>
        {item.semester} - {item.year}
      </td>
      <td>{moment(item.dateFee).format("DD/MM/YYYY")}</td>
      <td>{item.status ? "Đã Đóng" : "Chưa đóng"}</td>
      <td>
        <Link to={"fee/" + item.id}>
          <Button
            className="m-2 text-warning"
            variant="outlined"
            color="default"
          >
            Sửa
          </Button>
        </Link>
        <Button
          className="m-2 text-warning"
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
    if (window.confirm("Bạn có muốn xóa thông tin trường " + item.id + " ?")) {
      //eslint-disable-line
      dispatch(deleteFee(item.id));
    }
  };
  useEffect(() => {
    dispatch(getAllFee("/fee/manager"));
  }, [dispatch]);

  useEffect(() => {}, [listFee]);
  const [search, setSearch] = useState("");
  const onClickSignIn = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    dispatch(getAllFee(`/fee/manager?feeIdFind=${search}`));
  };
  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <h4>Quản lý học phí</h4>
          </div>
          <Box className="card-header--actions">
            <Link to="fee/add-by-grade">
              <Button className="m-2" variant="contained" color="primary">
                Thêm theo khối
              </Button>
            </Link>
            <Link to="fee/add">
              <Button className="m-2" variant="contained" color="default">
                Thêm theo học sinh
              </Button>
            </Link>
            <form
              onSubmit={onClickSignIn}
              className="d-none d-sm-inline-block form-inline  ml-14 mb-10 "
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
            {listFee != null ? (
              <Route
                exact
                component={() => (
                  <FeeComponent
                    data={listFee}
                    itemsPerPage={itemsPerPage}
                    // searchByData={searchByData}
                    tableHead={header}
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
export default FeeManager;
