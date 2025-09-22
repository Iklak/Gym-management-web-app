import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import axios from "axios";
import { toast } from "react-toastify";
function GeneralMember() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Pending");
  const [renew, setRenew] = useState(false);
  const [data, setData] = useState(null);
  const [memberShip, setMemberShip] = useState([]);
  const [planMember, setPlanMember] = useState("");
  const { id } = useParams();
  const handleSwitchBtn = async () => {
    let statuss = status === "Active" ? "Pending" : "Active";
    await axios
      .post(
        `http://localhost:3000/api/member/change-status/${id}`,
        { status: statuss },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });

    setStatus(statuss);
  };

  useEffect(() => {
    fetchData();
    fetchMemberShip();
  }, []);

  const fetchMemberShip = async () => {
    await axios
      .get("http://localhost:3000/api/plans/getMemberShip", {
        withCredentials: true,
      })
      .then((res) => {
        setMemberShip(res.data.membership);
        setPlanMember(res.data.membership[0]._id);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const fetchData = async () => {
    await axios
      .get(`http://localhost:3000/api/member/get-member/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setData(res.data.member);
        setStatus(res.data.member.status);
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const isDataInPast = (inputData) => {
    const today = new Date();
    const givenDate = new Date(inputData);
    return givenDate < today;
  };
  const handleOnChangeSelect = (event) => {
    let value = event.target.value;
    setPlanMember(value);
  };

  const handleRenewSave = async () => {
    await axios
      .put(
        `http://localhost:3000/api/member/update-plan/${id}`,
        { membership: planMember },
        { withCredentials: true }
      )
      .then((res) => {
        setData(res.data.member);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };
  return (
    <div className="text-black w-3/4 p-5">
      <div
        onClick={() => navigate(-1)}
        className="border-2 w-fit text-xl font-sans text-white p-2 rounded-xl bg-black"
      >
        <ArrowBackIcon />
        Back
      </div>

      <div className="mt-10 p-2 flex flex-col">
        <div className="w-[100%] h-fit flex">
          <div className="w-1/3 mx-auto">
            <img src={data?.profilePic} alt="" className="w-full mx-auto" />
          </div>
          <div className="w-2/3 mt-5 text-xl p-5">
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Name:{data?.name}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Mobile:{data?.phone}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Address:{data?.address}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Joined Date:
              {data?.createdAt?.slice(0, 10).split("-").reverse().join("-")}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Next Bill Date:
              {data?.nextBillDate?.slice(0, 10).split("-").reverse().join("-")}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Status:{data?.status}
              <Switch
                onColor="#63666F1"
                checked={status === "Active"}
                onChange={() => handleSwitchBtn()}
              />
            </div>
            {isDataInPast(data?.nextBillDate) && (
              <div
                onClick={() => setRenew((prev) => !prev)}
                className={`mt-1 ${
                  renew && status == "Active"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    : null
                } text-center rounded-lg p-3 border-2 border-slate-900 w-full md:w-1/2 cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}
              >
                Renew
              </div>
            )}
          </div>
        </div>
        {renew && status == "Active" ? (
          <div className="rounded-lg p-3 mt-5 mx-auto  mb-5 h-fit bg-sla  md:w-[50%]">
            <div className="w-full">
              <div className="my-5">
                <div>Membership</div>
                <select
                  value={planMember}
                  onChange={handleOnChangeSelect}
                  className="w-full border-2 p-2 rounded-lg"
                >
                  {memberShip.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.months} Month Plan
                      </option>
                    );
                  })}
                </select>

                <div
                  onClick={() => handleRenewSave()}
                  className={`mt-1 rounded-lg p-3 border-2 border-slate-900 text-center w-1/2 mx-auto cursor-pointer hover:text-white hover: bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}
                >
                  Save
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default GeneralMember;
