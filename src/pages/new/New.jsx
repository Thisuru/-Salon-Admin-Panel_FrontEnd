import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    }
    getClientById();
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
      toast("Success! Client created successfully", { type: "success" });

      setTimeout(() => {
        navigate("/users");
      }, "2000");
    } else {
      toast("Something went wrong", { type: "error" });
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
                <Grid item xs={6}>
                  {/* <div className='formInput'>
                    <input
                      type='file'
                      id='file'
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: 'none' }}
                    />
                  </div> */}

                  <div className="formInput">
                    <label>First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="formInput">
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      value={lasttName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="formInput">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder="john_doe@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="formInput">
                    <label>Phone</label>
                    <input
                      type="text"
                      placeholder="+94 234 567 897"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
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

export default New;
