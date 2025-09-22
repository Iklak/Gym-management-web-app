import React, { useEffect, useState } from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MemberCards from "../../components/MemberCard/MemberCards";
import Modal from "../../components/Modal/Modal";
import AddMembers from "../../components/addMemberShip/AddMembers";
import AddNewMember from "../../components/AddNewMember/AddNewMember";
import axios from "axios";
import { toast } from "react-toastify";

function Member() {
  const [addMemberShip, setAddMemberShip] = useState(false);
  const [addMember, setMember] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalData, setTotalData] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [limit, setLimit] = useState(9);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [serchMode, setSearchMode] = useState(false);
  useEffect(() => {
    fetchData(0, 9);
  }, []);
  const fetchData = async (skip, limits) => {
    await axios
      .get(
        `http://localhost:3000/api/member/all-member?skip=${skip}&limit=${limits}`,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        let totalData = res.data.totalMember;
        setTotalData(totalData);
        setData(res.data.members);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });

    let extrapage = totalData % limit === 0 ? 0 : 1;

    let totalPages = parseInt(totalData / limit) + extrapage;
    setNoOfPage(totalPages);
    if (totalData === 0) {
      setStartFrom(-1);
      setEndTo(0);
    } else if (totalData < 9) {
      setEndTo(totalData);
    }
  };
  const handleMembership = () => {
    setAddMemberShip((prev) => !prev);
  };

  const handleMember = () => {
    setMember((prev) => !prev);
  };
  const handleNext = () => {
    if (currentPage !== noOfPage) {
      let currPage = currentPage + 1;
      setCurrentPage(currPage);
      var from = (currPage - 1) * 9;
      var to = currPage * 9;
      if (to > totalData) {
        to = totalData;
      }
      setStartFrom(from);
      setEndTo(to);
      let skipVal = skip + 9;
      fetchData(skipVal, 9);
    }
  };
  const handlePrev = () => {
    if (currentPage !== 1) {
      let currPage = currentPage - 1;
      setCurrentPage(currPage);
      var from = (currPage - 1) * 9;
      var to = currPage * 9;
      setStartFrom(from);
      setEndTo(to);
      let skipVal = skip - 9;
      fetchData(skipVal, 9);
    }
  };
  const handleSearchData = async () => {
    if (search !== "") {
      setSearchMode(true);
      await axios
        .get(`http://localhost:3000/api/member/search?searchTerm=${search}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setData(res.data.members);
          setTotalData(res.data.totalMember);
          toast.success(res.data.message);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        });
    } else {
      if (serchMode) {
        window.location.reload();
      } else {
        toast.error("please enter any value");
      }
    }
  };

  return (
    <div className="text-black p-5 w-3/4 h-[100vh]">
      {/* block for banner */}
      <div className="border-2 bg-slate-900 flex justify-between mb-2 w-full text-white rounded-lg p-3">
        <div
          onClick={() => handleMember()}
          className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl  cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          Add Member <FitnessCenterIcon />
        </div>
        <div
          className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl  cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          onClick={() => handleMembership()}
        >
          Add Membership <AddIcon />
        </div>
      </div>
      <Link to={"/dashboard"}>
        <ArrowBackIcon />
        Back to Dashboard
      </Link>

      {/* search */}
      <div className="mt-5 w-1/2  flex gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="border-2 w-full p-2 rounded-lg "
          placeholder="search by name or number"
        />
        <div
          onClick={() => handleSearchData()}
          className="bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-indigo-500 from-pink-500"
        >
          {" "}
          <SearchIcon />
        </div>
      </div>
      <div className="mt-5 text-xl flex justify-between text-black">
        <div>Total Member {serchMode ? totalData : null}</div>
        {!serchMode ? (
          <div className="flex gap-5">
            <div>
              {startFrom + 1} - {endTo} 0f {totalData} Member
            </div>
            <div
              className={`w-8 h-8 cursor-pointer border-2 flex items-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${
                currentPage === 1 ? "bg-gray-200 text-gray-100" : null
              }`}
              onClick={() => handlePrev()}
            >
              {" "}
              <KeyboardArrowLeftIcon />
            </div>
            <div
              onClick={() => handleNext()}
              className={`w-8 h-8 cursor-pointer border-2 flex items-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${
                currentPage === noOfPage ? "bg-gray-200 text-gray-100" : null
              } `}
            >
              <KeyboardArrowRightIcon />
            </div>
          </div>
        ) : null}
      </div>
      <div className="bg-slate-100 p-5 mt-5  mb-5 rounded-lg grid grid-cols-3 overflow-x-auto h-[65%]">
        {/* div for member card */}
        {data.map((item, index) => {
          return <MemberCards key={index} item={item} />;
        })}
      </div>
      {addMemberShip && (
        <Modal
          header="Add Membership"
          handleClose={handleMembership}
          content={<AddMembers handleClose={handleMembership} />}
        />
      )}

      {addMember && (
        <Modal
          header="Add New  Members"
          handleClose={handleMember}
          content={<AddNewMember />}
        />
      )}
    </div>
  );
}

export default Member;
