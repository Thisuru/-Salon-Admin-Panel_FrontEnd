import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { reservationColumns, reservationRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../../api/Authaxios";
import moment from "moment/moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const ReservationDataTable = () => {
  const [data, setData] = useState(reservationRows);
  const [loading, setLoading] = useState(true);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    deleteReservation(id);
  };

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
        // console.log("Date field Params: ", params);
        // console.log("Date: ", params?.row?.date);
        return (
          <div className="cellAction">
            {/* {moment(params?.row?.startTime).format("MMMM Do YYYY, h:mm:ss a")} */}
            {moment(params?.row?.startTime).format("MMMM Do YYYY")}
          </div>
        );
      },
    },
    {
      field: "time",
      headerName: "Time",
      width: 300,
      renderCell: (params) => {
        // console.log("Date field Params: ", params);
        // console.log("Date: ", params?.row?.date);
        return (
          <div className="cellAction">
            {/* {moment(params?.row?.startTime).format("MMMM Do YYYY, h:mm:ss a")} */}
            {moment(params?.row?.startTime).format("h:mm a")}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* {params?.row?.status} */}

            <select
              defaultValue={params?.row?.status}
              name="status"
              id="status"
              onChange={(e) => {
                updateStatus(e?.target?.value, params?.row?.id)
              }}
            >
              <option value="pending">pending</option>
              <option value="inProgress">inProgress</option>
              <option value="completed">completed</option>
              <option value="cancelled">cancelled</option>
              <option value="deleted">deleted</option>
            </select>

          </div>
        );
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

  async function updateStatus(status, id) {
    const response = await axios.put("http://localhost:5000/api/v1/reservation/status?page=1", {
      status: status,
      id: id
    });

    if (response.status === 200) {
      toast("Success! Status updated successfully", { type: "success" });

    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  async function getAllReservations(params) {
    let BASE_URL = 'http://localhost:5000/api/v1/reservation?'

    if (params?.page) {
      BASE_URL += 'page=' + params.page + '&'
    }
    if (params?.search) {
      BASE_URL += 'search=' + params.search
    }

    console.log("Base URL", BASE_URL);

    const response = await AuthService.get(
      BASE_URL
    );

    if (response.status === 200) {
      console.log("Success in Axios res.reservations ", response);
      setLoading(false);
      setData(response.data.reservations)

    } else {
      console.log("Something went wrong in Axios");
    }
  }

  const reservationSearch = (e) => {
    console.log("e: ", e.target.value);
    getAllReservations({
      search: e.target.value
    })
  }

  useEffect(() => {
    getAllReservations()
  }, []);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Reservations
        <div className="search">
          <input type="text" placeholder="Search..." onChange={reservationSearch} />
          <SearchOutlinedIcon />
        </div>
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
