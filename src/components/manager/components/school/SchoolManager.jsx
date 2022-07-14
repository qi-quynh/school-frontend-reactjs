import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllSchool,
  deleteSchool,
} from "../../../../services/school-service";
import Table from "../../../table/Table";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Button } from "@material-ui/core";

const SchoolManager = () => {
  const dispatch = useDispatch();
  const listSchool = useSelector((state) => state.school.listSchool);
  console.log(listSchool);
  const schoolTableHeader = ["STT", "Id", "Tên Trường", "Địa Chỉ", "Cấp", ""];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.address}</td>
      <td>{item.type}</td>
      <td>
        <Link to={"school/" + item.id}>
          <Button
            className="m-2 text-warning"
            variant="outlined"
            color="default"
          >
            Sửa
          </Button>
        </Link>
        {/* <Button
          className="m-2 text-danger"
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
      dispatch(deleteSchool(`/school/manager/${item.id}`, item.id));
    }
  };
  useEffect(() => {
    dispatch(getAllSchool("/school/manager"));
  }, [dispatch]);

  useEffect(() => {}, [listSchool]);

  return (
    <Fragment>
      <Card className="card-box mb-4">
        {/* <div className="card-table"> */}
        <div className="card-header text-center">
          <div className="card-header--title ">
            <h4>Quản lý trường học</h4>
          </div>

          <Box className="card-header--actions">
            <Link to="school/add">
              <Button className="m-2" variant="contained" color="primary">
                Thêm mới
              </Button>
            </Link>
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            <Table
              headData={schoolTableHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listSchool}
              renderBody={(item, index) => renderBody(item, index)}
            />
            {/* </div> */}
          </div>
        </CardContent>

        {/* </div> */}
      </Card>
    </Fragment>
  );
};
export default SchoolManager;
