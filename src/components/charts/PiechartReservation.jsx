import { useEffect } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import axios from "axios";
import { useState } from 'react';

// const data = [
//     { name: 'All Reservations', value: 5 },
//     { name: 'Completed Reservations', value: 3 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//     { name: 'Group E', value: 278 },
//     { name: 'Group F', value: 189 },
// ];

const PiechartReservation = () => {
    const [allCount, setAllCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);

    useEffect(() => {
        getAllReservationCount()
        getCompletedReservationCount()
    }, [])

    const data = [
        { name: 'All Reservations', value: allCount },
        { name: 'Completed Reservations', value: completedCount },
    ];
    
    async function getAllReservationCount() {
        const response = await axios.get(
            "http://localhost:5000/api/v1/reservation/allcount?page=1"
        );
    
        if (response.status === 200) {
            console.log("All Count: ", response.data.totalCount);
            setAllCount(response.data.totalCount)
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
            setCompletedCount(response.data.completedCount)
        } else {
            console.log("Something went wrong in Axios");
        }
    }

    return (
        <div className="pie-chart">
            <h2>Reservations: {allCount}</h2>
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