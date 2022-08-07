import { NavLink, Link } from "react-router-dom";

import { AvatarBar } from "../AvatarBar/AvatarBar.js";
import { Logo } from "../Logo/Logo.js";
import React, { useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";

export const NavBar = ({
    cookie,
    tdTypes,
    last_view,
    setcookie,
    SearchBar,
    setType,
}) => {
    return (
        <Navbar style={{ zIndex: "10000", padding: "0 5px" }} sticky="top">
            <Logo />
            <React.Suspense>
                <SearchBar />
            </React.Suspense>

            <Nav className="ml-auto">
                {cookie
                    ? tdTypes.map((key, index) => (
                          <Nav.Link
                              onClick={(e) => {
                                  setType(e.target.href.split(/.*:/).join(""));
                              }}
                              key={key.tdType}
                              as={Link}
                              to={`/posts:${key.tdType}`}
                          >
                              {key.title}
                          </Nav.Link>
                      ))
                    : null}

                <AvatarBar
                    cookie={cookie}
                    setcookie={setcookie}
                    last_view={last_view}
                >
                  {cookie
                      ? tdTypes.map((key, index) => (
                            <Nav.Link
                                onClick={(e) => {
                                    setType(
                                        e.target.href
                                            .split(/.*:/)
                                            .join("")
                                    );
                                }}
                                key={key.tdType}
                                as={Link}
                                to={`/posts:${key.tdType}`}
                            >
                                {key.title}
                            </Nav.Link>
                        ))
                      : null}
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
                </AvatarBar>
            </Nav>
        </Navbar>
    );
};
