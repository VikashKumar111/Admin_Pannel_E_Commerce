import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { deleteACoupon, getAllCoupons } from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SN",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Couponlist = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const dispatch = useDispatch();

  const showModal = (id) => {
    setOpen(true);
    setCouponId(id);
  }
  
  console.log(couponId);

  const hideModal = () => {
    setOpen(false);
  }


  useEffect(() => {
    dispatch(getAllCoupons());
  }, []);

  const couponState = useSelector((state) => state.coupon.coupons);
  console.log(couponState);

  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      discount: couponState[i].discount,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      action: (
        <>
          <Link className="fs-3 text-danger" to={`/admin/coupon/${couponState[i]._id}`}>
            <BiEdit />
          </Link>
          <button onClick={()=>showModal(couponState[i]._id)} className="ms-3 fs-3 text-danger bg-transparent border-0" to="/">
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  
  const deleteCoupon = (id) => {
    dispatch(deleteACoupon(id));

    setTimeout(() => {
      setOpen(false);
      dispatch(getAllCoupons());
    },400)
  }

  return (
    <div>
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal 
        hideModal={hideModal}
        open={open}
        performAction={()=>deleteCoupon(couponId)}
        title="Are You Sure You Want to Delete This Coupon?"
      />
    </div>
  );
};

export default Couponlist;
