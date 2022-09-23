import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Grid from "@mui/material/Grid";

const New = ({ inputs, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [file, setFile] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lasttName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    // Your code here
    const isEditRoute = location?.pathname?.includes("edit");
    setIsEdit(isEditRoute);
    if (isEditRoute) {

      getClientById();
    }
  }, []);

  async function getClientById() {
    const response = await axios.get(
      `http://localhost:5000/api/v1/clients/${params?.id}`
    );

    if (response.status === 200) {
      const userDetail = response?.data;
      setUserDetails(userDetail);
      setFirstName(userDetail?.firstname);
      setLastName(userDetail?.lastname);
      setEmail(userDetail?.email);
      setPhoneNumber(userDetail?.phonenumber);
      console.log("User details: ", userDetail);
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  async function clientCreate(e) {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/api/v1/clients", {
      firstname: firstName,
      lastname: lasttName,
      phonenumber: phoneNumber,
      email: email,
    });

    console.log("Req body: ", firstName, lasttName, phoneNumber, email);

    if (response.status === 200) {
      console.log("Responseclienttt:", response);
      toast("Success! Client created successfully", { type: "success" });

      setTimeout(() => {
        navigate("/users");
      }, "2000");
    } else {
      toast(response.data.message, { type: "error" });
    }
  }

  async function updateClient(e) {
    e.preventDefault();
    const response = await axios.put(
      `http://localhost:5000/api/v1/clients/${userDetails?._id}`,
      {
        firstname: firstName,
        lastname: lasttName,
        phonenumber: phoneNumber,
        email: email,
      }
    );

    if (response.status === 200) {
      toast("Success! Client updated successfully", { type: "success" });

      setTimeout(() => {
        navigate("/users");
      }, "2000");
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  //   {
  //     "client": "6318c5ba72182088162c6c3e",
  //     "service": "test",
  //     "stylist": "631ac79de92d57e79c79b180",
  //     "date": "Sat Sep 10 2022 00:00:00 GMT+0530 (India Standard Time)",
  //     "startTime": "Sat Sep 10 2022 06:00:00 GMT+0530 (India Standard Time)",
  //     "endTime": "Sat Sep 10 2022 06:00:00 GMT+0530 (India Standard Time)"
  // }

  const sendHandler = (e) => {
    isEdit ? updateClient(e) : clientCreate(e);
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
                <Grid item xs={8}>
                  <div className="formInput">
                    <label>First Name</label>
                    <TextField
                      style={{
                        width: 1000,
                        height: 50,
                        marginBottom: 10,
                        marginTop : 10
                      }}
                      id="firstname"
                      label="firstname"
                      variant="outlined"
                      value={firstName}
                      required
                      fullWidth
                      onChange={(e) => setFirstName(e.target.value)}
                    />

                  </div>

                  <div className="formInput">
                    <label>Last Name</label>
                    <TextField
                      style={{
                        width: 1000,
                        height: 50,
                        marginBottom: 10,
                        marginTop : 10
                      }}
                      id="lastname"
                      label="lastname"
                      variant="outlined"
                      value={lasttName}
                      required
                      fullWidth
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className="formInput">
                    <label>Email</label>
                    <TextField
                      style={{
                        width: 1000,
                        height: 50,
                        marginBottom: 10,
                        marginTop : 10
                      }}
                      id="email"
                      label="email"
                      variant="outlined"
                      value={email}
                      required
                      fullWidth
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                  </div>

                  <div className="formInput">
                    <label>Phone</label>
                    <TextField
                      style={{
                        width: 1000,
                        height: 50,
                        marginBottom: 10,
                        marginTop : 10
                      }}
                      id="phone"
                      label="phone"
                      variant="outlined"
                      type="number"
                      value={phoneNumber}
                      required
                      fullWidth
                      autoComplete="phone"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />

                  </div>
                </Grid>
              </Grid>

              <button
                style={{
                  width: '150px',
                  padding: '10px',
                }}
                onClick={(e) => sendHandler(e)}
                disabled={
                  !!!firstName ||
                  !!!lasttName ||
                  !!!email ||
                  !!!phoneNumber
                }
              >
                Send
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>

      </div>
    </div>
  );
};

export default New;
