import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAEnquiry } from "../features/enquiry/enquirySlice";

const ViewEnq = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const getEnqId = location.pathname.split("/")[3];
  console.log(getEnqId);
  const enqState = useSelector((state) => state.enquiry);
  const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = enqState;

  useEffect(() => {
    dispatch(getAEnquiry(getEnqId));
  }, [getEnqId]);

  return (
    <div>
      <h3 className="mb-4 title">View Enquiry</h3>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Name:</h5>
          <p className="mb-0">{enqName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Mobile:</h5>
          <p className="mb-0">
            <a href={`tel:+91${enqMobile}`}>{enqMobile}</a>
          </p>
              </div>
               <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Email:</h5>
          <p className="mb-0">
            <a href={`mailto:{enqEmail}`}>{enqEmail}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewEnq;
