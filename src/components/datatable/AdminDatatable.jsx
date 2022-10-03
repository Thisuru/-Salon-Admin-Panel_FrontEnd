import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { adminColumns, adminRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../../api/Authaxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';

const AdminDatatable = () => {
  const [data, setData] = useState(adminRows);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState("");
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleDelete = (id) => {
    setOpen(true);
    setDeleteRowId(id);
  };

  const handleDeleteConfirm = () => {
    console.log("ID:: ", deleteRowId);
    setData(data.filter((item) => item.id != deleteRowId));
    deleteUser(deleteRowId);
    setOpen(false);
  };

  const openAddNew = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 360,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to={`/admin/edit/${params.row.id}`} style={{ textDecoration: "none" }}>
              <Button
                className="tocapitalize btn-font-size"
                size="small"
                variant="outlined"
                color="secondary"
                startIcon={<EditIcon />}>
                Edit
              </Button>
            </Link> */}

            <Button
              className="tocapitalize btn-font-size"
              size="small"
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(params.row.id)}>
              Delete
            </Button>

            {/* <Link to={`/admin/reset_password/${params.row.id}`} style={{ textDecoration: "none" }}>
              <Button
                className="tocapitalize btn-font-size"
                size="small"
                variant="outlined"
                color="success"
                startIcon={<EditIcon />}>
                Edit
              </Button>
            </Link> */}
          </div>
        );
      }
    }
  ];

  async function getAllUsers(params) {
    let BASE_URL = "http://localhost:5000/api/v1/user?";

    if (params?.page) {
      BASE_URL += "page=" + params.page + "&";
    }
    if (params?.search) {
      BASE_URL += "search=" + params.search;
    }

    console.log("Base URL", BASE_URL);

    const response = await axios.get(BASE_URL);

    if (response.status === 200) {
      console.log("Success in Axios res.user ", response);
      setLoading(false);
      setData(response.data.users);
    } else {
      console.log("Something went wrong in Axios");
    }
  }

  async function deleteUser(id) {
    const response = await axios.delete(`http://localhost:5000/api/v1/user/${id}`);

    if (response.status === 200) {
      console.log("Success in Axios res.client ", response);

      toast("Success! Admin user deleted successfully", { type: "success" });

      getAllUsers();
    } else {
      console.log("Something went wrong in Axios");
      toast("Something went wrong", { type: "error" });
    }
  }

  async function inviteEmailExpiryToken(email) {
    setOpenAdd(false);
    const response = await axios.post("http://localhost:5000/api/v1/sendEmail/invitetoken", {
      email: email
    });

    if (response.status === 200) {
      console.log("inviteEmailExpiryToken: ", response.data.token);
      sendInviteEmail(email, response.data.token);
    } else {
      toast(response.data.message, { type: "error" });
    }
  }

  async function sendInviteEmail(email, token) {
    // setOpenAdd(false);
    const response = await axios.post("http://localhost:5000/api/v1/sendEmail", {
      email: email,
      message: `Please redirect to the following URL to register to the app
                       URL : http://localhost:3000/register/${token} `
    });

    if (response.status === 200) {
      toast("Success! Email sent successfully", { type: "success" });
    } else {
      toast(response.data.message, { type: "error" });
    }
  }

  const clientSearch = (e) => {
    console.log("search val: ", e.target.value);
    getAllUsers({
      search: e.target.value
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          <b>Add New Admin</b>
        </Typography>
        <Divider light />
        <div className="datatable">
          <div className="datatable-top">
            <div className="search">
              <input type="text" placeholder="Search..." onChange={clientSearch} />
              <SearchOutlinedIcon />
            </div>
            {/* <Link to="/admin/new" className="link"> */}
            <Button
              className="tocapitalize btn-font-size-2"
              variant="outlined"
              color="success"
              startIcon={<ContactMailIcon />}
              onClick={openAddNew}>
              <b>Invite Admin</b>
            </Button>
            {/* </Link> */}
          </div>

          {loading ? (
            <h3>Loading</h3>
          ) : (
            <div className="d-table">
              <DataGrid
                className="datagrid"
                rows={data}
                columns={adminColumns.concat(actionColumn)}
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
            <DialogTitle id="alert-dialog-title">{"Delete Client Confimation"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this Admin?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button style={{ color: "red" }} onClick={handleDeleteConfirm} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openAdd} onClose={handleCloseAdd}>
            <DialogTitle>Invite Admin</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the invitess's email address here. We will send regiser URL through the
                Email.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAdd}>Cancel</Button>
              <Button onClick={() => inviteEmailExpiryToken(inviteEmail)}>Invite</Button>
            </DialogActions>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDatatable;
