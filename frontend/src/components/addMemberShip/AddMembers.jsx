import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { toast } from "react-toastify";
function AddMembers({ handleClose }) {
  const [inputField, setInputField] = useState({
    months: "",
    price: "",
  });
  const [memberShip, setMemberShip] = useState([]);
  const handleOnChange = (e, name) => {
    setInputField({ ...inputField, [name]: e.target.value });
  };

  const fetchMemberShip = async () => {
    await axios
      .get("http://localhost:3000/api/plans/getMemberShip", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        setMemberShip(res.data.membership);
        toast.success(res.data.membership.length + "Membership Fetched");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };
  useEffect(() => {
    fetchMemberShip();
  }, []);

  const handleAddMembership = async () => {
    await axios
      .post("http://localhost:3000/api/plans/add-membership", inputField, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };
  return (
    <div className="text-black">
      <div className="flex flex-wrap gap-5 ite justify-center">
        {/* block for membership */}
        {memberShip.map((item, index) => {
          return (
            <div
              key={index}
              className="text-lg bg-slate-900 text-white border-2 pl-2 pr-2 flex-col gap-3 justify-between pt-1 pb-1 rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            >
              <div>{item.months} Months Membership</div>
              <div>Rs{item.price}</div>
            </div>
          );
        })}
      </div>
      <hr className="mt-10 mb-10" />
      <div className="flex gap-10 mb-10 mr-2">
        <input
          value={inputField.months}
          onChange={(e) => {
            handleOnChange(e, "months");
          }}
          className="border-2 rounded-lg text-lg w-1/2 h-1/2 p-2"
          placeholder="add the number of month"
          type="text"
        />
        <input
          value={inputField.price}
          onChange={(e) => {
            handleOnChange(e, "price");
          }}
          className="border-2 rounded-lg text-lg w-1/2 h-1/2 p-2"
          placeholder="add Price"
          type="text"
        />
        <div
          onClick={() => handleAddMembership()}
          className="text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          Add+
        </div>
      </div>
    </div>
  );
}

export default AddMembers;
