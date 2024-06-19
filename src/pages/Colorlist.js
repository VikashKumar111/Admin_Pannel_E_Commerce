import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../features/color/colorSlice";
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

const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const dispatch = useDispatch();

  const showModal = (id) => {
    setOpen(true);
    setColorId(id);
  };
 
  console.log(colorId);

  const hideModal = () => {
    setOpen(false);
  }

  useEffect(() => {
    dispatch(getColors());
  }, []);

  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      name: colorState[i].title,
      action: (
        <>
          <Link
            className="fs-3 text-danger"
            to={`/admin/color/${colorState[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            onClick={() => showModal(colorState[i]._id)}
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            to="/"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteColor = (id) => {
    console.log(id);
  }

  return (
    <div>
      <h3 className="mb-4 title">Colors</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={()=> deleteColor(colorId)}
        title="Are You Sure You Want To Delete This Color?"
      />
    </div>
  );
};

export default Colorlist;
