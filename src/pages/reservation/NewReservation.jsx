import "./reservation.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Grid from "@mui/material/Grid";
import { MenuItem, Select, TextField } from "@mui/material";

const NewReservation = ({ inputs, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);

  const [allClients, setAllClients] = useState("");
  const [allservices, setAllServices] = useState("");

  const [client, setClient] = useState("");
  const [service, setService] = useState("");
  const [stylist, setStylist] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("");

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Your code here
    const isEditRoute = location?.pathname?.includes("edit");
    setIsEdit(isEditRoute);
    if (isEditRoute) {
      getReservationById();
      getAllClients();
      getAllStylist();
    } else {
      getAllClients();
      getAllStylist();
      // getOnlyAvailableStylists();
    }

  }, []);

  async function getReservationById() {
    const response = await axios.get(
      `http://localhost:5000/api/v1/reservation/${params?.id}`
    );

    if (response.status === 200) {
      const userDetail = response?.data;
      console.log("userDetails", userDetail);

      var d = new Date(userDetail?.endTime);
      var endT = d.toISOString().split('T')[0]
      var sd = new Date(userDetail?.startTime);
      var startT = sd.toISOString().split('T')[0]

      setUserDetails(userDetail);
      // setClient(userDetail?.client);
      setService(userDetail?.service);
      setStylist(userDetail?.stylist);
      setStartTime(startT);
      setEndTime(endT);
      setStatus(userDetail?.status);

    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  async function reservationCreate(e) {
   
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/v1/reservation",
      {
        client: client,
        service: service,
        stylist: stylist,
        // date: new Date(date),
        startTime: startTime,
        endTime: endTime,
        // status: status
      }
    );

    if (response.status === 200) {
      toast("Success! Reservation created successfully", { type: "success" });
      setTimeout(() => {
        navigate("/reservation");
      }, "2000");
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  async function getAllClients() {
    const response = await axios.get(
      "http://localhost:5000/api/v1/clients?page=1"
    );

    if (response.status === 200) {
      setAllClients(response.data.clients);
    } else {
      console.log("Something went wrong in Axios");
    }
  }

  async function getAllStylist() {
    const response = await axios.get("http://localhost:5000/api/v1/stylists");

    if (response.status === 200) {
      setAllServices(response.data);
    } else {
      console.log("Something went wrong in Axios");
    }
  }

  async function getOnlyAvailableStylists(e) {
    const response = await axios.post(
      "http://localhost:5000/api/v1/stylists/getAvailableStylish",
      {
        start: "2022-09-20T00:00:00.000+00:00",
        end :  "2022-09-21T00:00:00.000+00:00"
      }
    );

    if (response.status === 200) {
      console.log("getOnlyAvailableStylists: ", response.data.availabelStylish);
      setAllServices(response.data.availabelStylish);
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  async function reservationUpdate(e) {
    e.preventDefault();
    
    const response = await axios.put(
      `http://localhost:5000/api/v1/reservation/${userDetails?._id}`,
      {
        client: client,
        service: service,
        stylist: stylist,
        startTime: startTime,
        endTime: endTime,
        status : status
      },
      console.log("status: ", status)
    );

    if (response.status === 200) {
      toast("Success! Reservation updated successfully", { type: "success" });

      setTimeout(() => {
        navigate("/reservation");
      }, "2000");
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  const sendHandler = (e) => {
    isEdit ? reservationUpdate(e) : reservationCreate(e);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>

        <div className="bottom">
          <div className="right">
            <form>
              <Grid container>
                <Grid item xs={6}>

                  <div className="formInput">
                    <label>Client</label>
                    <Select
                      style={{width: "250px", height:"35px", marginBottom: '10px', marginTop: '10px'}}
                      type="text"
                      placeholder="John"
                      value={client}
                      onChange={(e) => {
                        console.log("Client: ", e.target.value);
                        setClient(e.target.value)
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {allClients &&
                        allClients.map((categoria) => (
                          <MenuItem key={categoria.id} value={categoria.id}>
                            {categoria.firstname} {categoria.lastname}
                          </MenuItem>
                        ))}
                    </Select>
                  </div>

                  <div className="formInput">
                    <label>Service</label>
                    <input
                      style={{width: "250px", marginBottom: '10px', marginTop: '10px'}}
                      type="text"
                      placeholder="Doe"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                    />
                  </div>
                  
                  <div className="formInput">
                    <label>Stylist</label>
                    <Select
                      style={{width: "250px", height:"35px", marginBottom: '10px', marginTop: '10px'}}
                      type="text"
                      placeholder="john_doe@gmail.com"
                      value={stylist}
                      onChange={(e) => {
                        console.log("Stylist: ", e.target.value);
                        setStylist(e.target.value)
                      }}
                    >
                      {allservices &&
                        allservices.map((categoria) => (
                          <MenuItem key={categoria._id} value={categoria._id}>
                            {categoria.firstname} {categoria.lastname}
                          </MenuItem>
                        ))}
                    </Select>
                  </div>
                  
                </Grid>

                <Grid item xs={6}>

                <div className="formInput">
                    <label>Start Time</label>
                    <TextField
                      style={{width: "250px", height:"35px", marginBottom: '50px', marginTop: '10px'}}
                      id="startTime"
                      // label='Date'
                      type="date"
                      // defaultValue="2017-05-24"
                      value={startTime}
                      sx={{ width: 220 }}
                      onChange={(e) => {
                        console.log("Start time: ", e.target.value);
                        setStartTime(e.target.value)
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>

                  <div className="formInput">
                    <label>End Time</label>
                    <TextField
                      style={{width: "250px", height:"35px", marginBottom: '10px', marginTop: '10px'}}
                      id="endTime"
                      // label='Date'
                      type="date"
                      // defaultValue="2017-05-24"
                      value={endTime}
                      sx={{ width: 220 }}
                      onChange={(e) => setEndTime(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>

                </Grid>
              </Grid>

              <button onClick={(e) => sendHandler(e)}>Send</button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default NewReservation;
