import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}prodcategory/`);
  return response.data;
};

const createProductCategory = async (pcat) => {
  const response = await axios.post(`${base_url}prodcategory/`, pcat, config);
  return response.data;
};

const pcategoryService = {
  getProductCategories,
  createProductCategory,
};

export default pcategoryService;
