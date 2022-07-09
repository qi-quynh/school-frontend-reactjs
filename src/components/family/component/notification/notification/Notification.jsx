import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button, ButtonGroup } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { getAllNotification } from "../../../../../services/notification-service";
import Table from "../../../../table/Table";
import { Link } from "react-router-dom";

const NotificationManager = () => {
  const dispatch = useDispatch();
  const listNotification = useSelector(
    (state) => state.notification.listNotification
  );

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
      <Card className="card-box mb-4">
        <div className="card-header">
          {/* <div className="card-header--title">
            <h4>Thông báo của tôi</h4>
          </div> */}
          <Box className="card-header--actions">
            <Link to="/family/notification/add">
              <Button className="m-2" variant="contained" color="primary">
                Tạo
              </Button>
            </Link>

            <ButtonGroup size="small" className="m-2">
              <Button color="primary" onClick={onClick}>
                Đến
              </Button>

              <Button color="primary" onClick={onClickRequest}>
                Gửi
              </Button>
            </ButtonGroup>
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            <Table
              headData={notificationHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listNotification}
              renderBody={(item, index) => renderBody(item, index)}
            />
            {/* </div> */}
          </div>
        </CardContent>
        <CardContent className="p-0">
          <h6>Nội dung: </h6>
          <div>{content}</div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default NotificationManager;
