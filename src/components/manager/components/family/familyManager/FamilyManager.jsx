import React, { useEffect, Fragment } from "react";
import { Box, Card, CardContent, Button } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllFamily,
  deleteFamily,
} from "../../../../../services/family-service";
import Table from "../../../../table/Table";
import { Link, Route } from "react-router-dom";
import FamilyComponent from "../../../../admin/component/family/familyManager/FamilyComponent";

const FamilyManager = () => {
  const dispatch = useDispatch();
  const listFamily = useSelector((state) => state.family.listFamily);
  console.log(listFamily);
  const itemsPerPage = 10;
  const header = ["STT", "Số CMND/CCCD", "Họ Tên", ""];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.cmnd}</td>
      <td>{item.name}</td>

      <td>
        <Link to={"family/" + item.cmnd}>
          <Button
            className="m-2 text-warning"
            variant="outlined"
            color="default"
          >
            Sửa
          </Button>
        </Link>
        {/* <button
          className="btn btn-danger mr-10"
          onClick={() => handleDelete(item)}
        >
          Xóa
        </button> */}
      </td>
    </tr>
  );
  const handleDelete = (item) => {
    if (window.confirm("Bạn có muốn xóa thông tin " + item.id + " ?")) {
      //eslint-disable-line
      dispatch(deleteFamily(item.id));
    }
  };
  useEffect(() => {
    dispatch(getAllFamily("/family/manager"));
  }, [dispatch]);

  useEffect(() => {}, [listFamily]);

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <h4>Quản lý phụ huynh</h4>
          </div>
          <Box className="card-header--actions">
            <Link to="family/add">
              <Button className="m-2" variant="contained" color="primary">
                Thêm mới
              </Button>
            </Link>
          </Box>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive">
            {/* <div className="card-body"> */}
            {listFamily != null ? (
              <Route
                exact
                component={() => (
                  <FamilyComponent
                    data={listFamily}
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
      </Card>
    </Fragment>
  );
};
export default FamilyManager;
