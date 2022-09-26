import {
    Container,
    Button,
    Grid,
    Paper,
    TextField,
    IconButton,
    InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useFormik } from 'formik';
import * as yup from 'yup';

const phoneRegExp = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/

const validationSchema = yup.object({
    firstname: yup
        .string('Enter your firstname')
        .required('First Name is required'),
    lastname: yup
        .string('Enter your lastname')
        .required('Last Name is required'),
    username: yup
        .string('Enter your username')
        .required('User Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    phone: yup
        .string().matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone Number is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),

});

const Register = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
        showPass: false,
    });

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            phone: '',
            password: ''
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            userRegister(values)
            console.log("formik onsubmit: ", values);
        },
    });

    const userRegister = (values) => {
        axios
          .post("http://localhost:5000/api/v1/user/register", {
            firstname: values.firstname,
            lastname: values.lastname,
            username : values.username,
            email : values.email,
            phone : values.phone,
            password : values.password
        })
          .then((res) => {
            console.log("Login response: ", res);
    
            if (res.data.status === true) {
                toast('User Created!', { type: "success" });
              navigate("/")
            } else {
              toast(res.data.message, { type: "error" });
            }
    
          })
          .catch((err) => console.error(err));
      };

    const handlePassVisibilty = () => {
        setValues({
            ...values,
            showPass: !values.showPass,
        });
    };

    return (
        <div className="listContainer">
            {/* <Navbar /> */}
            <div>
                <Container maxWidth="sm">
                    <Grid
                        container
                        spacing={2}
                        direction="column"
                        justifyContent="center"
                        style={{ minHeight: "100vh" }}
                    >
                        <Paper elelvation={2} sx={{ padding: 5 }}>
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
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
                                    </Grid>

                                    <Grid item>
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
                                    </Grid>

                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            id="username"
                                            name="username"
                                            label="User name"
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            error={formik.touched.username && Boolean(formik.errors.username)}
                                            helperText={formik.touched.username && formik.errors.username}
                                        />
                                    </Grid>

                                    <Grid item>
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
                                    </Grid>

                                    <Grid item>
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
                                    </Grid>

                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type={values.showPass ? "text" : "password"}
                                            // variant="outlined"
                                            // required
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handlePassVisibilty}
                                                            aria-label="toggle password"
                                                            edge="end"
                                                        >
                                                            {values.showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <Button style={{ backgroundColor: '#e9205c' }} type="submit" fullWidth variant="contained">
                                            Sign Up
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Container>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;