import React, { useState } from "react";
import "./Signup.css";
import Modal from "../Modal/Modal";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
function Signup() {
  const [forgotPassword, setForgetPassword] = useState(false);
  const [loaderImage, setLoaderImage] = useState(false);
  const [inputField, setInputField] = useState({
    gymName: "",
    email: "",
    userName: "",
    password: "",
    profilePic:
      "https://t4.ftcdn.net/jpg/00/99/82/15/360_F_99821575_nVEHTBXzUnTcLIKN6yOymAWAnFwEybGb.jpg",
  });
  const handleRegester = async () => {
    await axios
      .post(
        "https://gym-management-web-app.onrender.com/api/auth/register",
        inputField,
      )
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error("invalid credential");
      });
  };
  const handleClose = () => {
    setForgetPassword((prev) => !prev);
  };
  const handleOnchange = (e, name) => {
    setInputField({ ...inputField, [name]: e.target.value });
  };
  console.log(inputField);

  const uploadImage = async (event) => {
    setLoaderImage(true);
    console.log("upploading");
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    // dway72hvs

    data.append("upload_preset", "gym-management");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dway72hvs/image/upload",
        data,
      );
      console.log(response);
      const image_url = response.data.url;
      setLoaderImage(false);
      setInputField({ ...inputField, ["profilePic"]: image_url });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="customSignup w-1/3 p-10 ml-20 mt-20 bg-gray-50/20  h-[450px] overflow-y-auto">
      <div className="font-sans text-white text-center text-3xl">
        Register Your Gym
      </div>
      <input
        value={inputField.email}
        onChange={(e) => {
          handleOnchange(e, "email");
        }}
        type="email"
        className="w-full my-10 p-2 rounded-lg bg-white outline-none cursor-pointer"
        placeholder="Enter Email"
      />
      <input
        value={inputField.userName}
        onChange={(e) => {
          handleOnchange(e, "userName");
        }}
        type="text"
        className="w-full mb-10 p-2 rounded-lg bg-white outline-none cursor-pointer"
        placeholder="Enter userName"
      />
      <input
        value={inputField.gymName}
        onChange={(e) => {
          handleOnchange(e, "gymName");
        }}
        type="text"
        className="w-full mb-10 p-2 rounded-lg bg-white outline-none cursor-pointer"
        placeholder="Enter Gym Name"
      />
      <input
        value={inputField.password}
        onChange={(e) => {
          handleOnchange(e, "password");
        }}
        type="password"
        className="w-full mb-5 p-2 rounded-lg bg-white outline-none cursor-pointer"
        placeholder="Enter password"
      />
      <input
        onChange={(e) => {
          uploadImage(e);
        }}
        type="file"
        className="w-full mb-10 p-2 rounded-lg bg-white outline-none"
      />

      {loaderImage && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}

      <img src={inputField.profilePic} className="h-[200px] mb-5" />
      <div
        onClick={() => handleRegester()}
        className="p-2 w-[80%] bg-slate-800 mx-auto rounded-lg text-white text-center text-lg cursor-pointer hover:bg-white hover:text-black font-semibold"
      >
        Register
      </div>
      <div
        className="p-2 w-[80%] bg-slate-800 mx-auto rounded-lg mt-5 text-white text-center text-lg cursor-pointer hover:bg-white hover:text-black font-semibold"
        onClick={handleClose}
      >
        Forgot Password
      </div>
      {forgotPassword ? (
        <Modal
          header="Forgot Passwword"
          handleClose={handleClose}
          content={<ForgotPassword />}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Signup;
