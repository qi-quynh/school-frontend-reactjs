import React from "react";

import { Link } from "react-router-dom";
import imageSchool from "../../../../assets/images/school.jpg";
import "./sidebar.css";

import logo from "../../../../assets/images/logo.png";

let sidebar_items = [
  {
    display_name: "Thông báo",
    route: "/student",
    icon: "bx bx-category-alt",
  },
  {
    display_name: "Sổ liên lạc",
    route: "/student/contactBook",
    icon: "bx bx-cart",
  },
  {
    display_name: "Học phí",
    route: "/student/fee",
    icon: "bx bx-cart",
  },
];

let SidebarItem = (props) => {
  const active = props.active ? "active" : "";
  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

let Sidebar = (props) => {
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname
  );

  return (
    <div className="sidebar-student">
      <br />
      <br />
      <br />
      {sidebar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          />
        </Link>
      ))}
      <div className="sidebar-family-header">
        <div className="sidebar__school">
          <img src={imageSchool} alt="company logo" />
          <div></div>
        </div>
        <br />
        <br />
        <br />

        <h5 style={{ color: "#274bab", padding: "0px 7px" }}>
          Chúc bạn ngày mới vui vẻ
        </h5>
      </div>
    </div>
  );
};

export default Sidebar;
