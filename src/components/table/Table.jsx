import { React, useState } from "react";


const Table = (props) => {
  return (
    <div>
      <table className="table table-striped table-hover text-nowrap mb-0">
        {props.headData && props.renderHead ? (
          <thead className="thead-light">
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
              
              props.bodyData.map((item, index) => props.renderBody(item, index))
            }
          </tbody>
        ) : (
          <tbody className="message-no-content">Chưa có thông tin</tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
