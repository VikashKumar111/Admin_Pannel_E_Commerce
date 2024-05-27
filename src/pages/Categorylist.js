import React from "react";
import { Table } from "antd";

const Categorylist = () => {
  return (
    <div>
      <h3 className="mb-4">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Categorylist;
