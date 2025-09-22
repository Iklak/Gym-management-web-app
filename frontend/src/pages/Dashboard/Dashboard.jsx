import React, { useRef, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import GroupIcon from "@mui/icons-material/Group";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import ReportIcon from "@mui/icons-material/Report";
import ErrorIcon from "@mui/icons-material/Error";
import { Link } from "react-router-dom";
function Dashboard() {
  const [accordianDashBoard, setAccordianDashboard] = useState(false);
  const ref = useRef();

  const hnadleOnClickMenue = (value) => {
    sessionStorage.setItem("func", value);
  };
  return (
    <div className="w-3/4 text-black p-5 relative">
      <div className="w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between items-center">
        <MenuIcon
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setAccordianDashboard((prev) => !prev);
          }}
        />

        <img
          src="data:image/jpeg;base64,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"
          alt=""
          className="w-8 rounded-3xl border-2"
        />
      </div>
      {accordianDashBoard && (
        <div className="absolute p-3 bg-slate-900 text-white rounded-xl text-lg font-extralight">
          <div>Hi Welcome to our Gym Managment System.</div>
          <p>Feel free to ask any quries</p>
        </div>
      )}
      <div className="mt-5 pt-3 bg-slate-100 opacity-50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x-auto h-[80%]">
        <Link
          to={"/member"}
          className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-lg hover:bg-slate-900 hover:text-white">
            <GroupIcon sx={{ color: "green", fontSize: "50px" }} />
            <p className="text-xl my-3 font-semibold font-mono">
              Joined Member
            </p>
          </div>
        </Link>

        <Link
          onClick={() => hnadleOnClickMenue("monthly")}
          to={"/specific/monthly"}
          className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-lg hover:bg-slate-900 hover:text-white">
            <SignalCellularAltIcon sx={{ color: "purple", fontSize: "50px" }} />
            <p className="text-xl my-3 font-semibold font-mono">
              Monthly Joined
            </p>
          </div>
        </Link>
        <Link
          onClick={() => hnadleOnClickMenue("expiredWithThreeDays")}
          to={"/specific/Expiring_within_3_days"}
          className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-lg hover:bg-slate-900 hover:text-white">
            <AccessAlarmsIcon sx={{ color: "red", fontSize: "50px" }} />
            <p className="text-xl my-3 font-semibold font-mono">
              Expiring within 3 days
            </p>
          </div>
        </Link>
        <Link
          onClick={() => hnadleOnClickMenue("expiredWithFourToSevenDays")}
          to={"/specific/Expiring-within-4-7-days"}
          className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-lg hover:bg-slate-900 hover:text-white">
            <AccessAlarmsIcon sx={{ color: "red", fontSize: "50px" }} />
            <p className="text-xl my-3 font-semibold font-mono">
              Expiring within 4-7 days
            </p>
          </div>
        </Link>
        <Link
          onClick={() => hnadleOnClickMenue("expired")}
          to={"/specific/expired"}
          className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-lg hover:bg-slate-900 hover:text-white">
            <ReportIcon sx={{ color: "red", fontSize: "50px" }} />
            <p className="text-xl my-3 font-semibold font-mono">Expired</p>
          </div>
        </Link>
        <Link
          onClick={() => hnadleOnClickMenue("incative")}
          to={"/specific/inactive"}
          className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-lg hover:bg-slate-900 hover:text-white">
            <ErrorIcon sx={{ color: "brown", fontSize: "50px" }} />
            <p className="text-xl my-3 font-semibold font-mono">
              Inactive Member
            </p>
          </div>
        </Link>
      </div>
      <div className="md:bottom-4 p-4 w-3/4 mb-4 md:mb-0 absolute bg-black text-white mt-20 rounded-xl text-xl">
        Contact Devloper for any Technical Error at +917032432683
      </div>
    </div>
  );
}

export default Dashboard;
