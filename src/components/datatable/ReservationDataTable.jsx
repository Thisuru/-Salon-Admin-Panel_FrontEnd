import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { reservationRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../../api/Authaxios";
import moment from "moment/moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Card, CardContent, Divider, FormControl, MenuItem, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@mui/material/Select";

const ReservationDataTable = () => {
  const [data, setData] = useState(reservationRows);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState("");

  const handleDelete = (id) => {
    setOpen(true);
    setDeleteRowId(id);
    // setData(data.filter((item) => item.id !== id));
    // deleteReservation(id);
  };

  const handleDeleteConfirm = () => {
    console.log("ID:: ", deleteRowId);
    setData(data.filter((item) => item.id != deleteRowId));
    deleteReservation(deleteRowId);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const actionColumn = [
    {
      field: "customName",
      headerName: "Customer Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params?.row?.client?.firstname + " " + params?.row?.client?.lastname}
          </div>
        );
      }
    },
    {
      field: "serviceType",
      headerName: "Service Type",
      width: 200,
      renderCell: (params) => {
        return <div className="cellAction">{params?.row?.service}</div>;
      }
    },
    {
      field: "stylistName",
      headerName: "Stylist Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {" "}
            {params?.row?.stylist?.firstname + " " + params?.row?.stylist?.lastname}
          </div>
        );
      }
    },
    {
      field: "date",
      headerName: "Date",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* {moment(params?.row?.startTime).format("MMMM Do YYYY, h:mm:ss a")} */}
            {moment(params?.row?.startTime).format("MMMM Do YYYY")}
          </div>
        );
      }
    },
    {
      field: "time",
      headerName: "Time",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* {moment(params?.row?.startTime).format("MMMM Do YYYY, h:mm:ss a")} */}
            {moment(params?.row?.startTime).format("h:mm a")}
          </div>
        );
      }
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                defaultValue={params?.row?.status}
                name="status"
                id="status"
                onChange={(e) => {
                  updateStatus(e?.target?.value, params?.row?.id);
                }}>
                <MenuItem value="pending">pending</MenuItem>
                <MenuItem value="inProgress">inProgress</MenuItem>
                <MenuItem value="completed">completed</MenuItem>
                <MenuItem value="cancelled">cancelled</MenuItem>
                <MenuItem value="deleted">deleted</MenuItem>
              </Select>
            </FormControl>
          </div>
        );
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/reservation/edit/${params.row.id}`} style={{ textDecoration: "none" }}>
              <Button
                className="tocapitalize btn-font-size"
                size="small"
                variant="outlined"
                color="secondary"
                startIcon={<EditIcon />}>
                Edit
              </Button>
            </Link>

            <Button
              className="tocapitalize btn-font-size"
              size="small"
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(params.row.id)}>
              Delete
            </Button>
          </div>
        );
      }
    }
  ];

  async function deleteReservation(id) {
    const response = await axios.delete(`http://localhost:5000/api/v1/reservation/${id}`);

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
    let BASE_URL = "http://localhost:5000/api/v1/reservation?";

    if (params?.page) {
      BASE_URL += "page=" + params.page + "&";
    }
    if (params?.search) {
      BASE_URL += "search=" + params.search;
    }

    console.log("Base URL", BASE_URL);

    const response = await AuthService.get(BASE_URL);

    if (response.status === 200) {
      console.log("Success in Axios res.reservations ", response);
      setLoading(false);
      setData(response.data.reservations);
    } else {
      console.log("Something went wrong in Axios");
    }
  }

  const reservationSearch = (e) => {
    console.log("e: ", e.target.value);
    getAllReservations({
      search: e.target.value
    });
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          <b>Reservations</b>
        </Typography>
        <Divider light />
        <div className="datatable">
          <div className="datatable-top">
            <div className="search">
              <input type="text" placeholder="Search..." onChange={reservationSearch} />
              <SearchOutlinedIcon />
            </div>
            <Link style={{ textDecoration: "none" }} to="/reservation/new">
              <Button
                className="tocapitalize btn-font-size-2"
                variant="outlined"
                color="success"
                startIcon={<AddIcon />}>
                <b>Add New</b>
              </Button>
            </Link>
          </div>
          {loading ? (
            <h3>Loading</h3>
          ) : (
            <div className="d-table">
              <DataGrid
                className="datagrid"
                rows={data}
                // columns={reservationColumns.concat(actionColumn)}
                columns={actionColumn}
                pageSize={9}
                rowsPerPageOptions={[9]}
                disableColumnMenu
              />
            </div>
          )}
          <ToastContainer />

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Delete Reservation Confimation"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this Reservation?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button style={{ color: "red" }} onClick={handleDeleteConfirm} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationDataTable;
