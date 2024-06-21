import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  return response.data;
};

// const createProduct = async (product) => {
//   console.log(product);
//   const response = await axios.post(`${base_url}product/`, product, config);
//   return response.data;
// };

// const createProduct = async (product) => {
//   try {
//     console.log('Creating product:', product);
//     const response = await axios.post(`${base_url}product/`, product, config);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating product:', error);
//     throw error.response?.data || { message: error.message };
//   }
// };

const createProduct = async (product) => {
  try {
    // const token = localStorage.getItem('token'); // Adjust based on your token storage method
    // const authConfig = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`,
    //   },
    // };

    const getTokenFromLocalStorage = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${
          getTokenFromLocalStorage !== null
            ? getTokenFromLocalStorage.token
            : ""
        }`,
        Accept: "application/json",
      },
    };

    const response = await axios.post(
      `${base_url}product/`,
      product,
      config
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating product:",
      error.response?.data || error.message
    );
    throw error.response?.data || { message: error.message };
  }
};


const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);
  return response.data;
}

const productService = {
  getProducts,
  createProduct,
  getProduct,
};

export default productService;
