import React, { useEffect, useState, Fragment } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Menu,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllContactBook,
  getContactBookById,
  getContactBookBySearch,
} from "../../../../../services/contactBook-service";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import ContactBookComponent from "./ContactBookComponent";

const ContactBookManager = () => {
  let { id } = useParams();
  if (id == null) id = -1;
  console.log(id);

  const dispatch = useDispatch();
  const listContactBook = useSelector(
    (state) => state.contactBook.listContactBook
  );
  const itemsPerPage = 10;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(listContactBook);
  const header = [
    "STT",
    "Sổ Liên Lạc",
    "Học sinh",
    "Giáo Viên Chủ Nhiệm",
    "Lớp",
    "Học kì",
    "Năm học",
    "Điểm TB",
    "",
  ];

  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.studentName}</td>
      <td>{item.teacherName}</td>
      <td>{item.className}</td>
      <td>{item.semester}</td>
      <td>{item.yearName}</td>
      <td>{item.mark}</td>
      <td>
        <Link to={"/manager/mark/add-by-contact-book/" + item.id}>
          <Button
            className="m-2 text-warning"
            variant="outlined"
            color="default"
          >
            Nhập điểm
          </Button>
        </Link>
        <Link to={"list-mark/" + item.id}>
          <Button variant="outlined" color="default" className="m-2 text-info">
            Chi tiết
          </Button>
        </Link>
      </td>
    </tr>
  );

  useEffect(() => {
    if (id === -1) {
      console.log("id bằng null");
      dispatch(getAllContactBook("/contact-book/manager"));
    } else {
      dispatch(getContactBookById(`/contact-book/manager?studentId=${id}`));
    }
  }, [dispatch, id]);
  //useEffect(() => {}, [listContactBook]);
  const [search, setSearch] = useState("");
  const onClickSignIn = (event) => {
    event.preventDefault();

    dispatch(getContactBookBySearch(search));
  };
  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          {id === -1 ? (
            <div>
              <div className="card-header--title">
                <h4>Quản lý sổ liên lạc</h4>
              </div>
              <Box className="card-header--actions">
                <Link to="contactBook/addByClass">
                  <Button className="m-2" variant="contained" color="default">
                    Thêm theo lớp
                  </Button>
                </Link>
                <Link to="contactBook/addByStudent">
                  <Button className="m-2" variant="contained" color="primary">
                    Thêm theo học sinh
                  </Button>
                </Link>
                <form
                  onSubmit={onClickSignIn}
                  className="d-none d-sm-inline-block form-inline mb-10 ml-10"
                >
                  <div className="p-1">
                    <TextField
                      className="m-2"
                      type="text"
                      id="search-id"
                      placeholder="Tìm kiếm"
                      name="search"
                      onChange={(event) => onClickSignIn(event)}
                    />
                  </div>
                </form>
              </Box>
            </div>
          ) : (
            <div className="container text-center">
              <h3 className="my-4 font-weight-bold text-info">
                Quản lý sổ liên lạc của học sinh: {id}
              </h3>
            </div>
          )}
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            {listContactBook != null ? (
              <Route
                exact
                component={() => (
                  <ContactBookComponent
                    data={listContactBook}
                    itemsPerPage={itemsPerPage}
                    // searchByData={searchByData}
                    tableHead={header}
                  />
                )}
              />
            ) : (
              <div></div>
            )}
            {/* </div> */}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default ContactBookManager;
