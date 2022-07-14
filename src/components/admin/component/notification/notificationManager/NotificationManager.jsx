import React, { useEffect, useState, Fragment } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllNotification,
  deleteNotification,
} from "../../../../../services/notification-service";

import Table from "../../../../table/Table";
import { Link, Route } from "react-router-dom";
import NotifiDetail from "./../NotificationDetail";
import NotificationComponent from "./NotificationComponent";

const NotificationManager = () => {
  const dispatch = useDispatch();
  const listNotification = useSelector(
    (state) => state.notification.listNotification
  );
  console.log(listNotification);
  const header = [
    "STT",
    // "Id",
    "Tiêu đề",
    "Phạm vi",
    "Đối tượng",
    "Trạng thái",
    "Ngoại khóa",
    "",
  ];
  const listObject = [
    "",
    "Học sinh",
    "Giáo viên",
    "Quản lý trường",
    "Tất cả",
    "Giáo viên & Học sinh",
    "Quản lý trường và giáo viên",
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [content, setContent] = useState();
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      {/* <td>{item.idNotification}</td> */}
      <td>{item.titleNotification}</td>
      <td>{item.schoolName}</td>
      <td>{listObject[item.object]}</td>
      <td>
        {item.statusNotification === "APPROVE"
          ? "Duyệt"
          : item.statusNotification === "CANCEL"
          ? "Hủy"
          : "Chờ"}
      </td>
      <td>
        {item.idExtracurricularActivities !== null ? (
          <Link to={"extra/" + item.idExtracurricularActivities}>
            <Button
              className="m-2 text-info"
              variant="outlined"
              color="default"
            >
              NK
            </Button>
          </Link>
        ) : (
          <div></div>
        )}
      </td>

      <td>
        {/* <Link to={"notification/" + item.idNotification}>
          <Button
            className="m-2 text-warning"
            variant="outlined"
            color="default"
          >
            Sửa
          </Button>
        </Link> */}
        <Button
          className="m-2 text-info"
          variant="outlined"
          color="default"
          onClick={() => setContent(item.descriptionNotification)}
        >
          Chi tiêt
        </Button>
      </td>
    </tr>
  );
  const itemsPerPage = 10;
  const onClickFromAdmin = (event) => {
    event.preventDefault();
    dispatch(getAllNotification("/notification/admin-request"));

    handleClose();
  };
  const onClickFromAdminOther = (event) => {
    event.preventDefault();
    dispatch(getAllNotification("/notification/admin-request?purpose=to"));
    handleClose();
  };
  const onClickFromTeacher = (event) => {
    event.preventDefault();
    dispatch(getAllNotification("/notification/admin-request-teacher"));
    handleClose();
  };
  const onClickFromStudent = (event) => {
    event.preventDefault();
    dispatch(getAllNotification("/notification/admin-request-student"));
    handleClose();
  };
  const handleDetail = (item) => {
    console.log(item.descriptionNotification);
    setContent(item.descriptionNotification);
    console.log(content);
  };
  const handleDelete = (item) => {
    if (
      window.confirm("Bạn có muốn xóa thông báo " + item.idNotification + " ?")
    ) {
      dispatch(
        deleteNotification(
          `/notification/admin?id=${item.idNotification}`,
          item.idNotification
        )
      );
    }
  };
  useEffect(() => {
    dispatch(getAllNotification("/notification/admin-request"));
  }, [dispatch]);

  useEffect(() => {}, [listNotification]);

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          {/* <div className="card-header--title">
              <h4>Quản lý thông báo</h4>
            </div> */}
          <Box className="card-header--actions">
            <Link to="/admin/notification/add">
              <Button className="m-2" variant="contained" color="primary">
                Thêm mới
              </Button>
            </Link>
            <Button
              aria-controls="simple-menu"
              color="secondary"
              variant="outlined"
              aria-haspopup="true"
              className="m-2"
              onClick={handleClick}
            >
              Thông báo đến
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={onClickFromStudent}>Học sinh</MenuItem>
              <MenuItem onClick={onClickFromTeacher}>Giáo viên</MenuItem>
              <MenuItem onClick={onClickFromAdmin}>Quản lý trường</MenuItem>
            </Menu>

            <Button
              variant="contained"
              color="default"
              className="m-2"
              onClick={onClickFromAdmin}
            >
              Thông báo đã gửi
            </Button>

            {/* <ButtonGroup size="small" className="m-2">
                <Button color="primary" onClick={onClickFromStudent}>
                  Học sinh
                </Button>
                <Button color="primary" onClick={onClickFromAdmin}>
                  Quản lý trường khác
                </Button>
                <Button color="primary" onClick={onClickFromTeacher}>
                  Giáo Viên
                </Button>
              </ButtonGroup> */}
          </Box>
        </div>
        <CardContent className="p-0">
          {listNotification != null ? (
            <div className="table-responsive">
              {/* <div className="card-body"> */}

              <Route
                exact
                component={() => (
                  <NotificationComponent
                    data={listNotification}
                    itemsPerPage={itemsPerPage}
                    // searchByData={searchByData}
                    tableHead={header}
                  />
                )}
              />
              {/* </div> */}
            </div>
          ) : (
            <div className="table-responsive">Chưa có thông báo</div>
          )}
        </CardContent>
       
      </Card>
      {/* <NotifiDetail content={content} /> */}
    </Fragment>
  );
};
export default NotificationManager;
