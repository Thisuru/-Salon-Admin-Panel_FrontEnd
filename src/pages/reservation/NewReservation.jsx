import React from "react";
import "./reservation.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import AuthService from "../../api/Authaxios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Grid from "@mui/material/Grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { colors, MenuItem, Select, TextField } from "@mui/material";
import dayjs from "dayjs";

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
  console.log(
    "🚀 ~ file: NewReservation.jsx ~ line 30 ~ NewReservation ~ startTime",
    dayjs(startTime),
    new Date(startTime),
    " drfdfd ",
    dayjs(new Date(startTime))
  );
  const [endTime, setEndTime] = useState("");
  console.log(
    "🚀 ~ file: NewReservation.jsx ~ line 32 ~ NewReservation ~ endTime",
    endTime
  );
  const [status, setStatus] = useState("");
  const [clientLoading, setClientLoading] = useState(true);
  const [stylistLoading, setStylistLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const [userDetails, setUserDetails] = useState(null);
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    // Your code here
    const isEditRoute = location?.pathname?.includes("edit");
    setIsEdit(isEditRoute);
    if (isEditRoute) {
      getAllClients();
      getAllStylist();
      getReservationById();
    } else {
      getAllClients();
      getAllStylist();
      setLoading(false);
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
      console.log("userDetail?.client : ", userDetail?.client);
      console.log("userDetail?.stylist : ", userDetail?.stylist);

      var d = new Date(userDetail?.endTime);
      var endT = d.toISOString().split("T")[0];
      var sd = new Date(userDetail?.startTime);
      var startT = sd.toISOString().split("T")[0];

      setUserDetails(userDetail);
      setClient(userDetail?.client);
      setService(userDetail?.service);
      setStylist(userDetail?.stylist);
      setStartTime(startT);
      setEndTime(endT);
      setStatus(userDetail?.status);
      setLoading(false);
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
    const response = await AuthService.get(
      "http://localhost:5000/api/v1/clients?page=1"
    );

    if (response.status === 200) {
      setAllClients(response.data.clients);
      setClientLoading(false);
    } else {
      console.log("Something went wrong in Axios");
    }
  }

  async function getAllStylist() {
    const response = await axios.get("http://localhost:5000/api/v1/stylists");

    if (response.status === 200) {
      setAllServices(response.data);
      setStylistLoading(false);
    } else {
      console.log("Something went wrong in Axios");
    }
  }

  async function getOnlyAvailableStylists(startTime, endTime) {
    const response = await axios.post(
      "http://localhost:5000/api/v1/stylists/getAvailableStylish",
      {
        // start: "2022-09-20T00:00:00.000+00:00",
        // end: "2022-09-21T00:00:00.000+00:00",
        start: new Date(startTime),
        end: new Date(endTime),
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
        status: status,
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

  console.log("allClients : ", allClients);
  console.log("allservices : ", allservices);

  if (clientLoading || stylistLoading || loading) {
    return <div>Loading</div>;
  } else {
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
                        style={{
                          width: "250px",
                          height: "35px",
                          marginBottom: "10px",
                          marginTop: "10px",
                        }}
                        type="text"
                        placeholder="John"
                        value={client}
                        onChange={(e) => {
                          console.log("Client: ", e.target.value);
                          setClient(e?.target?.value);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {allClients &&
                          allClients.map((categoria) => {
                            console.log("categoria : ", categoria);
                            return (
                              <MenuItem key={categoria.id} value={categoria.id}>
                                {categoria.firstname} {categoria.lastname}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </div>

                    <div className="formInput">
                      <label>Service</label>
                      <input
                        style={{
                          width: "250px",
                          marginBottom: "10px",
                          marginTop: "10px",
                        }}
                        type="text"
                        placeholder="Doe"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                      />
                    </div>

                    <div className="formInput">
                      <label>Stylist</label>
                      <Select
                        style={{
                          width: "250px",
                          height: "35px",
                          marginBottom: "10px",
                          marginTop: "10px",
                        }}
                        type="text"
                        placeholder="john_doe@gmail.com"
                        value={stylist}
                        onChange={(e) => {
                          console.log("Stylist: ", e.target.value);
                          setStylist(e.target.value);
                        }}
                        disabled={!!!startTime || !!!endTime}
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

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item xs={6}>
                      <div className="formInput">
                        <label>Start Time</label>
                        {/* <TextField
                          style={{
                            width: "250px",
                            height: "35px",
                            marginBottom: "50px",
                            marginTop: "10px",
                          }}
                          id="startTime"
                          // label='Date'
                          type="date"
                          // defaultValue="2017-05-24"
                          value={startTime}
                          sx={{ width: 220 }}
                          onChange={(e) => {
                            console.log("Start time: ", e.target.value);
                            setStartTime(e.target.value);
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        /> */}
                        <DateTimePicker
                          // label="Date&Time picker"
                          value={startTime}
                          onChange={(value) => setStartTime(value)}
                          // onChange={handleChange}
                          renderInput={(params) => <TextField {...params} />}
                          style={{
                            width: "250px",
                            height: "35px",
                            marginBottom: "10px",
                            marginTop: "10px",
                          }}
                        />
                      </div>

                      <div className="formInput">
                        <label>End Time</label>
                        {/* <TextField
                        style={{
                          width: "250px",
                          height: "35px",
                          marginBottom: "10px",
                          marginTop: "10px",
                        }}
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
                      /> */}
                        <DateTimePicker
                          // label="Date&Time picker"
                          value={endTime}
                          onChange={(value) => {
                            setEndTime(value);
                            getOnlyAvailableStylists(startTime, value);
                          }}
                          // onChange={handleChange}
                          renderInput={(params) => <TextField {...params} />}
                          style={{
                            width: "250px",
                            height: "35px",
                            marginBottom: "10px",
                            marginTop: "10px",
                          }}
                          disabled={!!!startTime}
                        />
                      </div>
                    </Grid>
                  </LocalizationProvider>
                </Grid>

                <button
                  // style={{
                  //   width: '150px',
                  //   padding: '10px',
                  //   border: 'none',
                  //   backgroundColor: 'teal',
                  //   color : 'white',
                  //   fontWeight: 'bold',
                  //   cursor: 'pointer',
                  //   marginTop: '10px'
                  // }}
                onClick={(e) => sendHandler(e)}
                disabled={
                  !!!client ||
                  !!!service ||
                  !!!stylist ||
                  !!!startTime ||
                  !!!endTime
                }
                >
                Send
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
      </div >
    );
  }
};

export default NewReservation;