import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";
import { RiDashboardFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { BiLogOut } from "react-icons/bi";

export const Header = () => {
  const { user } = useSelector((state) => state.adminInfo);
  return (
    <Navbar expand="lg" variant="dark" className="bg-dark">
      <Container fluid>
        <Link className="navbar-brand" to={"/"}>
          LM
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav text-end">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <Link
                  to="/dashboard"
                  className="nav-link d-flex align-items-center gap-2 "
                >
                  {""}
                  <RiDashboardFill /> Dashboard
                </Link>
                <Link className="nav-link" to="/">
                  <FaHome /> Home
                </Link>
                <Link className="nav-link" to="/logout">
                  <BiLogOut /> Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">
                  {" "}
                  <TbLogin2 />
                  Login
                </Link>
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
