// import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from '@mui/material/TextField';

import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';

const validationSchema = yup.object({
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmpassword: yup
        .string('Enter your password again')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password confirmation is required'),

});

const AdminReset = ({ inputs, title }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [isReset, setIsReset] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const isResetRoute = location?.pathname?.includes("reset_password");
        setIsReset(isResetRoute);

        if (isResetRoute) {
            getUserById();
        }

    }, []);

    async function getUserById() {
        const response = await axios.get(
            `http://localhost:5000/api/v1/user/${params?.id}`
        );

        if (response.status === 200) {
            const userDetail = response?.data;
            console.log("userDetailAdmin: ", response.data);
            setUserDetails(userDetail);
            // setPassword(userDetail?.password);
            // setConfirmPassword(userDetail?.password);
        } else {
            toast("Something went wrong", { type: "error" });
        }
    }

    async function passwordReset(values) {
        const response = await axios.put(
            `http://localhost:5000/api/v1/user/reset_password/${userDetails?._id}`,
            {
                password: values.password,
                confirmpassword: values.confirmpassword
            }
        );

        if (response.status === 200) {
            toast("Success! Password updated successfully", { type: "success" });

            setTimeout(() => {
                navigate("/admin");
            }, "2000");
        } else {
            toast(response.data.message, { type: "error" });
        }
    }

    const formik = useFormik({
        initialValues: {
            password: password,
            confirmpassword: confirmpassword
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("Admin Values: ", values);
            passwordReset(values)
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

                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />

                            <TextField
                                fullWidth
                                id="confirmpassword"
                                name="confirmpassword"
                                label="Confirm Password"
                                type="password"
                                value={formik.values.confirmpassword}
                                onChange={formik.handleChange}
                                error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                                helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
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
                        </form>
                    </div>

                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default AdminReset;