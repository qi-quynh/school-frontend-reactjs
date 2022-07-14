import React, { useEffect, Fragment } from "react";
import { Box, Card, CardContent, Button } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { getAllYear, deleteYear } from "../../../../../services/year-service";
import Table from "../../../../table/Table";
import { Link } from "react-router-dom";
import YearComponent from "../../../../manager/components/year/yearManager/YearComponent";

const YearManager = () => {
  const dispatch = useDispatch();
  const listYear = useSelector((state) => state.year.listYear);
  console.log(listYear);
  const yearHeader = ["STT", "ID", "Năm học"];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.name}</td>
      {/* <td>
                <Link to={'schoolYear/' + item.id}>
                    <button className="btn-a btn btn-warning mr-10">Sửa</button>
                </Link>
            </td> */}
    </tr>
  );
  const itemsPerPage = 10;
  useEffect(() => {
    dispatch(getAllYear());
  }, [dispatch]);

  useEffect(() => {}, [listYear]);

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <h3>Quản lý năm học</h3>
          </div>
          <Box className="card-header--actions">
            <Link to="schoolYear/add">
              <Button className="m-2" variant="contained" color="primary">
                Thêm mới
              </Button>
            </Link>
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            <YearComponent
              data={listYear}
              itemsPerPage={itemsPerPage}
              // searchByData={searchByData}
              tableHead={yearHeader}
            />
            {/* </div> */}
          </div>
        </CardContent>
      </Card>
      <hr />
    </Fragment>
  );
};
export default YearManager;
