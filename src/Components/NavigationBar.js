import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { logout } from "../Services/AuthCall";
import { useNavigate, Link } from 'react-router-dom';

const NavigationBar = () => {

  const navigate =useNavigate();

  const LoggingOut=(e)=>{
    e.preventDefault();
        logout()
        navigate("/login");
        // window.reload();
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Profile</Nav.Link>
            <Nav.Link as={Link} to="/progress">Progress</Nav.Link>
            <Nav.Link as={Link} to="/stats">Stats</Nav.Link>
          </Nav>
          <Nav>
            <Button onClick={LoggingOut} variant="outline-light">Logout</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
