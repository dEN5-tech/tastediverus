import { useEffect, useState } from "react";

import axios from "axios";

import { NavLink, useNavigate } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import SearchBar from "../SearchBar/SearchBar";
import { AlertNotify } from "./AlertNotify.js";

export default function AvatarBar({ children, cookie, setcookie, last_view }) {
  const nav = useNavigate();
  const [data, setData] = useState({});
  const [ViewST, setViewST] = useState(false);
  useEffect(() => {
    if (last_view) setViewST(true);

    if (cookie?.cookie) {
      axios
        .get(
          `https://tastediverus.herokuapp.com/api/get_avatar?token=${cookie.cookie}`
        )
        .then((r) => setData(r.data));
    } else if (cookie?.cookie === undefined) {
      setData({});
    }
  }, [cookie]);

  return (
    <NavDropdown
      align="end"
      eventKey={1}
      title={
        <div className="pull-left">
          {last_view && ViewST ? <AlertNotify /> : null}
          <Image
            className="thumbnail-image"
            src={
              (cookie?.cookie && data?.avatar_url) ||
              "https://tastedive.com/dist/images/td-cover.jpg"
            }
            alt=""
            rounded
            width="32"
            height="32"
          />
          {data?.nickname}
        </div>
      }
      id="dropdownMenuAvatar"
    >
      {last_view ? (
        <Dropdown.Item
          id={"lastViewDropdownItem"}
          onClick={(e) => {
            setViewST(false);
            nav(
              `/view/${last_view.type}/${last_view.kinopoisk_id}/${last_view.title}`,
              { state: last_view.iframe_data }
            );
          }}
        >
          Продолжить просмотр {last_view && ViewST ? <AlertNotify /> : null}
        </Dropdown.Item>
      ) : null}
      <SearchBar />
      {children.map((e, index) => (
        <Dropdown.Item id={`nav-link-${index}`}>{e}</Dropdown.Item>
      ))}
      <Dropdown.Item id={cookie ? "logoutDropdownItem" : "loginDropdownItem"}>
        <Nav.Link
          onClick={(e) => {
            if (e.target.href.toString().includes("/logout"))
              setcookie(undefined);
          }}
          as={NavLink}
          to={cookie ? "/logout" : "/login"}
        >
          {cookie ? "logout" : "login"}
        </Nav.Link>
      </Dropdown.Item>
    </NavDropdown>
  );
}
