import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Link } from "react-router-dom";

function MemberCards({ item }) {
  return (
    <Link
      to={`/member/${item?._id}`}
      className="bg-white rounded-lg p-3 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    >
      <div className="w-24 h-24 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full">
        <img
          className="w-full h-full rounded-full"
          src={item?.profilePic}
          alt=""
        />
        <FiberManualRecordIcon
          className="absolute top-0 left-0"
          sx={{ color: item?.status === "Active" ? "greenyellow" : "red" }}
        />
      </div>
      <div className="mx-auto mt-5 text-center text-xl font-semibold font-mono">
        {item?.name}
      </div>
      <div className="max-auto mt-2 text-center text-xl font-mono">
        {"+91" + item?.phone}
      </div>
      <div className="max-auto mt-2 text-center text-xl font-mono">
        Next Bill Date:
        {item?.nextBillDate.slice(0, 10).split("-").reverse().join("-")}
      </div>
    </Link>
  );
}

export default MemberCards;
