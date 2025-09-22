import React from "react";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";

function Home() {
  return (
    <div className="">
      <div className="border-2 border-slate-800 bg-slate-700 text-white font-semibold text-2xl p-3 px-16">
        welocome to my gym
      </div>
      <div className='w-full bg-cover flex justify-center h-[100vh] bg-[url("https://img.freepik.com/free-photo/low-angle-view-unrecognizable-muscular-build-man-preparing-lifting-barbell-health-club_637285-2497.jpg?semt=ais_hybrid&w=740&q=80")]'>
        <div className="w-full lg:flex gap-32 ">
          <Login />
          <Signup />
        </div>
      </div>
    </div>
  );
}

export default Home;
