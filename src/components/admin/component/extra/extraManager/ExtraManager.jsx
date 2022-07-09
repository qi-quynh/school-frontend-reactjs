import React, { Fragment, useEffect } from "react";
import { Box, Card, CardContent, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllExtra,
  deleteExtra,
} from "../../../../../services/extra-service";
import Table from "../../../../table/Table";
import { Link } from "react-router-dom";
import moment from "moment";
import ExtraComponent from "./ExtraComponent";
import { Route } from "react-router";
const ExtraManager = () => {
  const dispatch = useDispatch();
  const listExtra = useSelector((state) => state.extra.listExtra);
  console.log(listExtra);
  const itemsPerPage = 10;
  const header = ["STT", "Mã HĐ", "Hoạt động", "Thời gian", "Trường", ""];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{moment(item.day).format("DD/MM/YYYY")}</td>
      <td>{item.schoolId}</td>

      <td>
        <Link to={"extra/" + item.id}>
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
      window.confirm("Bạn có muốn xoá thông tin hoạt động " + item.id + " ?")
    ) {
      //eslint-disable-line
      dispatch(deleteExtra(item.id));
    }
  };
  useEffect(() => {
    dispatch(getAllExtra("/extracurricular-activities/admin"));
  }, [dispatch]);

  useEffect(() => {}, [listExtra]);

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <h4>Quản lý hoạt động ngoại khóa</h4>
          </div>
          <Box className="card-header--actions">
            <Link to="extra/add">
              <Button className="m-2" variant="contained" color="primary">
                Thêm mới
              </Button>
            </Link>
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}

            {listExtra != null ? (
              <Route
                exact
                component={() => (
                  <ExtraComponent
                    data={listExtra}
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
export default ExtraManager;
