import axios from "axios";

const getMonthlyJoined = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/member/monthly",
      { withCredentials: true }
    );
    console.log(response);
    return response.data?.members || [];
  } catch (error) {
    console.error("error in featching data :", error);
  }
};

const expireINthree = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/member/expire-3",
      { withCredentials: true }
    );
    console.log(response);
    return response.data?.members || [];
  } catch (error) {
    console.error("error in featching data :", error);
  }
};
const expireInSeven = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/member/expire-7",
      { withCredentials: true }
    );
    console.log(response);
    return response.data?.members || [];
  } catch (error) {
    console.error("error in featching data :", error);
  }
};

const expire = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/member/expire",
      { withCredentials: true }
    );
    console.log(response);
    return response.data?.members || [];
  } catch (error) {
    console.error("error in featching data :", error);
  }
};

const inactive = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/member/inactive",
      { withCredentials: true }
    );
    console.log(response);
    return response.data?.members || [];
  } catch (error) {
    console.error("error in featching data :", error);
  }
};

export { getMonthlyJoined, expire, expireINthree, expireInSeven, inactive };
