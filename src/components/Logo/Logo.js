import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Navbar.Brand as={Link} to="/">
      <img
        alt=""
        src="https://tastediverus.vercel.app/vectorpaint.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{" "}
      TasteDiveRus
    </Navbar.Brand>
  );
};
