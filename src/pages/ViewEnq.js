import React from "react";
import { useLocation } from "react-router-dom";

const ViewEnq = () => {
    const location = useLocation();
    console.log(location);
    return (
        <div>
            <h3 className="mb-4 title">View Enquiry</h3>
            <div className="mt-5 bg-white p-4 rounded"></div>
        </div>
    )
}

export default ViewEnq;