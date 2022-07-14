import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import usePagination from "../../pagination/usePagination";
import SearchForm from "../../../../searchForm/SearchForm";
import PaginationItem from "../../pagination/PaginationItem";
import {
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  ButtonGroup,
} from "@material-ui/core";
import { deleteClass } from "../../../../../services/class-service";
import moment from "moment";
import {
  getAllNotification,
  updateNotification,
} from "../../../../../services/notification-service";
const NotificationComponent = ({
  data,
  itemsPerPage,
  startFrom,
  // searchByData,
  tableHead,
}) => {
  const dispatch = useDispatch();
  // const loading = false;

  const {
    slicedData,
    pagination,
    prevPage,
    nextPage,
    changePage,
    setFilteredData,
    setSearching,
  } = usePagination({ itemsPerPage, data, startFrom });

  // const deleteHandler = (id) => {
  //   dispatch(deleteCourse(id));
  // };
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
  const handleDelete = (item) => {
    if (window.confirm("Bạn có muốn xóa lớp học " + item.name + " ?")) {
      dispatch(deleteClass(`/class/manager?id=${item.id}`, item.id));
    }
  };
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

  const renderHead = (item, index) => <th key={index}>{item}</th>;
  return (
    <>
      {/* {modalActive ? (
        <ModalDelete
          object={courseInfo}
          deleteHandler={deleteHandler}
          setModalActive={setModalActive}
          messege={messege}
        /> */}
      {/* ) : null} */}
      {/* <br /> */}
      {/* <SearchForm
        data={data}
        searchByData={searchByData}
        setFilteredData={setFilteredData}
        setSearching={setSearching}
      /> */}
      {
        <>
          <table className="table table-striped table-hover text-nowrap mb-0">
            <thead>
              <tr>{tableHead.map((item, index) => renderHead(item, index))}</tr>
            </thead>
            <tbody>
              {slicedData.map((item, index) => {
                return (
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
                    <td>{moment(item.createDay).format("DD/MM/YYYY")}</td>
                    <td>
                      {item.idExtracurricularActivities !== null ? (
                        <Link
                          to={"/mânextra/" + item.idExtracurricularActivities}
                        >
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
                      <ButtonGroup size="small" className="m-2">
                        <Button
                          color="primary"
                          onClick={() => handleApprove(item)}
                        >
                          Duyệt
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => handleCancel(item)}
                        >
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
              })}
            </tbody>
          </table>
          <CardContent className="p-2">
            <h6>Nội dung: </h6>
            <div>{content}</div>
          </CardContent>
          <br />
          <PaginationItem
            pagination={pagination}
            prevPage={prevPage}
            changePage={changePage}
            nextPage={nextPage}
          />
        </>
      }
    </>
  );
};

export default NotificationComponent;
