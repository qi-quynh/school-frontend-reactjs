import React, { useEffect, useState, Fragment } from "react";

const NotifiDetail = (props) => {
  return (
    <div>
      {props.content ? <textarea>{props.content}</textarea> : <div></div>}
    </div>
  );
};
export default NotifiDetail;
