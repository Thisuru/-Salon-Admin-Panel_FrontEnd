import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Res 1',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Res 2',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Res 3',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Res 4',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Res 5',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    // {
    //     name: 'Res 6',
    //     uv: 2390,
    //     pv: 3800,
    //     amt: 2500,
    // },
    // {
    //     name: 'Res 7',
    //     uv: 3490,
    //     pv: 4300,
    //     amt: 2100,
    // },
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