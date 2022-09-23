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

import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';

const phoneRegExp = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/

const validationSchema = yup.object({
  firstname: yup
    .string('Enter your firstname')
    .required('First Name is required'),
  lastname: yup
    .string('Enter your firstname')
    .required('Last Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup
    .string().matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone Number is required')

});

const New = ({ inputs, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lasttName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
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
      console.log("userDetail: ", response.data);
      setUserDetails(userDetail);
      setFirstName(userDetail?.firstname);
      setLastName(userDetail?.lastname);
      setEmail(userDetail?.email);
      setPhoneNumber(userDetail?.phonenumber);
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  async function clientCreate(value) {
    console.log("Client Create Formik body: ", value);

    const response = await axios.post("http://localhost:5000/api/v1/clients", {
      firstname: value.firstname,
      lastname: value.lastname,
      phonenumber: value.phone,
      email: value.email,
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

  async function updateClient(value) {
    console.log("Values: ", value);
    const response = await axios.put(
      `http://localhost:5000/api/v1/clients/${userDetails?._id}`,
      {
        firstname: value.firstname,
        lastname: value.lastname,
        phonenumber: value.phone,
        email: value.email,
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

  const sendHandler = (value) => {
    console.log("sendHandler value: ", value);
    isEdit ? updateClient(value) : clientCreate(value);
  };

  const formik = useFormik({
    initialValues: {
      firstname: firstName,
      lastname: lasttName,
      email: email,
      phone: phoneNumber
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Values:: ", values);
      sendHandler(values)
    },
  });

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
            <form onSubmit={formik.handleSubmit}>
              {/* <Grid container> */}

              {/* <div className="formInput">
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
                  </div> */}

              <TextField
                fullWidth
                id="firstname"
                name="firstname"
                label="First name"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                helperText={formik.touched.firstname && formik.errors.firstname}
              />

              <TextField
                fullWidth
                id="lastname"
                name="lastname"
                label="Last name"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                helperText={formik.touched.lastname && formik.errors.lastname}
              />

              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />

              <Button
                color="primary"
                variant="contained"
                style={{
                  backgroundColor: '#e9205c'
                }}
                fullWidth type="submit">
                Submit
              </Button>
              {/* <div className="formInput">
                    <label>Last Name</label>
                    <TextField
                      style={{
                        width: 1000,
                        height: 50,
                        marginBottom: 10,
                        marginTop: 10
                      }}
                      id="lastname"
                      label="lastname"
                      variant="outlined"
                      value={lasttName}
                      required
                      fullWidth
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div> */}

              {/* <Grid item xs={6}>
                  <div className="formInput">
                    <label>Email</label>
                    <TextField
                      style={{
                        width: 1000,
                        height: 50,
                        marginBottom: 10,
                        marginTop: 10
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
                        marginTop: 10
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
                </Grid> */}
              {/* </Grid> */}

              {/* <button
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
              </button> */}
            </form>
          </div>
          <ToastContainer />
        </div>

      </div>
    </div>
  );
};

export default New;
