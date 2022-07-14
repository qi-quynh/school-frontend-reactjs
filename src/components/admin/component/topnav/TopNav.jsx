import React from "react";

import "./topnav.css";

import { Link } from "react-router-dom";

import Dropdown from "../../../../dropdown/Dropdown";

import user_image from "../../../../assets/images/useseven.jpg";

//import user_menu_admin from '../../../../assets/JsonData/user_menu_admin.json'

var user_menu_admin = [
  {
    routes: "/admin/profile",
    content: "Hồ sơ",
  },
  {
    routes: "/admin/logout",
    content: "Đăng xuất",
  },
];

// let curr_user = {
//   display_name: localStorage.getItem("name"),
//   image: user_image,
// };

// const renderNotificationItem = (item, index) => (
//     <div className="notification-item" key={index}>
//         <i className={item.icon}></i>
//         <span>{item.content}</span>
//     </div>
// )

let renderUserToggle = () => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={user_image} alt="" />
    </div>
    <div className="topnav__right-user__name">
      <span className="topnav__right-hello"> Xin chào, </span> <br />
      {localStorage.getItem("name")}
    </div>
  </div>
);

let renderUserMenu = (item, index) => (
  <Link to={item.routes} key={index}>
    <div className="notification-item">
      <span>{item.content}</span>
    </div>
  </Link>
);

var Topnav = () => {
  return (
    <div className="topnav">
      <div className="welcome-info"></div>
      <div className="topnav__right-user__name">
        <h3>{localStorage.getItem("schoolName")}</h3>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          <Dropdown
            customToggle={() => renderUserToggle()}
            contentData={user_menu_admin}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>

        <div className="topnav__right-item"></div>
      </div>
    </div>
  );
};

export default Topnav;
