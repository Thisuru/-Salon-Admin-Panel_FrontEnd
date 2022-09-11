import ReservationDataTable from "../../components/datatable/ReservationDataTable"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./reservation.scss"

const Reservation = () => {
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