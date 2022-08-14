import { Link } from "react-router-dom";

import { Nav, Navbar } from "react-bootstrap";
import AvatarBar from "../AvatarBar/AvatarBar";
import { Logo } from "../Logo/Logo.js";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar({
  cookie,
  tdTypes,
  last_view,
  setcookie,
  setType,
}) {
  return (
    <Navbar style={{ zIndex: "10000", padding: "0 5px" }} sticky="top">
      <Logo />
      <SearchBar />
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

        <AvatarBar cookie={cookie} setcookie={setcookie} last_view={last_view}>
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
        </AvatarBar>
      </Nav>
    </Navbar>
  );
}
