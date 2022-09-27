import Home from './pages/home/Home'
import Login from './pages/login/Login'
import List from './pages/list/List'
import New from './pages/new/New'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { userInputs, userUpdateInputs } from './formSource'
import Reservation from './pages/reservation/Reservation'
import NewReservation from './pages/reservation/NewReservation'
import Calander from './modules/Calander/Calander'
import AdminUsers from './pages/admin/AdminUsers'
import Register from './pages/register/Register'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Login />} />

            <Route path='dashboard' element={<Home />} />

            <Route path='users'>
              <Route index element={<List />} />
              <Route
                path='new'
                element={<New inputs={userInputs} title='Add New User' />}
              />
              <Route
                path='edit/:id'
                element={<New inputs={userUpdateInputs} title='Edit User' />}
              />
            </Route>

            <Route path='calendar' element={<Calander />} />

            <Route path='reservation'>
              <Route index element={<Reservation />} />
              <Route
                path='new'
                element={
                  <NewReservation inputs={userInputs} title='Add New Reservation' />
                }
              />
              <Route
                path='edit/:id'
                element={
                  <NewReservation
                    inputs={userUpdateInputs}
                    title='Edit Reservation'
                  />
                }
              />
            </Route>

            <Route path='admin'>
              <Route index element={<AdminUsers />} />
              {/* <Route
                path='new'
                element={<New inputs={userInputs} title='Add New Admin' />}
              /> */}
              {/* <Route
                path='edit/:id'
                element={<New inputs={userUpdateInputs} title='Edit Admin' />}
              /> */}
            </Route>
          </Route>

          <Route path='register/:token' element={<Register />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
