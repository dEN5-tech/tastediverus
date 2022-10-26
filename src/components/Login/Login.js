import { useState } from "react";

import { Input, Label } from "@rebass/forms";
import axios from "axios";
import Button from "react-bootstrap-button-loader";
import { ExclamationDiamondFill } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./index.css";

const AgreeBtn = styled.button`
  color: #e90707;
  background-color: #282c34;
`;

const Login = ({ setcookie }) => {
  const [pass, setPass] = useState();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [show, setShow] = useState(true);
  const [warn, setWarn] = useState(null);
  const [variant, setVariant] = useState("primary");
  function Loginprocessed(elem) {
    elem.preventDefault();
    axios
      .get(
        `https://tastediverus.vercel.app/api/login?email=${email}&password=${pass}`
      )
      .then(function (response) {
        if (response.data.cookie) {
          setcookie(response.data);
          navigate("/posts:1");
        } else {
          setShow(true);
          setVariant("warning");
          setWarn(<ExclamationDiamondFill />);
        }
      })
      .catch((e) => {
        setShow(true);
        setVariant("warning");
        setWarn(<ExclamationDiamondFill />);
      });
  }

  return (
    <Container>
      <Label color="white" htmlFor="email">
        Email
      </Label>
      <Input
        color="white"
        bg="black"
        variant="outline"
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        name="email"
        type="email"
      />
      <Label color="white" htmlFor="password">
        Password
      </Label>
      <Input
        color="white"
        bg="black"
        variant="outline"
        onChange={(e) => setPass(e.target.value)}
        id="password"
        name="password"
        type="password"
      />
      <Button
        onClick={(e_) => {
          setVariant("primary");
          setWarn(null);
          setShow(true);
          Loginprocessed(e_);
          setShow(false);
        }}
        variant={variant}
        icon={warn}
        loading={!show}
        disabled={!show}
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;
