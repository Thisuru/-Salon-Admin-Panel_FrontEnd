import "./reservation.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Grid from '@material-ui/core/Grid'

import Grid from "@mui/material/Grid";
import { MenuItem, Select, TextField } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const NewReservation = ({ inputs, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);
  // const location = useLocation();
  // console.log("location: ", location);

  //     "client": "6318c5ba72182088162c6c3e",
  //     "service": "test",
  //     "stylist": "631ac79de92d57e79c79b180",
  //     "date": "Sat Sep 10 2022 00:00:00 GMT+0530 (India Standard Time)",
  //     "startTime": "Sat Sep 10 2022 06:00:00 GMT+0530 (India Standard Time)",
  //     "endTime": "Sat Sep 10 2022 06:00:00 GMT+0530 (India Standard Time)"

  const [allClients, setAllClients] = useState("");
  const [allservices, setAllServices] = useState("");

  const [client, setClient] = useState("");
  const [service, setService] = useState("");
  const [stylist, setStylist] = useState("");
  const [date, setDate] = useState("");
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
    }

  }, []);

  async function getReservationById() {
    const response = await axios.get(
      `http://localhost:5000/api/v1/reservation/${params?.id}`
    );

    if (response.status === 200) {
      const userDetail = response?.data;
      console.log("userDetails", userDetail);
      setUserDetails(userDetail);
      // setClient(userDetail?.client);
      setService(userDetail?.service);
      setStylist(userDetail?.stylist);
      setStartTime(userDetail?.startTime);
      setEndTime(userDetail?.endTime);
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
        startTime: new Date(startTime),
        endTime: endTime,
      }
    );

    if (response.status === 200) {
      console.log("Post Client: ", response);
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
      console.log("Success in Axios res.client ", response);
      setAllClients(response.data.clients);
      // setLoading(false)
    } else {
      console.log("Something went wrong in Axios");
    }
  }

  async function getAllStylist() {
    const response = await axios.get("http://localhost:5000/api/v1/stylists");

    if (response.status === 200) {
      console.log("Success in Axios res.stylists ", response);
      setAllServices(response.data);
      // setLoading(false)
    } else {
      console.log("Something went wrong in Axios");
    }
  }

  // useEffect(() => {
  //   getAllClients();
  //   getAllStylist();
  // }, []);

  // console.log('Firstname ', firstName)

  //   {
  //     "client": "6318c5ba72182088162c6c3e",
  //     "service": "test",
  //     "stylist": "631ac79de92d57e79c79b180",
  //     "date": "Sat Sep 10 2022 00:00:00 GMT+0530 (India Standard Time)",
  //     "startTime": "Sat Sep 10 2022 06:00:00 GMT+0530 (India Standard Time)",
  //     "endTime": "Sat Sep 10 2022 06:00:00 GMT+0530 (India Standard Time)"
  // }

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
                      type="text"
                      placeholder="John"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
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
                      type="text"
                      placeholder="Doe"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                    />
                  </div>

                  {/* <div className="formInput">
                    <label>Start Time</label>
                    <TextField
                      id="startTime"
                      // label='End Time'
                      type="time"
                      // defaultValue='07:30'
                      onChange={(e) => setStartTime(e.target.value)}
                      value={startTime}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      sx={{ width: 150 }}
                    />
                  </div> */}
                  
                  <div className="formInput">
                    <label>Start Time</label>
                    <TextField
                      id="startTime"
                      // label='Date'
                      type="date"
                      // defaultValue="2017-05-24"
                      value={startTime}
                      sx={{ width: 220 }}
                      onChange={(e) => setStartTime(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className="formInput">
                    <label>Stylist</label>
                    <Select
                      type="text"
                      placeholder="john_doe@gmail.com"
                      value={stylist}
                      onChange={(e) => setStylist(e.target.value)}
                    >
                      {allservices &&
                        allservices.map((categoria) => (
                          <MenuItem key={categoria._id} value={categoria._id}>
                            {categoria.firstname} {categoria.lastname}
                          </MenuItem>
                        ))}
                    </Select>
                  </div>

                  {/* <div className="formInput">
                    <label>Date</label>
                    <TextField
                      id="date"
                      // label='Date'
                      type="date"
                      defaultValue="2017-05-24"
                      value={date}
                      sx={{ width: 220 }}
                      onChange={(e) => setDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div> */}

                  {/* <div className="formInput">
                    <label>End Time</label>
                    <TextField
                      id="endTime"
                      // label='End Time'
                      type="time"
                      // defaultValue='07:30'
                      value={endTime}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setEndTime(e.target.value)}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      sx={{ width: 150 }}
                    />
                  </div> */}

                  <div className="formInput">
                    <label>End Time</label>
                    <TextField
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

              <button onClick={(e) => reservationCreate(e)}>Send</button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default NewReservation;
