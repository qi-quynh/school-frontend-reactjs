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
import { useSelector, useDispatch } from "react-redux";
import {
  getAllContactBook,
  getContactBookById,
  getContactBookBySearch,
} from "../../../../../services/contactBook-service";
import { Route } from "react-router-dom";
import Table from "../../../../table/Table";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import ContactBookComponent from "./ContactBookComponent";
const ContactBookManager = () => {
  let { id } = useParams();
  if (id == null) id = -1;

  const dispatch = useDispatch();
  const listContactBook = useSelector(
    (state) => state.contactBook.listContactBook
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const itemsPerPage = 10;
  const header = [
    "STT",
    "SLL",
    "Mã số",
    "Học sinh",
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

      <td>{item.studentId}</td>
      <td>{item.studentName}</td>
      <td>{item.className}</td>
      <td>{item.semester}</td>
      <td>{item.yearName}</td>
      <td>{item.mark}</td>
      <td>
        <Link to={"/admin/mark/add-by-contact-book/" + item.id}>
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
      dispatch(getAllContactBook("/contact-book/admin"));
    } else {
      dispatch(getContactBookById(`/contact-book/admin?studentId=${id}`));
    }
  }, [dispatch, id]);
  //useEffect(() => {}, [listContactBook]);
  const [search, setSearch] = useState("");
  const onClickSignIn = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    dispatch(
      getAllContactBook(`/contact-book/manager?contactBookIdFind=${search}`)
    );

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
                  <Button
                    aria-controls="simple-menu"
                    variant="contained"
                    color="default"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    Học kì
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Học kỳ I</MenuItem>
                    <MenuItem onClick={handleClose}>Học kỳ II</MenuItem>
                  </Menu>
                  {/* <div className="input-search">
                      <select id="semester">
                        {listSemester.map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>

                      <div className="">
                        <button className="btn btn-primary" type="submit">
                          <i className="fas fa-search fa-sm"></i>
                        </button>
                      </div>
                    </div> */}
                </form>
                <div className="p-3">
                  <TextField
                    className="m-2"
                    type="text"
                    id="search-id"
                    placeholder="Tìm kiếm"
                    name="search"
                    onChange={(event) => onClickSignIn(event)}
                  />
                  {/* <div className="">
                  <button className="btn btn-primary" type="submit">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div> */}
                </div>
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
            {/* <Table
              headData={header}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listContactBook}
              renderBody={(item, index) => renderBody(item, index)}
            /> */}
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
