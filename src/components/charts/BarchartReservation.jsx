import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Res 1',
        uv: 4000,
        pv: 1,
        amt: 2400,
    },
    {
        name: 'Res 2',
        uv: 3000,
        pv: 2,
        amt: 2210,
    },
    {
        name: 'Res 3',
        uv: 2000,
        pv: 1,
        amt: 2290,
    },
];

const BarchartReservation = () => {
    return (
        <div>
            <h2>Total time duration of each stylist</h2>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                barSize={20}
            >
                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
            </BarChart>
        </div>
    )
}

export default BarchartReservation