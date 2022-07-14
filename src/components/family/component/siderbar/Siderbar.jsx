import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

import "./sidebar.css";
import imageSchool from "../../../../assets/images/school.jpg";
import logo from "../../../../assets/images/logo.png";
import { Collapse } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllStudent } from "../../../../services/student-service";
const sidebar_items = [
  {
    display_name: "Thông báo",
    route: "/family",
    icon: "bx bx-category-alt",
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStudent("/student/family"));
  }, [dispatch]);
  const listStudent = useSelector((state) => state.student.listStudent);

  console.log(activeItem);
  const [isMenuOpen, setIsMenuOpen] = useState();
  console.log(listStudent);
  return (
    <div>
      <div className="sidebar-family">
        <div className="sidebar__logo"></div>

        <Link to="/family">
          <div className="sidebar__item">
            <div
              className={
                activeItem === 0 && !isMenuOpen
                  ? `sidebar__item-inner active`
                  : `sidebar__item-inner`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Thông báo</span>
            </div>
          </div>
        </Link>
        <Link to="/family/fee">
          <div className="sidebar__item">
            <div
              className={
                activeItem === 2 && !isMenuOpen
                  ? `sidebar__item-inner active`
                  : `sidebar__item-inner`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Học Phí</span>
            </div>
          </div>
        </Link>
        <div>
          <li>
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-toggle="collapse"
            >
              <i className="bx bx-cart"></i>
              <div className="sidebar__item">
                <i className="bx bx-cart"></i>
                <span>
                  {"   "}
                  <a
                    className={
                      isMenuOpen
                        ? "sidebar__item-inner active"
                        : "sidebar__item-inner"
                    }
                  >
                    Sổ liên lạc
                  </a>
                </span>
              </div>
            </div>
            <Collapse in={isMenuOpen}>
              <div>
                <ul className="nav">
                  {listStudent != null
                    ? listStudent.map((item, index) => (
                        <li className="active">
                          <Link to={"/family/contactBook/" + item.id}>
                            {item.name}
                          </Link>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </Collapse>
          </li>
        </div>
        <br />
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
    </div>
  );
};

export default Sidebar;
