import axios from "axios";
import { base_url } from "../../utils/base_url";



const getCoupons = async () => {
    const response = await axios.get(`${base_url}coupon/`, config);
    return response.json;
};

const createCoupons = async (coupon) => {
    const response = await axios.post(`${base_url}coupon/`,coupon, config);
    return response.json;
}

const couponService = {
    getCoupons,
    createCoupons,
}


export default couponService;