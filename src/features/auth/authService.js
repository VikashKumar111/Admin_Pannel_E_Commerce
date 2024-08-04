import axios from "axios";
import { base_url } from "../../utils/base_url";

const getTokenfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config = {
  headers: {
    Authorization: `Bearer ${getTokenfromLocalStorage.token}`,
    Accept: "application/json",
  },
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  try {
    const response = await axios.get(`${base_url}user/getallorders`, config);
    console.log(response.data);
    return response.data;
   
  } catch (error) {
    console.error(
      "Get orders error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// const getOrders = async () => {
//     const response = await axios.get(`${base_url}user/get-orders`);
//      console.log(response);
//     return response.data;

// }

const getOrder = async (id) => {
  try {
    const response = await axios.get(
      `${base_url}user/getorderbyuser/${id}`,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Get order error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;
