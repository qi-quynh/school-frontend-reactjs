import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import usePagination from "../../pagination/usePagination";
import SearchForm from "../../../../searchForm/SearchForm";
import PaginationItem from "../../pagination/PaginationItem";
import { Box, Card, CardContent, Button, TextField } from "@material-ui/core";
const SubjectComponent = ({
  data,
  itemsPerPage,
  startFrom,
  // searchByData,
  tableHead,
}) => {
  const dispatch = useDispatch();
  // const loading = false;
  const [modalActive, setModalActive] = useState(false);
  const [courseInfo, setCourseInfo] = useState();

  const {
    slicedData,
    pagination,
    prevPage,
    nextPage,
    changePage,
    setFilteredData,
    setSearching,
  } = usePagination({ itemsPerPage, data, startFrom });

  useEffect(() => {
    setModalActive(false);
  }, [data]);

  // const deleteHandler = (id) => {
  //   dispatch(deleteCourse(id));
  // };

  const showDeleteModalWindow = (course) => {
    setModalActive(true);
    setCourseInfo(course);
  };
  const messege = {
    title: "Delete Course",
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
                    <td>{item.id}</td>
                    <td>{item.name}</td>

                    <td>
                      <Link to={"subject/" + item.id}>
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

export default SubjectComponent;
