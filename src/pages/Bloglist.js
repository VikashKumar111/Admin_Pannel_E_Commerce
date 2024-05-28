import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Phone Number",
    dataIndex: "number",
  },
  {
    title: "Address",
    dataIndex: "address",
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


const Bloglist = () => {
    return <div>
        <h3 className="mb-4 title">Blogs List</h3>
        <div>
             <Table columns={columns} dataSource={data1} />
        </div>
   </div> 
};

export default Bloglist;