import React from 'react'
import { PieChart, Pie, Tooltip } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
  ];
  
const PiechartReservation = () => {
    return (
        <div className="pie-chart">
            <h2>Reservations</h2>
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />

                <Tooltip />
            </PieChart>
        </div>
    )
}

export default PiechartReservation