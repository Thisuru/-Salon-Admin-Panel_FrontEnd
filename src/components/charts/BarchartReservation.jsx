import { Card, CardContent, Divider, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const BarchartReservation = () => {

  const [barData, setBarData] = useState([]);
  
  useEffect(() => {
    getWeeklyReservationData()
  }, []);

  async function getWeeklyReservationData() {
    const response = await axios.get("http://localhost:5000/api/v1/stylists/getEachStylistTime");

    if (response.status === 200) {
      let getWeeklyReservationData = response.data
      console.log("getWeeklyReservationData: ", getWeeklyReservationData);
      
      setBarData(getWeeklyReservationData)

    } else {
      toast(response.data.message, { type: "error" });
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          <b>Total weekly time duration of each stylist</b>
        </Typography>
        <Divider light />
        <div className="bar-chart">
          <BarChart
            width={500}
            height={500}
            data={barData}
            margin={{
              top: 65,
              bottom: 15
            }}
            barSize={20}>
            <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="WeeklyTimeInMins" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </div>
        <ToastContainer/>
      </CardContent>
    </Card>
  );
};

export default BarchartReservation;
