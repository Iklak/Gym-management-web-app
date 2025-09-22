import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Member from "../Member/Member";
import MemberCards from "../../components/MemberCard/MemberCards";
import {
  getMonthlyJoined,
  expire,
  expireINthree,
  expireInSeven,
  inactive,
} from "../../pages/GeneralUser/data";
function GeneralUser() {
  const [header, setHeader] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const func = sessionStorage.getItem("func");
    fuctionCall(func);
  }, [sessionStorage.getItem("func")]);

  const fuctionCall = async (func) => {
    switch (func) {
      case "monthly":
        setHeader("Monthly Joined Member");
        var datas = await getMonthlyJoined();
        setData(datas);
        break;
      case "expiredWithThreeDays":
        setHeader("Expiring within 3 days");
        var datas = await expireINthree();
        setData(datas);
        break;
      case "expiredWithFourToSevenDays":
        setHeader("Expiring within 4-7 days");
        var datas = await expireInSeven();
        setData(datas);
        break;
      case "expired":
        setHeader("Expired");
        var datas = await expire();
        setData(datas);
        break;
      case "incative":
        setHeader("Incative");
        var datas = await inactive();
        setData(datas);
        break;
    }
  };
  return (
    <div className="text-black p-5 w-3/4 flex-col">
      <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3">
        <Link
          to={"/dashboard"}
          className="bordre-2 pl-3 pr-3 pt-1 rounded-2xl cursor-pointer hover:bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
        >
          <ArrowBackIcon />
          Back To Dashboard
        </Link>
      </div>
      <div className="mt-5 text-xl text-slate-900">{header}</div>
      <div className="bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-auto h-[80%]">
        {data.map((item) => {
          return <MemberCards item={item} />;
        })}
      </div>
    </div>
  );
}

export default GeneralUser;
