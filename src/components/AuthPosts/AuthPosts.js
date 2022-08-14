import { Link } from "react-router-dom";

import { useEffect } from "react";
import { Nav } from "react-bootstrap";

export const AuthPosts = ({ cookie, tdTypes, setType }) => {
  useEffect(() => {
    if (cookie) {
      return tdTypes.map((key, index) => (
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
      ));
    }
  }, []);
};
