import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import usePagination from "../../pagination/usePagination";
import SearchForm from "../../../../searchForm/SearchForm";
import PaginationItem from "../../pagination/PaginationItem";
import { Box, Card, CardContent, Button, TextField } from "@material-ui/core";
const TeacherComponent = ({
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
                    <td>{item.name}</td>
                    <td>{item.email}</td>

                    <td>{item.cmnd}</td>
                    <td>
                      {/* <Link to={"list-of-students-by-teacher/" + item.id}>
                        <button className="btn-a btn btn-info mr-10">Học sinh</button>
                      </Link> */}
                      <Link to={"teacher/" + item.id}>
                        <Button
                          variant="outlined"
                          color="default"
                          className="m-2 text-warning"
                        >
                          Sửa
                        </Button>
                      </Link>
                      {/* <button className="btn btn-danger mr-10" onClick={() => handleDelete(item)}>Xóa</button> */}
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

export default TeacherComponent;
