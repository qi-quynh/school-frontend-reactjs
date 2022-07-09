import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllFee,
  deleteFee,
  getFeeBySearch,
} from "../../../../../services/fee-service";
import Table from "../../../../table/Table";
import { Link, Route } from "react-router-dom";
import moment from "moment";
import FeeComponent from "./FeeComponent";
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
        {/* <Button
          className="m-2 text-warning"
          variant="outlined"
          color="default"
          onClick={() => handleDelete(item)}
        >
          Xóa
        </Button> */}
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
    dispatch(getAllFee("/fee/admin"));
  }, [dispatch]);

  useEffect(() => {}, [listFee]);
  const [search, setSearch] = useState("");
  const onClickSignIn = (event) => {
    event.preventDefault();
    dispatch(getFeeBySearch(search));
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
              className="d-none d-sm-inline-block form-inline mb-13 "
            >
              <div className="input-search">
                <input
                  type="text"
                  className="form-control bg-light border-2 mb-2 mt-1 small"
                  placeholder="Tìm kiếm"
                  name="search"
                  onChange={(event) => setSearch(event.target.value)}
                />
                <div className="">
                  <button className="btn btn-primary mb-2 mt-1 " type="submit">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>
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
