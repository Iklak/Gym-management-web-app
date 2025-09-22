import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginField, setLoginField] = useState({
    userName: "",
    password: "",
  });
  const handleLogin = async () => {
    // sessionStorage.setItem("isLogin", true);
    // navigate("/dashboard");
    await axios
      .post("http://localhost:3000/api/auth/login", loginField, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("gymName", res.data.gym.gymName);
        localStorage.setItem("gymPic", res.data.gym.profilePic);
        localStorage.setItem("isLogin", true);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error("invalid credential");
      });
  };

  const handleOnChange = (e, name) => {
    setLoginField({ ...loginField, [name]: e.target.value });
  };
  // console.log(loginField);

  return (
    <div className="w-1/3 p-10 ml-20 mt-20 bg-gray-50/20 h-fit ">
      <div className="font-sans text-white text-center text-3xl">Login</div>
      <input
        value={loginField.userName}
        onChange={(e) => {
          handleOnChange(e, "userName");
        }}
        type="text"
        className="w-full my-10 p-2 rounded-lg bg-white outline-none cursor-pointer"
        placeholder="Enter userName"
      />
      <input
        value={loginField.password}
        onChange={(e) => {
          handleOnChange(e, "password");
        }}
        type="password"
        className="w-full mb-5 p-2 rounded-lg bg-white outline-none cursor-pointer"
        placeholder="Enter password"
      />
      <div
        className="p-2 w-[80%] bg-slate-800 mx-auto rounded-lg text-white text-center text-lg cursor-pointer hover:bg-white hover:text-black font-semibold "
        onClick={() => handleLogin()}
      >
        Login
      </div>
    </div>
  );
};

export default Login;
