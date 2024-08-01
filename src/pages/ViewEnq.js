import React from "react";
import { useLocation } from "react-router-dom";

const ViewEnq = () => {
    const location = useLocation();
    const getEnqId = location.pathname.split("/")[3];
    console.log(getEnqId);
    return (
        <div>
            <h3 className="mb-4 title">View Enquiry</h3>
            <div className="mt-5 bg-white p-4 rounded"></div>
        </div>
    )
}

export default ViewEnq;