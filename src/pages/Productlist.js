import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a,b)=> a.title.length-b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a,b)=> a.brand.length-b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a,b)=> a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a,b)=> a.price -b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();


  const showModal = (id) => {
    setOpen(true);
    setProductId(id);
  }
  
  const hideModal = () => {
    setOpen(false);
  }

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);
  // console.log(productState);
  const data1 = [];
  

  for (let i = 0; i < productState.length; i++) {
    const colorString = productState[i].color.join(', ');
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: colorString,
      price: `${productState[i].price}`,
      action: (
        <>
          <Link className="fs-3 text-danger" to={`/admin/product/${productState[i]._id}`}>
            <BiEdit />
          </Link>
          <button onClick={()=>showModal(productState[i]._id)} className="ms-3 fs-3 text-danger bg-transparent border-0" to="/">
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteProduct = (id) => {
    dispatch(deleteAProduct(id));

    setTimeout(() => {
      setOpen(false);
      dispatch(getProducts());
    },400)
  }

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={()=>deleteProduct(productId)}
        title="Are You Sure You Want to Delete This Product?"
      />
    </div>
  );
};

export default Productlist;
