import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import AuthService from "../../api/Authaxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

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

  async function getAllClient(params) {
    let BASE_URL = 'http://localhost:5000/api/v1/clients?'

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
    })
  }

  useEffect(() => {
    getAllClient()
  }, []);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <div className="search">
          <input type="text" placeholder="Search..." onChange={clientSearch} />
          <SearchOutlinedIcon />
        </div>
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
