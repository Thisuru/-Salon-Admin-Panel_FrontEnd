import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const List = () => {
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
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <div className="list-datatable">
          <Datatable />
        </div>
      </div>
    </div>
  );
};

export default List;
