import { React, useState } from "react";

import "./table.css";

const Table = (props) => {
  return (
    <div>
      <table className="table table-hover text-center">
        {props.headData && props.renderHead ? (
          <thead>
            <tr>
              {props.headData.map((item, index) =>
                props.renderHead(item, index)
              )}
            </tr>
          </thead>
        ) : null}
        {props.bodyData && props.renderBody && props.bodyData.length !== 0 ? (
          <tbody>
            {
              // props.limit ?
              // dataShow.map((item, index) => props.renderBody(item, index)) :
              props.bodyData.map((item, index) => props.renderBody(item, index))
            }
          </tbody>
        ) : (
          <tbody className="message-no-content">No Item</tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
