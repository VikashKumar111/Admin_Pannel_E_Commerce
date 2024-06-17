import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteABrand, getBrands } from "../features/brands/brandSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setBrandId(id);
  };
  console.log(brandId);

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i].title,
      action: (
        <>
          <Link
            className="fs-3 text-danger"
            to={`/admin/brand/${brandState[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            onClick={() => showModal(brandState[i]._id)}
            className="ms-3 fs-3 text-danger bg-transparent border-0"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBrand = (id) => {
    dispatch(deleteABrand(id));
    setOpen(false);
    dispatch(getBrands());
  }

  return (
    <div>
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(brandId)
        }}
        title="Are You Sure You Want To Delete This Brand?"
      />
    </div>
  );
};

export default Brandlist;
