import React from "react";
import { Link } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

const Sidebar = () => {
  const { user } = useSelector((state) => state.userInfo);

  return (
    <div className="p-2 sidebar">
      <div className="top mt-5">CL-Admin</div>
      <hr />
      <div className="bottom">
        <ul>
          <li>
            <Link
              className="nav-link d-flex align-items-center gap-2"
              to="/dashboard"
            >
              {""}
              <RiDashboardFill /> Dashboard
            </Link>
          </li>
          {user?.role === "admin" && (
            <>
              <li>
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  to="/books"
                >
                  <FaBookOpen /> Books
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  to="/reviews"
                >
                  <FaStar /> Reviews
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  to="/all-admins"
                >
                  <PiStudentFill />
                  All Admin
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  to="/students"
                >
                  <PiStudentFill /> Students
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  to="/burrow-history"
                >
                  <FaHistory /> Burrow History
                </Link>
              </li>
            </>
          )}

          <li>
            <Link
              className="nav-link d-flex align-items-center gap-2"
              to="/my-books"
            >
              <FaBookOpen /> My Books
            </Link>
          </li>
          <li>
            <Link
              className="nav-link d-flex align-items-center gap-2"
              to="/myProfile"
            >
              <CgProfile /> My Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
