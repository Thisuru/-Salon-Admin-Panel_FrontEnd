import { Card, CardContent, Divider, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
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

const data = [
  {
    name: "Stylist 1",
    uv: 4000,
    pv: 60,
    amt: 2400
  },
  {
    name: "Stylist 2",
    uv: 3000,
    pv: 60,
    amt: 2210
  },
  {
    name: "Stylist 3",
    uv: 2000,
    pv: 105,
    amt: 2290
  }
];

const BarchartReservation = () => {

  const [barData, setBarData] = useState([]);
  
  useEffect(() => {
    getWeeklyReservationData()
  }, []);

  async function getWeeklyReservationData() {
    const response = await axios.get("http://localhost:5000/api/v1/stylists/getEachStylistTime");

    if (response.status === 200) {
      console.log("getWeeklyReservationData: ", response.data);
      let getWeeklyReservationData = response.data
      let barChartDataArray = [];

      for (let i = 0; i < getWeeklyReservationData.length; i++) {
        
        let eachReservation = getWeeklyReservationData[i]
        let start = new Date(eachReservation.startTime)
        let end = new Date(eachReservation.endTime)
        let minutesDifference = getTimeDifference(start, end);

        eachReservation.WeeklyTimeInMins = minutesDifference;
        eachReservation.name = "Sty " + i
        barChartDataArray.push(eachReservation)
      }
      console.log("Final: ", barChartDataArray);
      setBarData(barChartDataArray)
      toast("Success! Client created successfully", { type: "success" });

    } else {
      toast(response.data.message, { type: "error" });
    }
  }

  //get startTime and endTime difference
  const getTimeDifference = (startDate, endDate) => {
    const msInHour = 1000 * 60;

    return Math.round(Math.abs(endDate - startDate) / msInHour);
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          <b>Total time duration of each stylist</b>
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
      </CardContent>
    </Card>
  );
};

export default BarchartReservation;
