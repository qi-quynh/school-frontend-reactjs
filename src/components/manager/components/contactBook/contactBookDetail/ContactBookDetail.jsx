import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getContactBookByStudentId } from "../../../../../services/contactBook-service";
import Table from "../../../../table/Table";
import { Link } from "react-router-dom";

const ContactBookDetail = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  console.log(id);

  if (id == null) id = -1;
  const listContactBook = useSelector(
    (state) => state.contactBook.listContactBook
  );
  console.log(listContactBook);
  const contactBookTableHeader = [
    "STT",
    "GVCN",
    "Học kì",
    "Năm học",
    "Điểm TB",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.teacherName}</td>
      <td>{item.semester}</td>
      <td>{item.yearName}</td>
      <td>{item.mark}</td>
    </tr>
  );
  useEffect(() => {
    dispatch(getContactBookByStudentId(id));
  }, [dispatch, id]);

  useEffect(() => {}, [listContactBook]);

  return (
    <div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="card-table">
          <div className="card-table-header">
            <h3 className="my-4 font-weight-bold text-info text-center">
              Thông tin sổ liên lạc {id}
            </h3>
          </div>

          <div className="card-body text-center">
            <Table
              headData={contactBookTableHeader}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={listContactBook}
              renderBody={(item, index) => renderBody(item, index)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactBookDetail;
