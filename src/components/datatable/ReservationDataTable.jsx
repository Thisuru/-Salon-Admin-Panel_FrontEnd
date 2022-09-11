import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { reservationColumns, reservationRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

const ReservationDataTable = () => {
  const [data, setData] = useState(reservationRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/edit/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  async function getAllReservations() {
    const response = await axios.get(
      "http://localhost:5000/api/v1/reservation?page=1"
    );

    if (response.status === 200) {
        console.log("Response: ", response);
      setData(response.data.reservations)

    } else {
      console.log("Something went wrong in Axios");
    }
  }

  useEffect(() => {
    getAllReservations()
  }, []);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Reservations
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={reservationColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default ReservationDataTable;
