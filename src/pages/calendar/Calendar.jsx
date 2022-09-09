import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./calendar.scss"

const Calendar = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div >
          Calendar
        </div>
      </div>
    </div>
  )
}

export default Calendar