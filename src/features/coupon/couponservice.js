import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";


const getCoupons = async () => {
    const response = await axios.get(`${base_url}coupon/`, config);
    console.log(response.json);
    return response.json;   
};

const createCoupons = async (coupon) => {
    const response = await axios.post(`${base_url}coupon/`, coupon, config);
    console.log(response);
    return response.json;
}

const couponService = {
    getCoupons,
    createCoupons,
}


export default couponService;