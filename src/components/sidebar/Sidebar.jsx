import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

const Sidebar = () => {

  const [id, setId] =  useState('');

  useEffect(() => {
    decodeAccessToken()
}, []);

  const logoutHandler = () => {
    localStorage.clear();
  };

  async function decodeAccessToken() {
    const token = localStorage.getItem("token");

    if (!!!token) {
      toast("User is not logged in", { type: "error" });
    }

    const response = await axios.post("http://localhost:5000/api/v1/user/decode/getId", {
        token: token
    });

    if (response.status === 200) {
          console.log("RESPONSE: ", response);
          setId(response.data._id)
    } else {
        toast(response.data.message, { type: "error" });
    }
}

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
          <p className="title">USERS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Clients</span>
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
          <p className="title">ADMIN</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
          <li>
            <AdminPanelSettingsIcon className="icon" />
            <span>Admin Users</span>
          </li>
          </Link>
          <Link to={"/admin/edit/" + id} style={{ textDecoration: "none" }}>
          <li>
            <PersonOutlineIcon className="icon" />
            <span>My Account</span>
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
