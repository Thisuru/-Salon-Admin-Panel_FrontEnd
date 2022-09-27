import ReservationDataTable from "../../components/datatable/ReservationDataTable"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./reservation.scss"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Reservation = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!!!token) {
      localStorage.clear();
      navigate("/");
    }
  }, []);

  return (
    <div className="reservation">
      <Sidebar />
      <div className="reservationContainer">
        <Navbar />
        <ReservationDataTable/>
      </div>
    </div>
  )
}

export default Reservation