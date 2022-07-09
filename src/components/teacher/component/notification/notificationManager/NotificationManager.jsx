import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button, ButtonGroup } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllNotification,
  deleteNotification,
} from "../../../../../services/notification-service";

import Table from "../../../../table/Table";
import { Link } from "react-router-dom";

const NotificationManager = () => {
  const dispatch = useDispatch();
  const listNotification = useSelector(
    (state) => state.notification.listNotification
  );
  console.log(listNotification);
  const notificationHeader = [
    "STT",

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
  const [content, setContent] = useState();
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.titleNotification}</td>
      <td>{item.schoolId}</td>
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
              className="m-2 text-secondary"
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
        <Button
          className="m-2 text-info"
          variant="outlined"
          color="default"
          onClick={() => setContent(item.descriptionNotification)}
        >
          Chi tiết
        </Button>
      </td>
    </tr>
  );

  const handleDelete = (item) => {
    if (window.confirm("Bạn có muốn xóa thông báo " + item.id + " ?")) {
      dispatch(deleteNotification(item.id));
    }
  };

  const onClick = (event) => {
    event.preventDefault();
    dispatch(getAllNotification("/notification/teacher"));
  };
  const onClickRequest = (event) => {
    event.preventDefault();
    dispatch(getAllNotification("/notification/teacher-request"));
  };
  useEffect(() => {
    dispatch(getAllNotification("/notification/teacher"));
  }, [dispatch]);

  useEffect(() => {}, [listNotification]);

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <h4>Quản lý thông báo</h4>
          </div>
          <Box className="card-header--actions">
            <ButtonGroup className="m-2">
              <Button color="primary" onClick={onClick}>
                Đến
              </Button>

              <Button color="primary" onClick={onClickRequest}>
                Gửi
              </Button>
            </ButtonGroup>
            <Link to="/teacher/notification/add">
              <Button className="m-2" variant="contained" color="primary">
                Tạo
              </Button>
            </Link>
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
