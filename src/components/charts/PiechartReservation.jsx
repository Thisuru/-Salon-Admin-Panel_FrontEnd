import { useEffect } from "react";
import { PieChart, Pie, Tooltip } from "recharts";
import axios from "axios";
import { useState } from "react";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import "./Reservation.scss";

const PiechartReservation = () => {
  const [allCount, setAllCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    getAllReservationCount();
    getCompletedReservationCount();
  }, []);

  const data = [
    { name: "All Reservations", value: allCount, fill: "#8884d8" },
    { name: "Completed Reservations", value: completedCount, fill: "#BC73BC" }
  ];

  async function getAllReservationCount() {
    const response = await axios.get("http://localhost:5000/api/v1/reservation/allcount?page=1");

    if (response.status === 200) {
      console.log("All Count: ", response.data.totalCount);
      setAllCount(response.data.totalCount);
    } else {
      console.log("Something went wrong in Axios");
    }
  }

  async function getCompletedReservationCount() {
    const response = await axios.get(
      "http://localhost:5000/api/v1/reservation/completedcount?page=1"
    );

    if (response.status === 200) {
      console.log("Completed Count: ", response.data.completedCount);
      setCompletedCount(response.data.completedCount);
    } else {
      console.log("Something went wrong in Axios");
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          <b>
            Reservations: <span style={{ color: "gray" }}>{allCount}</span>
          </b>
        </Typography>
        <Divider light />
        <div className="pie-chart">
          <PieChart width={500} height={500}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={170}
              label
            />

            <Tooltip />
          </PieChart>
        </div>
      </CardContent>
    </Card>
  );
};

export default PiechartReservation;
