import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import AdminDatatable from "../../components/datatable/AdminDatatable"


const AdminUsers = () => {
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