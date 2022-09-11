import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "./pages/calendar/Calendar";
import { userInputs, userUpdateInputs } from "./formSource";
import Reservation from "./pages/reservation/Reservation";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"> 
            <Route index element={<Home />} />

            <Route path="login" element={<Login/>} />

            <Route path="users">
              <Route index element={<List />} />
              <Route path="new" element={<New inputs={userInputs} title="Add New User" />} />
              <Route path="edit/:id" element={<New inputs={userUpdateInputs} title="Edit User" />} />
            </Route>

            <Route path="calendar" element={<Calendar/>} />
            
            <Route path="reservation" element={<Reservation/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
