import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import AdminDatatable from "../../components/datatable/AdminDatatable"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
       <AdminDatatable />
      </div>
    </div>
  )
}

export default AdminUsers