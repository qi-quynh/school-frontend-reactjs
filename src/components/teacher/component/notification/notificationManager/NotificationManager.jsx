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
import TeacherComponent from "./../../../../admin/component/teacher/teacherManager/TeacherComponent";
import NotificationComponent from "./NotificationComponet";
import moment from "moment";

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

  useEffect(() => {
    dispatch(getAllNotification("/notification/teacher"));
  }, [dispatch]);

  useEffect(() => {}, [listNotification]);
  console.log(listNotification);
  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title text-center">
            <h4>Thông Báo Đến</h4>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}

            {listNotification == null || listNotification.length === 0 ? (
              <div className="p-4 text-center">Không có thông báo đến</div>
            ) : (
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
            )}
            {/* </div> */}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default NotificationManager;
