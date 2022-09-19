import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Datepicker from '../../components/datePicker/Datepicker'
import Calander from '../../modules/Calander/Calander'

const Calendar = () => {
  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div>
          <h1 className='header-text'>Calendar</h1>
          {/* <Datepicker/> */}
          <Calander />
        </div>
      </div>
    </div>
  )
}

export default Calendar
