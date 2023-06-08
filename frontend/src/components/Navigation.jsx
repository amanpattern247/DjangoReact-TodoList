import React from "react";
import { Link } from "react-router-dom";
import AuthUser from "../pages/AuthUser";
import { ToastContainer } from "react-toastify";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default Navigation = () => {
  const { logout } = AuthUser();
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <ToastContainer theme="colored" />
        <Navbar.Brand href="#home">Todo Lists</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav>
          <Nav>
            <Link className="nav-link" onClick={logout}>
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
