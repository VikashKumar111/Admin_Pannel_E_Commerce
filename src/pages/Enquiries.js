import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteAEnquiry, getEnquiry } from "../features/enquiry/enquirySlice";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
   {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enqId, setEnqId] = useState("");
    const dispatch = useDispatch();

  const showModal = (id) => {
    setOpen(true);
    setEnqId(id);
  };
  
  console.log(enqId);

  const hideModal = () => {
    setOpen(false);
  };


  useEffect(() => {
    dispatch(getEnquiry());
  }, []);

  const enqState = useSelector((state) => state.enquiry.enquiry);
  const data1 = [];
  for (let i = 0; i < enqState.length; i++) {
    data1.push({
      key: i+1,
      name: enqState[i].name,
      email: enqState[i].email,
      mobile: enqState[i].mobile,
      status: (
        <>
          <select name="" className="form-control form-select" id="">
            <option value="">Set Status</option>
          </select>
        </>
      ),
      action: (
        <>
          <button onClick={()=>showModal(enqState[i]._id)} className="ms-3 fs-3 text-danger bg-transparent border-0" to="/">
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  
  const deleteEnquiry = (id) => {
    dispatch(deleteAEnquiry(id));

    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiry());
    }, 400);
  }

  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteEnquiry(enqId);
        }}
        title="Are You sure You want to delete this Enquiry?"
      />
    </div>
  );
};
export default Enquiries;
