import { useEffect, useState } from "react";
import BarchartReservation from "../../components/charts/BarchartReservation";
import PiechartReservation from "../../components/charts/PiechartReservation";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

import "./home.scss";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/system";

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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <PiechartReservation />
              </Grid>
              <Grid xs={6}>
                <BarchartReservation />
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Home;
