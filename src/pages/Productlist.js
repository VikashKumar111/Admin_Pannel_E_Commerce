import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { getProducts } from "../features/product/productSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
   {
    title: "Price",
    dataIndex: "price",
  },
   {
    title: "Action",
    dataIndex: "action",
  },
];
const data1 = [];
for (let i = 0; i < 88; i++) {
  data1.push({
    key: i,
    name: `Anuj Kumar ${i}`,
    age: 28,
    number: 9318667788,
    address: `Saharanpur, Park Lane no. ${i}`,
  });
}



const Productlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  
    return <div>
        <h3 className="mb-4 title">Products</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
    </div>
};

export default Productlist;

