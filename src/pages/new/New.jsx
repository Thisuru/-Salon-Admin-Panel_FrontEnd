import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const New = ({ inputs, title }) => {
  // const location = useLocation();
  // console.log("location: ", location);
  
  const [file, setFile] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lasttName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  async function clientCreate(e) {
    e.preventDefault()
    const response = await axios.post(
      "http://localhost:5000/api/v1/clients",
      {
        firstname: firstName,
        lastname: lasttName,
        phonenumber: phoneNumber,
        email: email
      }
    );

    if (response.status === 200) {
      console.log("Post Client: ", response);
      toast("Success! Client created successfully", { type: "success" });

    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  console.log("Firstname ", firstName);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
          <div className="right">
            <form>
              <div className="formInput">
                {/* <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label> */}
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} value={input.value} onChange={() => console.log("Value")} />
                </div>
              ))} */}

              <div className="formInput">
                <label>First Name</label>
                <input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>

              <div className="formInput">
                <label>Last Name</label>
                <input type="text" placeholder="Doe" value={lasttName} onChange={(e) => setLastName(e.target.value)} />
              </div>

              <div className="formInput">
                <label>Email</label>
                <input type="text" placeholder="john_doe@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="formInput">
                <label>Phone</label>
                <input type="text" placeholder="+94 234 567 897" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>

              <button onClick={(e) => clientCreate(e)}>Send</button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default New;
