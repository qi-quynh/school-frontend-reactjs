import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import usePagination from "../../pagination/usePagination";
import SearchForm from "../../../../searchForm/SearchForm";
import PaginationItem from "../../pagination/PaginationItem";
import { Box, Card, CardContent, Button, TextField } from "@material-ui/core";
import moment from "moment";
import { deleteGrade } from "../../../../../services/grade-service";
const GradeComponent = ({
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
  const dispatch = useDispatch();
  // const deleteHandler = (id) => {
  //   dispatch(deleteCourse(id));
  // };
  const handleDelete = (item) => {
    if (
      window.confirm(
        "Bạn muốn xóa thông tin khối " +
          item.name +
          " trường " +
          item.schoolId +
          "?"
      )
    ) {
      dispatch(deleteGrade(`/grade/admin?id=${item.id}`, item.id));
    }
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
          <table className="table table-hover">
            <thead>
              <tr>{tableHead.map((item, index) => renderHead(item, index))}</tr>
            </thead>
            <tbody>
              {slicedData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>{item.name}</td>

                    <td>
                      <Link to={"grade/" + item.id}>
                        <Button
                          className="m-2 text-warning"
                          variant="outlined"
                          color="default"
                        >
                          Sửa
                        </Button>
                      </Link>
                      <Button
                        className="m-2 text-danger"
                        variant="outlined"
                        color="default"
                        onClick={() => handleDelete(item)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

export default GradeComponent;
