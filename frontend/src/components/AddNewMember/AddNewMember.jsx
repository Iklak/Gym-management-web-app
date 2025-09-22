import React, { useEffect, useState } from "react";
import axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
const AddNewMember = () => {
  const [loaderImage, setLoaderImage] = useState(false);
  const [inputField, setInputField] = useState({
    name: "",
    phone: "",
    address: "",
    joiningDate: "",
    profilePic:
      "https://rukminim2.flixcart.com/image/704/844/jjelq4w0/poster/8/g/j/large-vlpers001609-handsome-slaman-khan-vinyl-poster-original-imaerhrbva6cd8mm.jpeg?q=90&crop=false",
    membership: "",
  });
  const [membership, setMemberShip] = useState([]);
  const [selectedOption, setSelectedOptions] = useState("");
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
        data
      );
      console.log(response);
      const image_url = response.data.url;
      setLoaderImage(false);
      setInputField({ ...inputField, ["profilePic"]: image_url });
    } catch (error) {
      console.log(error);
    }
  };

  const featchMemberShip = async () => {
    await axios
      .get("http://localhost:3000/api/plans/getMemberShip", {
        withCredentials: true,
      })
      .then((res) => {
        setMemberShip(res.data.membership);
        if (res.data.membership.length === 0) {
          return toast.error("no any membership added yet");
        } else {
          let a = res.data.membership[0]._id;
          setSelectedOptions(a);
          setInputField({ ...inputField, membership: a });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    featchMemberShip();
  }, []);
  const handleSelect = (e) => {
    let value = e.target.value;
    setSelectedOptions(value);
    setInputField({ ...inputField, membership: value });
  };

  const handleRegiseterMember = async () => {
    await axios
      .post("http://localhost:3000/api/member/register", inputField, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("somthing wrong");
      });
  };
  return (
    <div className="text-black mb-5">
      <div className="grid grid-cols-2 text-lg gap-5">
        <input
          value={inputField.name}
          onChange={(e) => {
            handleOnchange(e, "name");
          }}
          placeholder="Name of the joinee"
          type="text"
          className="border-2 w-[90%] pl-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.phone}
          onChange={(e) => {
            handleOnchange(e, "phone");
          }}
          placeholder="mobile number"
          type="text"
          className="border-2 w-[90%] pl-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.address}
          onChange={(e) => {
            handleOnchange(e, "address");
          }}
          placeholder="Address"
          type="text"
          className="border-2 w-[90%] pl-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.joiningDate}
          onChange={(e) => {
            handleOnchange(e, "joiningDate");
          }}
          placeholder="Date of Joining"
          type="date"
          className="border-2 w-[90%] pl-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <select
          value={selectedOption}
          onChange={handleSelect}
          className="border-2 w-[90%] h-12 pb-2 border-slate-400 rounded-md placeholder:text-gray"
        >
          {membership.map((item, index) => (
            <option key={index} value={item._id}>
              {" "}
              {item.months} Month Membership
            </option>
          ))}
        </select>
        <input
          onChange={(e) => {
            uploadImage(e);
          }}
          type="file"
          className="border-2 w-[90%] h-12 pb-2 border-slate-400 rounded-md placeholder:text-gray"
        />

        <div className="w-1/4">
          <img
            className="w-full h-full rounded-full"
            src={inputField.profilePic}
            alt=""
          />
          {loaderImage && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </div>
        <div
          onClick={() => handleRegiseterMember()}
          className="p-3 border-2 mt-5 w-28 text-lg h-14 text-center  bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          Register
        </div>
      </div>
    </div>
  );
};

export default AddNewMember;
