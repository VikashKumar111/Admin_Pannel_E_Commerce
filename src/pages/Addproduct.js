import React, { useState } from "react";
import CustomInput from "../components/Custominput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";




const Addproduct = () => {
      const [desc, setDesc] = useState();

  const handleChange = (e) => {
    setDesc(e);
  };
    return <div>
        <h3 className="mb-4 title">Add Product</h3>
        <form>
            <CustomInput type="text" label="Enter Product Title" />
            <div className="mb-3"> <ReactQuill
            theme="snow"
            value={desc}
            onChange={(evt) => {
              handleChange(evt);
            }}
            /></div>
            <CustomInput type="number" label="Enter Product Price"
            />
            <select name="" className="form-control py-3 mb-3" id="">
                <option value="">Select Brand</option>
            </select>
              <select name="" className="form-control py-3 mb-3" id="">
                <option value="">Select Category</option>
            </select>
              <select name="" className="form-control py-3 mb-3" id="">
                <option value="">Select Color</option>
            </select>
             <CustomInput type="number" label="Enter Quantity"
            />
            
            <button className="btn btn-success border-0 rounded-3 my-5" type="submit">Add Product</button>
        </form>
  </div>;
};

export default Addproduct;
