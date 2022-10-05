import { Card, CardContent, Divider, Typography } from "@mui/material";
import React from "react";
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
    name: "Res 1",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Res 2",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Res 3",
    uv: 2000,
    pv: 9800,
    amt: 2290
  }
];

const BarchartReservation = () => {
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
            data={data}
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
            <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarchartReservation;
