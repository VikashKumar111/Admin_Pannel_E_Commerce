import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getEnquiry = async () => {
    const response = await axios.get(`${base_url}enquiry/`);
    return response.data;
};

const deleteEnquiry = async (id) => {
    const response = await axios.delete(`${base_url}enquiry/${id}`, config);
    return response.data;
}
const enquiryService = {
    getEnquiry,
    deleteEnquiry,
};

export default enquiryService;