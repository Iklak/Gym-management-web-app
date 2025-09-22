import React, { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Member from "./pages/Member/Member";
import GeneralUser from "./pages/GeneralUser/GeneralUser";
import GeneralMember from "./pages/Member/GeneralMember";
import { ToastContainer } from "react-toastify";
function App() {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    let isLogin = localStorage.getItem("isLogin");
    if (isLogin) {
      setLogin(true);
      navigate("/dashboard");
    } else {
      setLogin(false);
      navigate("/");
    }
  }, [localStorage.getItem("isLogin")]);
  return (
    <div className="flex">
      <ToastContainer />
      {isLogin && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/member" element={<Member />} />
        <Route path="/specific/:page" element={<GeneralUser />} />
        <Route path="/member/:id" element={<GeneralMember />} />
      </Routes>
    </div>
  );
}

export default App;
