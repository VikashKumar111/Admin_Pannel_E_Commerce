import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteACategory, getCategories } from "../features/pcategory/pcategorySlice";
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

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const dispatch = useDispatch();


  const showModal = (id) => {
    setOpen(true);
    setCategoryId(id);
  }
  console.log(categoryId);

  const hideModal = () => {
    setOpen(false);
  }

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const pCatState = useSelector((state) => state.pcategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pCatState.length; i++) {
    data1.push({
      key: i + 1,
      name: pCatState[i].title,
      action: (
        <>
          <Link className="fs-3 text-danger" to={`/admin/category/${pCatState[i]._id}`}>
            <BiEdit />
          </Link>
          <button onClick={()=> showModal(pCatState[i]._id)} className="ms-3 fs-3 text-danger bg-transparent border-0">
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteCategory = (id) => {
    dispatch(deleteACategory(id));

    setTimeout(() => {
      setOpen(false);
      dispatch(getCategories());
    },400)
  }

  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
       <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={()=>deleteCategory(categoryId)}
          title="Are You Sure You Want To delete This Category?"
        />
    </div>
  );
};

export default Categorylist;
