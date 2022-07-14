import React, { useEffect, useState, Fragment } from "react";
import { Box, Card, CardContent, Button, ButtonGroup } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllNotification,
  deleteNotification,
} from "../../../../../services/notification-service";

import Table from "../../../../table/Table";
import { Link } from "react-router-dom";
import { updateNotification } from "./../../../../../services/notification-service";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import NotificationComponent from "./NotificationComponent";

const NotificationManager = () => {
  const dispatch = useDispatch();
  const listNotification = useSelector(
    (state) => state.notification.listNotification
  );
  const itemsPerPage = 10;
  console.log(listNotification);
  const header = [
    "STT",

    "Tiêu đề",
    "Phạm vi",
    "Đối tượng",
    "Trạng thái",
    "Ngày tạo",
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

  const handleApprove = (item) => {
    console.log(item);
    dispatch(
      updateNotification(
        `/notification/manager/approve?id=${item.idNotification}`
      )
    );
    dispatch(getAllNotification("/notification/manager"));
  };
  const handleCancel = (item) => {
    dispatch(
      updateNotification(
        `/notification/manager/cancel?id=${item.idNotification}`
      )
    );
    dispatch(getAllNotification("/notification/manager"));
  };
  const [content, setContent] = useState();
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.idNotification}</td>
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
          <Link to={"/manager/extra/" + item.idExtracurricularActivities}>
            <Button
              className="m-2 text-info "
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
        <ButtonGroup size="small" className="m-2">
          <Button color="primary" onClick={() => handleApprove(item)}>
            Duyệt
          </Button>
          <Button color="primary" onClick={() => handleCancel(item)}>
            Hủy
          </Button>
        </ButtonGroup>
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
    if (
      window.confirm("Bạn có muốn xóa thông báo " + item.idNotification + " ?")
    ) {
      dispatch(
        deleteNotification(
          `/notification/manager?id=${item.idNotification}`,
          item.idNotification
        )
      );
    }
  };
  useEffect(() => {
    dispatch(getAllNotification("/notification/manager"));
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
            <Link to="/manager/notification/add">
              <Button className="m-2" variant="contained" color="primary">
                Thêm mới
              </Button>
            </Link>
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            {listNotification != null ? (
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
            ) : null}

            {/* </div> */}
          </div>
        </CardContent>
        {/* <CardContent className="p-0">
          <h6>Nội dung: </h6>
          <div>{content}</div>
        </CardContent> */}
      </Card>
    </Fragment>
  );
};
export default NotificationManager;
