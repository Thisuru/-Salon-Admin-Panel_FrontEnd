import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import AdminDatatable from "../../components/datatable/AdminDatatable";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.scss";

const AdminUsers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!!!token) {
      localStorage.clear();
      navigate("/");
    }
  }, []);

  return (
    <div className="admin">
      <Sidebar />
      <div className="adminContainer">
        <Navbar />
        <div className="admin-area">
          <AdminDatatable />
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
