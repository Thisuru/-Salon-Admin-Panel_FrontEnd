import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Datatable = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    deleteClient(id);
  };


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        // console.log(
        //   "🚀 ~ file: Datatable.jsx ~ line 22 ~ Datatable ~ params",
        //   params
        // );
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

  async function getAllClient() {
    const response = await axios.get(
      "http://localhost:5000/api/v1/clients?page=1"
    );

    if (response.status === 200) {
      console.log("Success in Axios res.client ", response);
      setData(response.data.clients)

    } else {
      console.log("Something went wrong in Axios");
    }
  }

  async function deleteClient(id) {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/clients/${id}`
    );

    if (response.status === 200) {
      console.log("Success in Axios res.client ", response);

      toast("Success! Client delete successfully", { type: "success" });

      getAllClient();
    } else {
      console.log("Something went wrong in Axios");
      toast("Something went wrong", { type: "error" });
    }
  }

  useEffect(() => {
    getAllClient()
  }, []);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        // rowCount={50000}
        // onPageChange={(newPage) => setPage(newPage)}
        // checkboxSelection
      />
      <ToastContainer />
    </div>
  );
};

export default Datatable;
