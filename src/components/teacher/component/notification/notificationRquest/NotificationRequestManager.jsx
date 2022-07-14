import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button, ButtonGroup } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllNotification,
  getAllNotificationRequest,
  deleteNotification,
} from "../../../../../services/notification-service";

import Table from "../../../../table/Table";
import { Link, Route } from "react-router-dom";
import TeacherComponent from "../../../../admin/component/teacher/teacherManager/TeacherComponent";
import NotificationComponent from "./NotificationComponet";
import moment from "moment";

const NotificationRequestManager = () => {
  const dispatch = useDispatch();
  const listRequest = useSelector((state) => state.notification.listRequest);

  const notificationHeader = [
    "STT",

    "Tiêu đề",
    "Phạm vi",
    "Ngày tạo",
    "Người nhận",
    "Trạng thái",

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
      <td>{item.object}</td>
      <td>
        {item.statusNotification === "APPROVE"
          ? "Duyệt"
          : item.statusNotification === "CANCEL"
          ? "Hủy"
          : "Chờ"}
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
  const itemsPerPage = 10;

  const onClick = (event) => {
    event.preventDefault();
    dispatch(getAllNotification("/notification/teacher"));
  };
  const onClickRequest = (event) => {
    event.preventDefault();
    dispatch(getAllNotification("/notification/teacher-request"));
  };

  useEffect(() => {
    dispatch(getAllNotificationRequest("/notification/teacher-request"));
  }, [dispatch]);
  console.log(listRequest);

  useEffect(() => {}, [listRequest]);

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title text-center">
            <h4>Quản lý thông báo đã gửi</h4>
          </div>
          <Box className="card-header--actions text-center">
            <Link to="/teacher/notification/add">
              <Button className="m-2" variant="contained" color="primary">
                Tạo mới
              </Button>
            </Link>
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}

            {listRequest == null || listRequest.length === 0 ? (
              <div className="p-4 text-center">Không có thông báo đã gửi</div>
            ) : (
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
            )}
            {/* </div> */}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default NotificationRequestManager;
