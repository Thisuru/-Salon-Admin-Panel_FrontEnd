import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { reservationColumns, reservationRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import moment from "moment/moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReservationDataTable = () => {
  const [data, setData] = useState(reservationRows);
  const [loading, setLoading] = useState(true);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    deleteReservation(id)
  };

  /**
  * TODO - Need to implement backend
  * @param {string} id reservationId
  */
  async function deleteReservation(id) {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/reservation/${id}`
    );

    if (response.status === 200) {
      console.log("Success in Axios res.client ", response);

      toast("Success! Reservation delete successfully", { type: "success" });

      getAllReservations();
    } else {
      console.log("Something went wrong in Axios");
      toast("Something went wrong", { type: "error" });
    }
  }

  const actionColumn = [
    {
      field: "customName",
      headerName: "Custom Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params?.row?.client?.firstname +
              " " +
              params?.row?.client?.lastname}
          </div>
        );
      },
    },
    {
      field: "serviceType",
      headerName: "Service Type",
      width: 200,
      renderCell: (params) => {
        return <div className="cellAction">{params?.row?.service}</div>;
      },
    },
    {
      field: "stylistName",
      headerName: "Stylist Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {" "}
            {params?.row?.stylist?.firstname +
              " " +
              params?.row?.stylist?.lastname}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {moment(params?.row?.date).format("MMMM Do YYYY, h:mm:ss a")}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        return <div className="cellAction">{params?.row?.status}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/reservation/edit/${params.row.id}`} style={{ textDecoration: "none" }}>
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
      setLoading(false);
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
        <Link to="/reservation/new" className="link">
          Add New
        </Link>
      </div>
      {loading ? (
        <h3>Loading</h3>
      ) : (
      <DataGrid
        className="datagrid"
        rows={data}
        // columns={reservationColumns.concat(actionColumn)}
        columns={actionColumn}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      )}
      <ToastContainer />
    </div>
  );
};

export default ReservationDataTable;
