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
import moment from "moment/moment";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

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
  const [clientLoading, setClientLoading] = useState(true);
  const [stylistLoading, setStylistLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const [userDetails, setUserDetails] = useState(null);
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
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

      var momentEndTime = moment(new Date(userDetail?.endTime));
      // var endT = d.toISOString().split("T")[0];
      var momentStartTime = moment(new Date(userDetail?.startTime));
      // var startT = sd.toISOString().split("T")[0];

      setUserDetails(userDetail);
      setClient(userDetail?.client);
      setService(userDetail?.service);
      setStylist(userDetail?.stylist);
      setStartTime(momentStartTime);
      setEndTime(momentEndTime);
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
    e.preventDefault()
    let checkAvailableTime = validateTime(startTime, endTime)
    console.log("checkAvailableTime: ", checkAvailableTime);
    if (!checkAvailableTime) {
      toast("Reservation maximum duration is 1 hour", { type: "error" });
    } else {
      isEdit ? reservationUpdate(e) : reservationCreate(e);
    }
  };

  console.log("allClients : ", allClients);
  console.log("allservices : ", allservices);

  const handleService = (event) => {
    setService(event.target.value);
  };

  const currentDate = new Date();

  const disablePreDates = (currentDate) => {
    const startSeconds = Date.parse(currentDate);
    return (date) => {
      return Date.parse(date) < startSeconds;
    }
  }

  const validateTime = () => {
    console.log("startTT: ", startTime);
    console.log("endTT: ", endTime);
    const difference = endTime.diff(startTime, 'hours')

    console.log("DIFFRENCE: ", difference);

    if (difference <= 1) {
      return true;
    } else {
      return false;
    }
  }

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
                  <Grid item xs={8}>
                    <div className="formInput">
                      <label>Client</label>
                      <Select
                        style={{
                          width: 225,
                          height: 40,
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
                            // console.log("categoria : ", categoria);
                            return (
                              <MenuItem key={categoria.id} value={categoria.id}>
                                {categoria.firstname} {categoria.lastname}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </div>

                    <Box sx={{ minWidth: 120 }}>
                      <FormControl >
                        <InputLabel id="demo-simple-select-label">Service</InputLabel>
                        <Select
                          style={{
                            width: 225,
                            height: 40,
                            marginBottom: "10px",
                            marginTop: "10px",
                          }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={service}
                          label="service"
                          onChange={handleService}
                        >
                          <MenuItem value='HairStyle'>HairStyle</MenuItem>
                          <MenuItem value='Facial'>Facial</MenuItem>
                          <MenuItem value='MakeUP'>MakeUP</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <div className="formInput">
                      <label>Stylist</label>
                      <Select
                        style={{
                          width: 225,
                          height: 40,
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
                        <DateTimePicker
                          // label="Date&Time picker"
                          value={startTime}
                          onChange={(value) => {
                            setStartTime(value)
                            console.log("Start time11 :", value);
                            console.log("Start time GTM :", moment(value).format("h:mm a"));
                          }}
                          // onChange={handleChange}
                          renderInput={(params) => <TextField {...params} />}
                          style={{
                            width: "250px",
                            height: "35px",
                            marginBottom: "10px",
                            marginTop: "10px",
                          }}
                          shouldDisableDate={disablePreDates(currentDate)}
                          shouldDisableTime={(timeValue, clockType) => {
                            return (clockType === "hours" && timeValue <= 7) || (clockType === "hours" && timeValue > 17);
                          }}
                        />
                      </div>

                      <div className="formInput">
                        <label>End Time</label>
                        <DateTimePicker
                          // label="Date&Time picker"
                          value={endTime}
                          onChange={(value) => {
                            setEndTime(value);
                            getOnlyAvailableStylists(startTime, value);
                            console.log("End time :", value);
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
                          shouldDisableDate={disablePreDates(currentDate)}
                          shouldDisableTime={(timeValue, clockType) => {
                            return (clockType === "hours" && timeValue <= 7) || (clockType === "hours" && timeValue > 17);
                          }}
                        />
                      </div>
                    </Grid>
                  </LocalizationProvider>
                </Grid>

                <button
                  style={{
                    width: '150px',
                    padding: '10px',
                  }}
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