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
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPass: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/users");
    }
  }, []);

  const handleSubmit = (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/user/login", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        console.log("Login response: ", res);

        if (res.data.status === true) {
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard")
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
              <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      type="text"
                      fullWidth
                      label="Enter your username"
                      placeholder="Username"
                      variant="outlined"
                      required
                      onChange={(e) => setValues({ ...values, username: e.target.value })}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      type={values.showPass ? "text" : "password"}
                      fullWidth
                      label="Password"
                      placeholder="Password"
                      variant="outlined"
                      required
                      onChange={(e) => setValues({ ...values, password: e.target.value })}
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
                    />
                  </Grid>

                  <Grid item>
                    <Link to={`/admin/edit`} style={{ textDecoration: "none", textAlign: "center" }}>
                      <p>Forgotten password?</p>
                    </Link>
                  </Grid>

                  <Grid item>
                    <Button style={{ backgroundColor: '#e9205c' }} type="submit" fullWidth variant="contained">
                      Sign In
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

export default Login;