import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function ForgotPassword() {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [contentVal, setContenVal] = useState("Submit Your Email");

  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const hadleSubmit = () => {
    if (!emailSubmit) {
      // setEmailSubmit(true);
      // setContenVal("Submit your OTP");
      sendOtp();
    } else if (emailSubmit && !otpValidate) {
      // setOtpValidate(true);
      // setContenVal("Submit Your New Password");
      verifyOTP();
    } else {
      changPassword();
    }
  };

  const sendOtp = async () => {
    await axios
      .post(
        "https://gym-management-web-app.onrender.com/api/auth/reset-password/sendotp",
        {
          email: inputField.email,
        },
      )
      .then((res) => {
        console.log(res);
        setEmailSubmit(true);
        setContenVal("Submit your OTP");
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const verifyOTP = async () => {
    await axios
      .post(
        "https://gym-management-web-app.onrender.com/api/auth/reset-password/checkotp",
        {
          email: inputField.email,
          otp: inputField.otp,
        },
      )
      .then((res) => {
        setOtpValidate(true);
        setContenVal("Submit Your New Password");
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const changPassword = async () => {
    await axios
      .post(
        "https://gym-management-web-app.onrender.com/api/auth/reset-password",
        {
          email: inputField.email,
          newPassword: inputField.newPassword,
        },
      )
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };
  const handleOnchage = (e, name) => {
    setInputField({ ...inputField, [name]: e.target.value });
  };

  return (
    <div className="w-full ">
      <div className="w-full mb-5 mx-5">
        <div>Enter Your Email</div>
        <input
          value={inputField.email}
          onChange={(e) => {
            handleOnchage(e, "email");
          }}
          type="text"
          className="w-1/2 p-2 rounded-lg border-2 border-slate-400 "
          placeholder="Enter your Email"
        />
      </div>
      {emailSubmit && (
        <div className="w-full mb-5 mx-5">
          <div>Enter Your OTP</div>
          <input
            value={inputField.otp}
            onChange={(e) => {
              handleOnchage(e, "otp");
            }}
            type="text"
            className="w-1/2 p-2 rounded-lg border-2 border-slate-400 "
            placeholder="Enter your OTP"
          />
        </div>
      )}
      {otpValidate && (
        <div className="w-full mb-5 mx-5">
          <div>Enter Your New Password</div>
          <input
            value={inputField.newPassword}
            onChange={(e) => {
              handleOnchage(e, "newPassword");
            }}
            type="text"
            className="w-1/2 p-2 rounded-lg border-2 border-slate-400 "
            placeholder="Enter your New Password"
          />
        </div>
      )}
      <div
        onClick={() => hadleSubmit()}
        className="bg-slate-800 mb-5 text-white mx-auto w-2/3 p-3 rounded-lg text-center font-semibold cursor-pointer hover:bg-white hover:text-black hover:border-2"
      >
        {contentVal}
      </div>
    </div>
  );
}

export default ForgotPassword;
