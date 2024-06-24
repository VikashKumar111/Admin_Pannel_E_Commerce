import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getbCategories } from "../features/bcategory/bcategorySlice";
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

const Blogcatlist = () => {
  const [open, setOpen] = useState(false);
  const [blogCategoryId, setBlogCategoryId] = useState("");
  const dispatch = useDispatch();



  const showModal = (id) => {
    setOpen(true);
    setBlogCategoryId(id);
  }

  
  const hideModal = () => {
    setOpen(false);
  }

  useEffect(() => {
    dispatch(getbCategories());
  }, []);
  const bCatState = useSelector((state) => state.bCategory.bCategories);

  const data1 = [];
  for (let i = 0; i < bCatState.length; i++) {
    data1.push({
      key: i + 1,
      name: bCatState[i].title,
      action: (
        <>
          <Link className="fs-3 text-danger" to={`/admin/blog-category/${bCatState[i]._id}`}>
            <BiEdit />
          </Link>
          <button onClick={()=>showModal(bCatState[i]._id)} className="ms-3 fs-3 text-danger bg-transparent border-0" to="/">
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }


  const deleteBlogCategory = (id) => {
    dispatch(deleteABlogCategory(id));

    setTimeout(() => {
      setOpen(false);
      dispatch(getbCategories());
    })
  }
  return (
    <div>
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal 
        hideModal={hideModal}
        open={open}
        performAction={() => deleteBlogCategory(blogCategoryId)}
        title="Are You Sure You Want To Delete This Blog Category?"
      />
    </div>
  );
};

export default Blogcatlist;
