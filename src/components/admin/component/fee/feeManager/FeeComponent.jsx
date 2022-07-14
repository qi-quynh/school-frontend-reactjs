import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import usePagination from "../../pagination/usePagination";
import SearchForm from "../../../../searchForm/SearchForm";
import PaginationItem from "../../pagination/PaginationItem";
import { Box, Card, CardContent, Button, TextField } from "@material-ui/core";
import moment from "moment";
const FeeComponent = ({
  data,
  itemsPerPage,
  startFrom,
  // searchByData,
  tableHead,
}) => {
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
          <table className="table table-hover">
            <thead>
              <tr>{tableHead.map((item, index) => renderHead(item, index))}</tr>
            </thead>
            <tbody>
              {slicedData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.studentId}</td>
                    <td>{item.contactBookId}</td>
                    <td>{item.className}</td>
                    <td>
                      {item.semester} - {item.year}
                    </td>
                    <td>{moment(item.dateFee).format("DD/MM/YYYY")}</td>
                    <td>{item.status ? "Đã Đóng" : "Chưa đóng"}</td>
                    <td>
                      <Link to={"fee/" + item.id}>
                        <Button
                          className="m-2 text-warning"
                          variant="outlined"
                          color="default"
                        >
                          Sửa
                        </Button>
                      </Link>
                      {/* <Button
                        className="m-2 text-warning"
                        variant="outlined"
                        color="default"
                        onClick={() => handleDelete(item)}
                      >
                        Xóa
                      </Button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="p-2">
            <PaginationItem
              pagination={pagination}
              prevPage={prevPage}
              changePage={changePage}
              nextPage={nextPage}
            />
          </div>
        </>
      }
    </>
  );
};

export default FeeComponent;
