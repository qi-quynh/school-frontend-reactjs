import React, { useEffect, useState, Fragment } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  ButtonGroup,
  IconButton,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllNotification,
  getAllNotificationRequest,
} from "../../../../../services/notification-service";
import Table from "../../../../table/Table";
import { Link, Route } from "react-router-dom";
import NotificationComponent from "./NotificationComponent";
import MessengerCustomerChat from "react-messenger-customer-chat";

const Notification = () => {
  const dispatch = useDispatch();
  const listNotification = useSelector(
    (state) => state.notification.listNotification
  );
  const listRequest = useSelector((state) => state.notification.listRequest);
  const itemsPerPage = 5;
  const onClick = (event) => {
    event.preventDefault();
    dispatch(getAllNotification("/notification/student"));
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
        {/* <IconButton color="primary" size="small">
          <FontAwesomeIcon icon={["fas", "ellipsis-h"]} />
        </IconButton> */}
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
    dispatch(getAllNotification("/notification/student"));
    dispatch(getAllNotificationRequest("/notification/student-request"));
  }, [dispatch]);
  console.log("Thông báo đên");
  console.log(listNotification);
  console.log(listRequest);

  useEffect(() => {}, []);

  return (
    <div>
      <Card>
        <Box className="card-header--actions">
          <Link to="/student/notification/add">
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
          {listNotification == null || listNotification.length === 0 ? (
            <div className="p-4">Không có thông báo đến</div>
          ) : (
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
            </div>
          )}
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
          {listRequest != null ? (
            <div className="table-responsive">
              {/* <div className="card-body"> */}
              <Route
                exact
                component={() => (
                  <NotificationComponent
                    data={listRequest}
                    itemsPerPage={itemsPerPage}
                    // searchByData={searchByData}
                    tableHead={notificationHeader}
                  />
                )}
              />
              {/* </div> */}
            </div>
          ) : null}
        </CardContent>
      </Card>
      <MessengerCustomerChat pageId="105251015590978" appId="718602015879433" />
    </div>
  );
};
export default Notification;
