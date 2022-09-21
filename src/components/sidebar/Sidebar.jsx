import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link } from "react-router-dom";

const Sidebar = () => {
  const logoutHandler = () => {
    localStorage.clear();
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">Admin panel</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">CLIENTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <p className="title">RESERVATION</p>
          <Link to="/reservation" style={{ textDecoration: "none" }}>
          <li>
            <BookmarkIcon className="icon" />
            <span>Reservation</span>
          </li>
          </Link>
          <Link to="/calendar" style={{ textDecoration: "none" }}>
          <li>
            <CalendarMonthIcon className="icon" />
            <span>Calendar</span>
          </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li onClick={logoutHandler}>
            <ExitToAppIcon className="icon" />
            <span>Log out</span>
          </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
