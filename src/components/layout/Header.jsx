import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";

export const Header = () => {
  return (
    <Navbar expand="lg" variant="dark" className="bg-dark">
      <Container>
        <Link className="navbar-brand" to={"/"}>CL</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              <FaHome /> Home
            </Link>
            <Link className="nav-link" to="/login">
              {" "}
              <TbLogin2 />
              Login
            </Link>
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
