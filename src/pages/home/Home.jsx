import { useEffect, useState } from "react";
import BarchartReservation from "../../components/charts/BarchartReservation"
import PiechartReservation from "../../components/charts/PiechartReservation"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { useNavigate } from "react-router-dom";

import "./home.scss"


const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!!!token) {
      localStorage.clear();
      navigate("/");
    }
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="charts">
          <PiechartReservation />
          <BarchartReservation />
        </div>
      </div>
    </div>
  );
};

export default Home