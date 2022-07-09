import React from "react";

import { Link } from "react-router-dom";

import "./sidebar.css";

import logo from "../../../../assets/images/logo.png";

const sidebar_items = [
  {
    display_name: "Thông báo đến",
    route: "/family",
    icon: "bx bx-category-alt",
  },
  {
    display_name: "Thông báo đã gửi",
    route: "/family/notification-request",
    icon: "bx bx-category-alt",
  },
  {
    display_name: "Xem điểm",
    route: "/family/mark",
    icon: "bx bx-cart",
  },
  {
    display_name: "Sổ liên lạc",
    route: "/family/contactBook",
    icon: "bx bx-cart",
  },
  {
    display_name: "Học phí",
    route: "/family/fee",
    icon: "bx bx-cart",
  },
];

const SidebarItem = (props) => {
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

const Sidebar = (props) => {
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname
  );

  return (
    <div className="sidebar-student">
      <div className="sidebar__logo">
        <img src={logo} alt="company logo" />
      </div>
      {sidebar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
