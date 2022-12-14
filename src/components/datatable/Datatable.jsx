import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../../api/Authaxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';

const Datatable = () => {
  const [data, setData] = useState(userRows);
  const [open, setOpen] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState("");
  const [page, setPage] = useState(1);

  const handleDelete = (id) => {
    setOpen(true);
    setDeleteRowId(id);
    // setData(data.filter((item) => item.id !== id));
    // deleteClient(id);
  };

  const handleDeleteConfirm = () => {
    console.log("ID:: ", deleteRowId);
    setData(data.filter((item) => item.id != deleteRowId));
    deleteClient(deleteRowId);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
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

  async function getAllClient(params) {
    let BASE_URL = "http://localhost:5000/api/v1/clients?";

    if (params?.page) {
      BASE_URL += "page=" + params.page + "&";
    }
    if (params?.search) {
      BASE_URL += "search=" + params.search;
    }

    console.log("Base URL", BASE_URL);

    const response = await AuthService.get(BASE_URL);

    if (response.status === 200) {
      console.log("Success in Axios res.client ", response);
      setData(response.data.clients);
    } else {
      console.log("Something went wrong in Axios");
    }
  }

  async function deleteClient(id) {
    const response = await axios.delete(`http://localhost:5000/api/v1/clients/${id}`);

    if (response.status === 200) {
      console.log("Success in Axios res.client ", response);

      toast("Success! Client deleted successfully", { type: "success" });

      getAllClient();
    } else {
      console.log("Something went wrong in Axios");
      toast("Something went wrong", { type: "error" });
    }
  }

  const clientSearch = (e) => {
    console.log("search val: ", e.target.value);
    getAllClient({
      search: e.target.value
    });
  };

  // const clientPagination = (newPage) => {
  //   console.log("pagination val: ", newPage);
  //   getAllClient({
  //     page: newPage
  //   });
  // };

  useEffect(() => {
    getAllClient();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          <b>Add New User</b>
        </Typography>
        <Divider light />
        <div className="datatable">
          <div className="datatable-top">
            <div className="search">
              <input type="text" placeholder="Search..." onChange={clientSearch} />
              <SearchOutlinedIcon />
            </div>

            <Link style={{ textDecoration: "none" }} to="/users/new">
              <Button
                className="tocapitalize btn-font-size-2"
                variant="outlined"
                color="success"
                startIcon={<AddIcon />}>
                <b>Add New</b>
              </Button>
            </Link>
          </div>
          <div className="d-table">
            <DataGrid
              className="datagrid"
              rows={data}
              columns={userColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              disableColumnMenu
              // onPageChange={(newPage) => {
              //   console.log("New Page: ", newPage + 1);
              //   clientPagination(newPage + 1)
              // }}
            />
          </div>

          <ToastContainer />

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Delete Client Confimation"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this Client?
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

export default Datatable;
