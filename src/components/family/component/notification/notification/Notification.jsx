import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button, ButtonGroup } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { getAllNotification } from "../../../../../services/notification-service";
import Table from "../../../../table/Table";
import { Link, Route } from "react-router-dom";
import NotificationComponent from "../../../../student/component/notification/notification/NotificationComponent";

const NotificationManager = () => {
  const dispatch = useDispatch();
  const listNotification = useSelector(
    (state) => state.notification.listNotification
  );
  const listNotificationRequest = useSelector(
    (state) => state.notification.listNotificationRequest
  );
  const itemsPerPage = 5;

  const onClick = (event) => {
    event.preventDefault();
    dispatch(getAllNotification("/notification/family"));
  };
  const onClickRequest = (event) => {
    event.preventDefault();
    dispatch(getAllNotification("/notification/student-request"));
  };
  const [content, setContent] = useState();
  const notificationHeader = [
    // "STT",
    // "Tiêu đề",
    // "Được duyệt bởi",
    // "Trạng thái",
    // "",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      {/* <td>{index + 1}</td> */}
      {/* <td>
        <FontAwesomeIcon icon={["far", "building"]} className="font-size-xxl" />
      </td> */}
      <td>{item.titleNotification}</td>
      <td>{item.approveBy === "TEACHER" ? "Giáo viên" : "Quản lý trường"}</td>
      <td>
        {item.statusNotification === "APPROVE"
          ? "Duyệt"
          : item.statusNotification === "CANCEL"
          ? "Hủy"
          : "Chờ"}
      </td>
      <td>
        {/* <Link to={"/student/notification/" + item.idNotification}> */}
        <Button
          className="m-2 text-info"
          variant="outlined"
          color="default"
          onClick={() => setContent(item.descriptionNotification)}
        >
          Chi tiết
        </Button>
        {/* </Link> */}
      </td>
    </tr>
  );

  useEffect(() => {
    dispatch(getAllNotification("/notification/family"));
  }, [dispatch]);

  useEffect(() => {}, [listNotification]);

  return (
    <Fragment>
      <Card>
        <Box className="card-header--actions">
          <Link to="/family/notification/add">
            <Button className="m-2" variant="contained" color="primary">
              Tạo Thông Báo
            </Button>
          </Link>
        </Box>
      </Card>
      <hr />
      <Card className="card-box mb-4">
        <div className="card-header">
          {/* <div className="card-header--title">
            <h4>Thông báo của tôi</h4>
          </div> */}
          <div className="card-header--title">
            <h5>Thông Báo Đến</h5>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            <Route
              exact
              component={() => (
                <NotificationComponent
                  data={listNotification}
                  itemsPerPage={itemsPerPage}
                  // searchByData={searchByData}
                  tableHead={notificationHeader}
                />
              )}
            />
            {/* </div> */}
          </div>
        </CardContent>
      </Card>

      <Card>
        <div className="card-header">
          {/* <div className="card-header--title">
            <h4>Thông báo của tôi</h4>
          </div> */}
          <div className="card-header--title">
            <h5>Thông Báo Đã Gửi</h5>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            <Route
              exact
              component={() => (
                <NotificationComponent
                  data={listNotificationRequest}
                  itemsPerPage={itemsPerPage}
                  // searchByData={searchByData}
                  tableHead={notificationHeader}
                />
              )}
            />
            {/* </div> */}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default NotificationManager;
